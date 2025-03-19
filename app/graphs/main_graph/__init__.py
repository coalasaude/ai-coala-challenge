from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode

from graphs.main_graph.states import State
from graphs.main_graph.nodes import assistant_node, route_tools_node
from graphs.main_graph.tools import tools

main_graph_builder = StateGraph(State)

main_graph_builder.add_node("assistant", assistant_node)
main_graph_builder.add_node("tools", ToolNode(tools))

main_graph_builder.add_edge(START, "assistant")
main_graph_builder.add_edge("tools", "assistant")
main_graph_builder.add_conditional_edges(
    "assistant", route_tools_node, {"tools": "tools", END: END}
)

main_graph = main_graph_builder.compile()
