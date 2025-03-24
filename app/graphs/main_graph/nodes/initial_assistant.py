from graphs.main_graph.states import State
from graphs.main_graph.tools.vectorstore_retriever import retriever_tool_builder


def initial_assistant_node(state: State):
    messages = state["messages"]

    retriever_tool = retriever_tool_builder()
    context = retriever_tool.run(messages[-1].content)

    return {"context": context}
