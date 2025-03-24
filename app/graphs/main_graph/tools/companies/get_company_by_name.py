from apis.twenty_api import TwentyApi
from graphs.main_graph.utils.normalize_string import normalize_string
from langchain_core.tools import Tool


def get_company_by_name_tool_func(company_name: str):
    """Retorna a empresa por nome.

    Essa ferramenta é utilizada para retornar uma empresa por nome disponiveis no Twenty CRM.
    Recebe como argumento o nome da empresa.
    """
    twenty_api = TwentyApi()

    companies = twenty_api.make_request(
        "GET",
        f"/companies?filter=name[ilike]:{normalize_string(company_name)}",
        "companies",
    )

    return {"companies": companies}


get_company_by_name_tool = Tool(
    name="get_company_by_name",
    func=get_company_by_name_tool_func,
    description=(
        "Retorna a empresa por nome." "Recebe como argumento o nome da empresa."
    ),
)
