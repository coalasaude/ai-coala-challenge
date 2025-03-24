#!/bin/bash
cd /app
# Instalar dependências
pip install -r requirements.txt
# Executar a aplicação
fastapi dev main.py --host 0.0.0.0 --port 8000
# Se quiser manter o container em execução após o comando
exec "$@"