#!/bin/bash

# Verifica se a API key foi fornecida como parâmetro
if [ $# -eq 0 ]; then
    echo "Erro: API key não fornecida"
    echo "Uso: $0 <api_key>"
    exit 1
fi

API_KEY=$1

# Verifica se os arquivos necessários existem
if [ ! -f app/docker-compose.yaml ]; then
    echo "Erro: arquivo app/docker-compose.yml não encontrado"
    exit 1
fi

if [ ! -f app/entry_point.sh ]; then
    echo "Erro: arquivo app/entry_point.sh não encontrado"
    exit 1
fi

# Torna o entry_point.sh executável
chmod +x app/entry_point.sh

# Verifica se o arquivo .env.example existe
if [ ! -f app/.env.example ]; then
    echo "Erro: arquivo app/.env.example não encontrado"
    exit 1
fi

# Adiciona ou atualiza a API key no arquivo .env.example
if grep -q "TWENTY_API_KEY=" app/.env.example; then
    # Substitui a linha existente
    sed -i "s|TWENTY_API_KEY=.*|TWENTY_API_KEY=${API_KEY}|g" app/.env.example
else
    # Adiciona a nova linha
    echo -e "\nTWENTY_API_KEY=${API_KEY}" >> app/.env.example
fi

# Cria o arquivo .env_app a partir do .env.example
cp app/.env.example app/.env_app
cp app/.env.example app/.env

# Executa o docker-compose up
echo "Iniciando o container..."
docker-compose -f app/docker-compose.yaml up -d