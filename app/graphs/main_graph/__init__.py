from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode
from langgraph.checkpoint.postgres import PostgresSaver
from dotenv import load_dotenv
from psycopg import Connection
import os

from graphs.main_graph.states import State
from graphs.main_graph.nodes import (
    assistant_node,
    route_tools_node,
    initial_assistant_node,
)
from graphs.main_graph.tools import tools
from graphs.main_graph.utils.is_checkpoint_first_time import is_first_time_setup
from graphs.main_graph.tools.vectorstore_retriever import retriever_tool_builder

load_dotenv(override=True)

main_graph_builder = StateGraph(State)

main_graph_builder.add_node("initial_assistant", initial_assistant_node)
main_graph_builder.add_node("assistant", assistant_node)
main_graph_builder.add_node("tools", ToolNode(tools))
main_graph_builder.add_node("retriever_tool", ToolNode([retriever_tool_builder()]))

main_graph_builder.add_edge(START, "initial_assistant")
main_graph_builder.add_edge("retriever_tool", "assistant")
main_graph_builder.add_edge("tools", "assistant")
main_graph_builder.add_conditional_edges(
    "initial_assistant",
    route_tools_node,
    {"tools": "retriever_tool", END: "assistant"},
)
main_graph_builder.add_conditional_edges(
    "assistant", route_tools_node, {"tools": "tools", END: END}
)

db_uri = "postgres://postgres:postgres@host.docker.internal:5432/postgres"
conn = Connection.connect(db_uri)
checkpointer = PostgresSaver(conn)

if is_first_time_setup(db_uri):
    checkpointer.setup()

main_graph = main_graph_builder.compile(checkpointer=checkpointer)
