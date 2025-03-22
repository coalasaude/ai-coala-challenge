from graphs.main_graph.tools.get_opportunities import GetOpportunitiesTool
from graphs.main_graph.tools.get_opportunities_by_company_name import (
    get_opportunities_by_company_name_tool,
)
from graphs.main_graph.tools.get_opportunities_by_person_full_name import (
    get_opportunities_by_person_full_name_tool,
)
from graphs.main_graph.tools.get_opportunities_by_person_first_name import (
    get_opportunities_by_person_first_name_tool,
)
from graphs.main_graph.tools.get_opportunities_by_person_last_name import (
    get_opportunities_by_person_last_name_tool,
)
from graphs.main_graph.tools.vectorstore_retriever import retriever_tool_builder
from langchain_core.tools import Tool

tools = [
    GetOpportunitiesTool(),
    Tool(
        name="get_opportunities_by_company_name",
        func=get_opportunities_by_company_name_tool,
        description=(
            "Retorna as oportunidades do Twenty CRM por nome da empresa."
            "Recebe como argumento o nome da empresa."
        ),
    ),
    Tool(
        name="get_opportunities_by_person_full_name",
        func=get_opportunities_by_person_full_name_tool,
        description=(
            "Retorna as oportunidades do Twenty CRM por nome completo do contato."
            "Recebe como argumentos o primeiro e o ultimo nome do contato."
        ),
    ),
    Tool(
        name="get_opportunities_by_person_first_name",
        func=get_opportunities_by_person_first_name_tool,
        description=(
            "Retorna as oportunidades do Twenty CRM pelo primeiro nome do contato."
            "Recebe como argumentos o primeiro nome do contato."
        ),
    ),
    Tool(
        name="get_opportunities_by_person_last_name",
        func=get_opportunities_by_person_last_name_tool,
        description=(
            "Retorna as oportunidades do Twenty CRM pelo sobrenome do contato."
            "Recebe como argumentos o sobrenome do contato."
        ),
    ),
    retriever_tool_builder(),
]
