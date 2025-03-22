from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage

from graphs.main_graph.states import State
from graphs.main_graph.prompts import assistant_prompt
from graphs.main_graph.tools import tools


def assistant_node(state: State):
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.3)
    llm_with_tools = llm.bind_tools(tools)
    messages = state["messages"]
    return {
        "messages": [
            llm_with_tools.invoke([SystemMessage(content=assistant_prompt)] + messages)
        ]
    }
