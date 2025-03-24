# Estrutura do Twenty CRM

- Empresas (Companies)
- Pessoas / Contato (People)
- Oportunidades / Leads (Opportunities)
- Tarefas (Tasks)
- Notas (Notes)

<br/>
O Fluxo do CRM funciona da seguinte maneira:

- Oportunidades ou leads são dispostas numa estrutura de fúnil, podendo ser visualizados em forma de quadro kambam.
- Oportunidades são ligadas a uma empresa que por sua vez possui uma pessoa como responsável da oportunidade.
- As etapas do fúnil para a empresa Coala são respectivamente nesta ordem: Qualificação (QUALIFICACAO), Contato Realizado (CONTATO_REALIZADO), Agendamento (AGENDAMENTO), Negociaçã (NEGOCIACAO), Contrato (CONTRATO).
  Onde a oportunidade caminha por esses cinco passos conforme a negociação com a empresa avança até o ponto
  da assinatura do contrato.

# Detalhamento das entidades do Twenty CRM

Empresa / Instituição

- Nome (Name)
- Nome do Domínio (Domain Name)
- Criado Por (Created By)
- Proprietario da Conta (Account Owner)
- Data de Criação (Creation Date)
- Funcionários (Employees)
- Linkedin
- Endereço (Address)

Pessoas / Contatos

- Nome (Name)
- E-mails (Emails)
- Criado Por (Created By)
- Empresa (Company)
- Telefones (Phones)
- Data de Criação (Creation Date)
- Cidade (City)
- Cargo (Job Title)
- Linkedin

Oportunidades / Leads

- Nome (Name)
- Valor (Amount)
- Etapa (Stage)
- Criado Por (Created By)
- Data de Fechamento (Close Date)
- Empresa (Company)
- Ponto de Contato (Point of Contact)
