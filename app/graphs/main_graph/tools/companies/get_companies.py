from langchain_core.tools import BaseTool
from typing import Dict, Tuple, Union, Optional

from apis.twenty_api import TwentyApi


def get_companies_tool():
    """Retorna as empresas do Twenty CRM.

    Essa ferramenta é utilizada para retornar todas as empresas disponiveis no Twenty CRM.
    Essa ferramenta nao precisa de nenhum argumento.
    """
    twenty_api = TwentyApi()
    companies = twenty_api.make_request("GET", "/companies", "companies")

    return {"companies": companies}


class GetCompaniesTool(BaseTool):
    name: str = "retorna_empresas_twenty_crm"
    description: str = "Retorna todas as empresas disponiveis no Twenty CRM"

    def _to_args_and_kwargs(
        self, tool_input: Union[str, Dict], tool_call_id: Optional[str]
    ) -> Tuple[Tuple, Dict]:
        return (), {}

    def _run(self):
        return get_companies_tool()

    def _arun(self):
        raise NotImplementedError("This tool does not support async invocation.")
