# Student API

API para cadastro de alunos desenvolvida com Express.js, TypeScript, Sequelize e MySQL.

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env` com suas credenciais do MySQL.

3. Certifique-se de que o banco de dados MySQL esteja rodando e crie o banco `pi_db`:
```sql
CREATE DATABASE pi_db;
```

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## Documentação

A documentação da API está disponível em: http://localhost:3000/api-docs

## Endpoints

- `POST /api/students` - Cadastra um novo aluno

### Exemplo de requisição:

```json
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "ra": "2024001",
  "rg": "123456789",
  "senha": "minhasenha123",
  "email": "joao@email.com",
  "telefone": "11999999999"
}
```