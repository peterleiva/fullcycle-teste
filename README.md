# Teste para desenvolvedor Node/React

Este é um repositório que faz parte do [processo seletivo fullcycle](https://github.com/codeedu-tests/node-react-sync-upload-tests). Se trata de desafio para upar arquivos.

## Rodando localmente

### Instale as dependências

```bash
npm install
```

### Rode a aplicação

para rodar o backend e frontend ao mesmo tempo é necessário definir uma variável de ambiente para frontend reconhecer o endpoint do backend

```bash
REACT_APP_API_URL="http://localhost:3001" npx turbo run dev
```

## Docker

### Rode localmente usando Docker Compose

```bash
docker-compose up
```
