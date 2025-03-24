## Instruções para rodar o projeto.

1. **Rodando o Twenty CRM**

   - Rode o comando para subir o docker compose apartir da raiz do projeto, o processo é um pouco demorado, aconselho acompanhar pelo logs do container.
   - Caso tenha alguma instancia do postgres rodando na port 5432, ou uma instância do redis na porta 6379 é aconselhável para-las.

```
    docker compose up -d
```

2. **Acessando o CRM e gerando a API Keys**
   - Acesse o sistema atráves do endereço http://localhost:3001
   - Acesse a aba Settings.
   - Habilite a opção Advanced, ultima opção do menu.
   - Acesse a opção APIs > Create API key
   - De um nome para a chave, pode ser Coala, o nome aqui não importa muito.
   - Copiar a API key gerada
   - Rodar o comando substituindo {api_key} pela chave gerada. Esse comando irá rodar outro compose que o processo também é um pouco demorado.

```
    chmod +x run_ai_server.sh && ./run_ai_server.sh {api_key}
```

- Após o o término do processo já é possivel fazer as consultas atráves da aba Gemini Chat.
- Qualquer dúvida estou a disposição.

##

Olá, futuro membro do nosso time!

Estamos muito felizes em te ter nesta etapa do processo seletivo. Preparamos um desafio empolgante para você demonstrar suas habilidades e criatividade. O objetivo é integrar a inteligência artificial do Gemini ao Twenty CRM, criando uma nova aba de chat inteligente.

**Aceita o desafio?** 😉

## Projeto: Chat Inteligente com Gemini no Twenty CRM

**O que você precisa fazer?**

1.  **Clonar este repo e copiar o projeto:**
    - Clone este repositorio, abra um novo PR que deverá conter os arquivos do projeto Twenty CRM.
    - [https://github.com/twentyhq/twenty](https://github.com/twentyhq/twenty)
2.  **Configurar o ambiente:**
    - Consulte a documentação para configurar o ambiente de desenvolvimento local:
      - [https://twenty.com/developers/local-setup](https://twenty.com/developers/local-setup)
      - [https://twenty.com/developers](https://twenty.com/developers)
      - Atenção este projeto apenas roda no Chrome, em outros navegadores ele não consegue ser iniciado.
3.  **Estruture o funil:**
    - Configurar a aba de oportunidades para representar o nosso funil.
    - As etapas do nosso funil são as seguintes: qualificação, contato realizado, agendamento, negociação, contrato.
    - Crie oportunidades (relação entre lead e organização) fakes (porem realistas) para melhor consulta dos dados mais tarde.
4.  **Criar uma nova aba no CRM:**
    - Desenvolver uma nova aba dentro do Twenty CRM.
    - Esta aba será um chat interativo com a IA Gemini.
5.  **Integrar o Gemini:**
    - Utilizar a API do Gemini para conectar a IA ao chat.
    - Obter a chave da API gratuitamente em: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
6.  **Implementar funcionalidades de consulta:**
    - Permitir que o usuário faça perguntas à IA sobre o funil.
    - A IA deve ser capaz de fornecer informações sobre leads, seu status no funil, organização à qual pertencem e outras informações relevantes do CRM.
    - Exemplos de perguntas podem ser as seguintes:
      - Me traga informações sobre o lead Vinicius Possato
      - A qual instituição Vinicius Possato está?
      - Qual a quantidade de oportunidades em cada etapa do funil?
      - Qual o valor da oportunidade da instituição Escolinha Raio de sol?
      - Qual a soma dos valores das opotunidades em contrato?
7.  **Implementar RAG (Retrieval Augmented Generation):**
    - Implemente RAG para refinar a busca de informações do CRM.

## O que vamos avaliar?

Priorizamos os seguintes aspectos, em ordem de importância:

1.  **Prompt e integração com o Gemini:**
    - Qualidade dos prompts utilizados para interagir com a API do Gemini.
    - Eficiência e robustez da integração com a API.
    - Como a IA responde a diferentes tipos de perguntas sobre o CRM.
2.  **Habilidades com RAG:**
    - Eficácia do RAG na organização e recuperação de dados do CRM.
    - Como o RAG melhora a precisão e relevância das respostas da IA.
3.  **Capacidade de seguir a arquitetura do projeto:**
    - Aderência às convenções e padrões de arquitetura do Twenty CRM.
4.  **Criatividade e autonomia na resolução de problemas:**
    - Capacidade de adaptar e criar soluções inovadoras para desafios e dificuldades técnicas.
    - **Commits granulares são esperados.**
5.  **Habilidades de design e front-end:**
    - Qualidade do design da interface do chat e experiência do usuário.

## Como entregar o desafio?

1.  Abra um pull request (PR) para este repositorio aonde este pr deve conter o projeto base do Twenty CRM.
1.  Desenvolva a nova aba de chat com Gemini no PR.
1.  O Gemini deve responder se baseando em dados real time do CRM.
1.  Entre em contato conosco sinalizando que terminou o projeto.
1.  Apresente o que foi feito para nossa equipe.

## Recursos úteis

- Repositório do Twenty CRM: [https://github.com/twentyhq/twenty](https://github.com/twentyhq/twenty)
- Documentação do Twenty CRM:
  - [https://twenty.com/developers/local-setup](https://twenty.com/developers/local-setup)
  - [https://twenty.com/developers](https://twenty.com/developers)
- Obter chave da API do Gemini: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

## Observações

- Sinta-se à vontade para utilizar as bibliotecas e ferramentas que preferir.
- Documente seu código de forma clara e concisa.
- Estamos à disposição para esclarecer dúvidas e fornecer suporte durante o desafio.

Boa sorte! Estamos ansiosos para ver sua solução criativa e inovadora. 🚀

### Rascunho da tela

![Sem título-2024-11-05-0950](https://github.com/user-attachments/assets/76f79cc4-462a-4e47-aa3c-f9fd6dc37ad2)
