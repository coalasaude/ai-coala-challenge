from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from langchain_core.runnables.config import RunnableConfig
from dotenv import load_dotenv
from uuid import uuid4

from graphs.main_graph import main_graph
from graphs.main_graph.tools.vectorstore_retriever import retriever_tool_builder
from apis.twenty_api import TwentyApi


load_dotenv(override=True)


class GraphInput(BaseModel):
    query: str
    parameters: Optional[RunnableConfig] = None


class TestRouteInput(BaseModel):
    method: str
    endpoint: str
    entity: str


@asynccontextmanager
async def lifespan(app: FastAPI):
    # STARTUP
    _ = retriever_tool_builder()  # preload retriever/model
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/invoke")
async def invoke(graph_input: GraphInput):
    try:
        parameters = graph_input.parameters
        if parameters is None:
            thread_id = str(uuid4())
            parameters = {"configurable": {"thread_id": thread_id}}

        result = main_graph.invoke(
            {"messages": [graph_input.query]},
            parameters,
            stream_mode="values",
        )
        return {
            "thread_id": parameters["configurable"]["thread_id"],
            "messages": [
                {"type": message.type, "content": message.content}
                for message in result["messages"]
                if message.type in ("ai", "human") and message.content
            ],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Graph execution failed: {str(e)}")


@app.post("/test_route")
async def test_route(data: TestRouteInput):
    twenty_api = TwentyApi()
    response = twenty_api.make_request(data.method, data.endpoint, data.entity)
    return response
