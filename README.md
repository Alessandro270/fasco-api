<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="blank"><img src="https://img.shields.io/npm/l/@nestjs/common.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="blank"><img src="https://opencollective.com/nest/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="blank"><img src="https://opencollective.com/nest/paypal/badge.svg" alt="Donate us"/></a>
    <a href="https://support.nestjs.com" target="blank"><img src="https://img.shields.io/badge/Support-NestJS%20Support%20Sponsor-41B883.svg" alt="Support us"></a>
</p>

# Fasco API

API de e-commerce desenvolvida com NestJS e MongoDB. O projeto fornece recursos para cadastro e autenticação de usuários, catálogo de produtos e categorias, avaliações, usuários administradores, recuperação de senha por OTP e registro de compras e checkout.

## Principais funcionalidades

### Autenticação e usuários
- Cadastro de usuários com nome, sobrenome, email e senha.
- Validação de email único e hash da senha com bcrypt (12 rounds).
- Login com email e senha e geração de token JWT.
- Autenticação global por bearer token.
- Perfil do usuário autenticado através do token.
- Perfis `USER` e `ADMIN`.
- Listagem, consulta e exclusão lógica de usuários por administradores.
- Recuperação de senha em três etapas: solicitação de OTP por email, validação do código e redefinição da senha com token válido por 10 minutos.

### Produtos
- Cadastro, consulta, atualização e exclusão lógica de produtos.
- Consulta paginada de produtos com suas avaliações.
- Consulta individual com dados da categoria e avaliações relacionadas.
- Campos de nome, quantidade, preço unitário, tamanho, cor, imagem, marca e descrição.
- Associação obrigatória do produto a uma categoria existente.
- Operações administrativas de criação, atualização e remoção protegidas pela função `ADMIN`.

### Categorias
- Cadastro, consulta, atualização e exclusão lógica de categorias.
- Consulta paginada e consulta individual por ID.
- Associação de produtos às categorias por nome.
- Operações administrativas protegidas pela função `ADMIN`.

### Avaliações
- Usuários autenticados podem avaliar um produto com uma nota entre 0 e 5.
- Uma avaliação por usuário para o mesmo produto é atualizada quando já existe.
- Consulta das avaliações de um produto.
- Avaliações relacionadas diretamente na resposta de produtos.

### Checkout e compras
- Registro de checkout com país, nome, sobrenome, endereço e CEP.
- Registro dos dados do cartão de crédito e titular.
- Validação do número do cartão, código de segurança e data de expiração.
- Registro dos itens comprados, quantidades e preços.
- Criação encadeada da compra e do checkout.
- Resposta de sucesso após concluir o checkout.

### Recursos transversais
- MongoDB com Mongoose e soft delete em todos os recursos genéricos.
- Paginação com `page` e `limit`, incluindo total de registros e páginas.
- Validação global de payloads com `class-validator` e `class-transformer`.
- Rejeição de campos não declarados nos DTOs.
- Validação de IDs MongoDB nos parâmetros das rotas.
- CORS habilitado.
- Prefixo global `/v1/api`.
- Documentação Swagger disponível em `/api`.
- Envio de email via Nodemailer para códigos OTP e notificações.
- Configuração por variáveis de ambiente.

## Tecnologias

- NestJS 11
- TypeScript
- MongoDB e Mongoose
- JWT
- bcrypt
- otplib
- Nodemailer
- Swagger/OpenAPI
- class-validator e class-transformer
- Jest e Supertest

## Pré-requisitos

- Node.js
- npm
- Uma instância MongoDB
- Conta ou servidor SMTP para envio de emails

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/fasco

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d

MAIL_HOST=smtp.exemplo.com
MAIL_PORT=587
MAIL_USER=usuario@example.com
MAIL_PASS=senha
MAIL_FROM=Fasco <no-reply@example.com>
```

## Executando a aplicação

```bash
# desenvolvimento
npm run start

# modo watch
npm run start:dev

# modo debug
npm run start:debug

# compilação
npm run build

# produção
npm run start:prod
```

Por padrão, a API será disponibilizada em `http://localhost:3000` e a documentação Swagger em `http://localhost:3000/api`.

## Endpoints

Todas as rotas abaixo usam o prefixo `/v1/api`, exceto a interface Swagger.

### Autenticação — `/auth`

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| POST | `/auth/login` | Autentica usuário | Público |
| POST | `/auth/signup` | Cadastra usuário | Público |
| POST | `/auth/forgot-password` | Solicita código OTP por email | Público |
| POST | `/auth/verify-otp` | Valida OTP e gera token de recuperação | Público |
| POST | `/auth/reset-password` | Redefine a senha | Público |

### Usuários — `/user`

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| GET | `/user` | Lista usuários paginados | ADMIN |
| GET | `/user/me` | Obtém o usuário autenticado | Autenticado |
| GET | `/user/:id` | Obtém usuário por ID | ADMIN |
| DELETE | `/user/:id` | Exclui usuário logicamente | ADMIN |

### Produtos — `/Product`

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| GET | `/Product` | Lista produtos e avaliações paginados | Autenticado |
| GET | `/Product/:id` | Obtém produto por ID | Autenticado |
| GET | `/Product/:id/review` | Lista avaliações do produto | Autenticado |
| PUT | `/Product/:id/review` | Cria ou atualiza a avaliação do usuário | Autenticado |
| POST | `/Product` | Cria produto | ADMIN |
| PATCH | `/Product/:id` | Atualiza produto | ADMIN |
| DELETE | `/Product/:id` | Exclui produto logicamente | ADMIN |

### Categorias — `/category`

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| GET | `/category` | Lista categorias paginadas | Autenticado |
| GET | `/category/:id` | Obtém categoria por ID | Autenticado |
| POST | `/category` | Cria categoria | ADMIN |
| PATCH | `/category/:id` | Atualiza categoria | ADMIN |
| DELETE | `/category/:id` | Exclui categoria logicamente | ADMIN |

### Checkout — `/checkout`

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| POST | `/checkout` | Cria compra e registra o checkout | Autenticado |

## Autenticação nas requisições

Envie o token JWT no cabeçalho `Authorization`:

```http
Authorization: Bearer SEU_TOKEN_JWT
```

Os endpoints de login, cadastro e recuperação de senha são públicos. Os endpoints administrativos exigem a função `ADMIN`.

## Paginação

As rotas de listagem genérica aceitam os parâmetros:

```http
GET /v1/api/Product?page=1&limit=10
GET /v1/api/category?page=1&limit=10
GET /v1/api/user?page=1&limit=10
```

A resposta contém `data`, `total` e `totalPages`.

## Testes

```bash
# testes unitários
npm run test

# testes e2e
npm run test:e2e

# cobertura
npm run test:cov
```

## Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run build` | Compila a aplicação com Nest CLI |
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo watch |
| `npm run start:debug` | Inicia em modo debug/watch |
| `npm run start:prod` | Executa a build de produção |
| `npm run lint` | Executa ESLint e aplica correções |
| `npm run format` | Formata arquivos TypeScript |
| `npm run test` | Executa testes Jest |
| `npm run test:e2e` | Executa testes e2e |
| `npm run test:cov` | Gera relatório de cobertura |
