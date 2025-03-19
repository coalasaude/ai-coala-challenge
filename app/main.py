from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

from graphs.main_graph import main_graph

load_dotenv(override=True)

app = FastAPI()


class GraphInput(BaseModel):
    query: str
    parameters: dict = {"thread_id": 1}


@app.post("/invoke")
async def invoke(graph_input: GraphInput):
    try:
        result = main_graph.invoke(
            {"messages": [graph_input.query]},
            graph_input.parameters,
            stream_mode="values",
        )
        return {
            "result": [
                message.content
                for message in result["messages"]
                if message.type in ("ai", "human")
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Graph execution failed: {str(e)}")
