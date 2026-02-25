# 🚀 Ubistart - TODO API

API REST desenvolvida como desafio técnico backend em Node.js.

O objetivo da aplicação é permitir que usuários gerenciem seus itens de TODO e que administradores possam visualizar e filtrar todas as tarefas do sistema.

---

# 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Docker
- JWT (Autenticação)
- Bcrypt (Hash de senha)

---

# 🧠 Decisões Arquiteturais

## Estrutura em Camadas

A aplicação foi estruturada seguindo separação de responsabilidades:

- **Controllers** → Camada de entrada HTTP
- **Services** → Regras de negócio
- **Repositories** → Acesso ao banco de dados
- **Middlewares** → Autenticação e autorização
- **Config** → Configuração do banco
- **Utils** → Tratamento de erros

Essa separação garante:

- Código organizado
- Manutenibilidade
- Testabilidade
- Escalabilidade
- Clareza arquitetural

---

## Por que não foi utilizado um framework mais robusto (ex: NestJS ou AdonisJS)?

Para este desafio, optei por utilizar **Node.js com Express**, sem frameworks mais completos, pelos seguintes motivos:

1. **Escopo controlado**  
   A aplicação possui regras de negócio bem definidas e complexidade moderada (CRUD com autenticação e autorização). O uso de um framework mais robusto adicionaria abstração desnecessária para o contexto do desafio.

2. **Demonstração explícita de arquitetura**  
   A estrutura em camadas foi implementada manualmente para evidenciar domínio de:
   - Separação de responsabilidades
   - Organização modular
   - Middleware de autenticação
   - Tratamento centralizado de erros

3. **Simplicidade e legibilidade**  
   A escolha por uma stack mais enxuta mantém o projeto objetivo, legível e focado na qualidade da implementação.

---

## Quando eu utilizaria um framework mais robusto?

Em cenários com:

- Múltiplos módulos complexos
- Injeção de dependência estruturada
- Arquitetura DDD
- Microsserviços maiores
- Times com múltiplos desenvolvedores

Nestes casos, frameworks como NestJS agregariam padronização e escalabilidade.

---

# 🗄️ Banco de Dados

## Tabela: users

| Campo       | Tipo        |
|------------|------------|
| id         | CHAR(36)   |
| email      | VARCHAR    |
| password   | VARCHAR    |
| role       | USER/ADMIN |
| created_at | DATETIME   |

## Tabela: todos

| Campo        | Tipo      |
|-------------|----------|
| id          | CHAR(36) |
| description | TEXT     |
| due_date    | DATETIME |
| created_at  | DATETIME |
| updated_at  | DATETIME |
| completed_at| DATETIME |
| user_id     | FK       |

---

# 🔐 Autenticação

A autenticação é feita via JWT.

O token contém:

```json
{
  "id": "user_id",
  "role": "USER | ADMIN"
}