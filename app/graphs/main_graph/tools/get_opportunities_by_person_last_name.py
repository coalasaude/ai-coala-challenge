from apis.twenty_api import TwentyApi
from graphs.main_graph.utils.normalize_string import normalize_string


def get_opportunities_by_person_last_name_tool(last_name: str):
    """Retorna as oportunidades do Twenty CRM pelo sobrenome do contato.

    Essa ferramenta é utilizada para retornar as oportunidades
    disponiveis no funil de vendas do Twenty CRM.
    Buscando as oportunidades pelo sobrenome do contato.
    Recebe como argumento o sobrenome do contato.
    """
    twenty_api = TwentyApi()

    opportunities = twenty_api.make_request("GET", "/opportunities", "opportunities")

    opportunities = [
        opportunity
        for opportunity in opportunities
        if normalize_string(opportunity["pointOfContact"]["name"]["lastName"])
        == normalize_string(last_name)
    ]

    return {"opportunities": opportunities}
