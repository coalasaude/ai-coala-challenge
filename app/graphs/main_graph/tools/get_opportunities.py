from langchain_core.tools import BaseTool
from typing import Dict, Tuple, Union, Optional

from apis.twenty_api import TwentyApi


def get_opportunities_tool():
    """Retorna as oportunidades do Twenty CRM.

    Essa ferramenta é utilizada para retornar as oportunidades disponiveis no funil de vendas do Twenty CRM.
    Essa ferramenta nao precisa de nenhum argumento.
    """
    twenty_api = TwentyApi()
    opportunities = twenty_api.get_opportunities()

    return {"opportunities": opportunities}


class GetOpportunitiesTool(BaseTool):
    name: str = "retorna_oportunidades_twenty_crm"
    description: str = (
        "Retorna as oportunidades disponiveis no funil de vendas do Twenty CRM"
    )

    def _to_args_and_kwargs(
        self, tool_input: Union[str, Dict], tool_call_id: Optional[str]
    ) -> Tuple[Tuple, Dict]:
        return (), {}

    def _run(self):
        return get_opportunities_tool()

    def _arun(self):
        raise NotImplementedError("This tool does not support async invocation.")
