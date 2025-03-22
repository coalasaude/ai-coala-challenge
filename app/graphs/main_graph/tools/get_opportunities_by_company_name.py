from apis.twenty_api import TwentyApi
from graphs.main_graph.utils.normalize_string import normalize_string


def get_opportunities_by_company_name_tool(company_name: str):
    """Retorna as oportunidades do Twenty CRM por nome da empresa.

    Essa ferramenta é utilizada para retornar as oportunidades disponiveis no funil de vendas do Twenty CRM.
    Buscando as oportunidades pertencentes a empresa informada.
    Recebe como argumento o nome da empresa.
    """
    twenty_api = TwentyApi()

    opportunities = twenty_api.make_request("GET", "/opportunities", "opportunities")

    opportunities = [
        opportunity
        for opportunity in opportunities
        if normalize_string(opportunity["company"]["name"])
        == normalize_string(company_name)
    ]

    return {"opportunities": opportunities}
