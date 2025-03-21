from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from langchain_core.runnables.config import RunnableConfig
from dotenv import load_dotenv
from uuid import uuid4

from graphs.main_graph import main_graph


load_dotenv(override=True)


class GraphInput(BaseModel):
    query: str
    parameters: Optional[RunnableConfig] = None


app = FastAPI()

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
        print(e)
        raise HTTPException(status_code=500, detail=f"Graph execution failed: {str(e)}")
