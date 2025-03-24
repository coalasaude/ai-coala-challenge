from apis.twenty_api import TwentyApi
from graphs.main_graph.utils.normalize_string import normalize_string


def get_opportunities_by_person_full_name_tool(first_name: str, last_name: str):
    """Retorna as oportunidades do Twenty CRM por nome completo do contato.

    Essa ferramenta é utilizada para retornar as oportunidades
    disponiveis no funil de vendas do Twenty CRM.
    Buscando as oportunidades por nome completo do contato.
    Recebe como argumento o primeiro e o ultimo nome do contato.
    """
    twenty_api = TwentyApi()

    opportunities = twenty_api.make_request("GET", "/opportunities", "opportunities")

    opportunities = [
        opportunity
        for opportunity in opportunities
        if normalize_string(opportunity["pointOfContact"]["name"]["firstName"])
        == normalize_string(first_name)
        and normalize_string(opportunity["pointOfContact"]["name"]["lastName"])
        == normalize_string(last_name)
    ]

    return {"opportunities": opportunities}
