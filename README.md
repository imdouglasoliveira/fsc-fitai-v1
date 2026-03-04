# 🚀 Bootcamp Fullstack - Sistema de Gestão de Treinos

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

## 📋 Descrição do Projeto

Este é um projeto de bootcamp da [Fullstack Club](https://www.fullstackclub.com.br/) onde irei desenvolver um **Sistema de Gestão de Treinos** (Workout Management System) completo, do zero ao deploy, utilizando as tecnologias mais demandadas do mercado.

### 🎯 Objetivo

Construir uma aplicação fullstack para gerenciamento de treinos acadêmicos, permitindo:

- 📝 Criação e gerenciamento de planos de treino
- 🏋️ Cadastro de exercícios e equipamentos
- 👥 Gestão de alunos e instrutores
- 📊 Acompanhamento de progresso
- 📱 Interface responsiva para acesso mobile

## 🛠️ Tecnologias Utilizadas

| Tecnologia     | Descrição                                      |
| -------------- | ---------------------------------------------- |
| **Node.js**    | Runtime JavaScript para o backend              |
| **Fastify**    | Framework web rápido e eficiente para API REST |
| **TypeScript** | Superset JavaScript com tipagem estática       |
| **Next.js**    | Framework React para frontend e SSR            |
| **Docker**     | Containerização da aplicação                   |
| **PostgreSQL** | Banco de dados relacional (sugestão)           |
| **Prisma**     | ORM para interação com banco de dados          |

## 📂 Estrutura do Projeto

```
bootcamp-sgt/
├── backend/           # API REST com Node.js + Fastify
│   ├── src/
│   │   ├── routes/   # Rotas da API
│   │   ├── controllers/ # Lógica de negócio
│   │   ├── services/   # Serviços da aplicação
│   │   ├── repositories/ # Acesso a dados
│   │   └── ...
│   ├── prisma/       # Schema do banco de dados
│   └── package.json
│
├── frontend/          # Aplicação web com Next.js
│   ├── src/
│   │   ├── app/      # Páginas e layouts (App Router)
│   │   ├── components/ # Componentes React
│   │   ├── services/    # Chamadas à API
│   │   ├── hooks/       # Custom Hooks
│   │   └── ...
│   └── package.json
│
├── docker-compose.yml # Orquestração de containers
└── README.md
```

## 🚀 Começando

### Pré-requisitos

- Node.js (v18+)
- Docker e Docker Compose
- Git
- npm ou yarn

### Instalação

1. **Clono o repositório:**

```bash
git clone https://github.com/seu-usuario/bootcamp-sgt.git
cd bootcamp-sgt
```

2. **Configuro as variáveis de ambiente:**

Crio um arquivo `.env` na raiz do projeto:

```env
# Backend
DATABASE_URL="postgresql://user:password@localhost:5432/sgt?schema=public"
JWT_SECRET="sua-chave-secreta-aqui"
PORT=3001

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. **Inicio com Docker:**

```bash
docker-compose up -d
```

4. **Ou instalo manualmente:**

```bash
# Backend
cd backend
npm install
npx prisma migrate dev
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm run dev
```

5. **Acesso a aplicação:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📚 Funcionalidades

### Módulo de Autenticação

- [ ] Login de usuários
- [ ] Registro de novos usuários
- [ ] Recuperação de senha
- [ ] JWT Authentication

### Módulo de Alunos

- [ ] Cadastro de alunos
- [ ] Listagem de alunos
- [ ] Edição de dados
- [ ] Inativação de alunos

### Módulo de Treinos

- [ ] Criação de planos de treino
- [ ] Associação de exercícios
- [ ] Definição de séries e repetições
- [ ] Histórico de treinos

### Módulo de Exercícios

- [ ] Cadastro de exercícios
- [ ] Categorização (peito, costas, pernas, etc.)
- [ ] Cadastro de equipamentos
- [ ] Instruções e imagens

### Módulo de Relatórios

- [ ] Dashboard com métricas
- [ ] Relatório de frequência
- [ ] Evolução dos alunos

## 🔧 Scripts Disponíveis

### Backend

```bash
npm run dev          # Inicia o servidor em modo desenvolvimento
npm run build        # Compila o projeto
npm start            # Inicia o servidor em modo produção
npx prisma studio    # Abre o Prisma Studio (interface do banco)
```

### Frontend

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Compila para produção
npm start            # Inicia em modo produção
npm run lint         # Executa o linter
```

## 📝 Convenções & Padrões

### Commits

Utilizo o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login issue"
git commit -m "docs: update README"
```

### Branches

- `main` - Branch principal (produção)
- `develop` - Branch de desenvolvimento
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs
- `hotfix/*` - Correções críticas em produção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [Fullstack Club](https://www.fullstackclub.com.br/) - Pelo excelente bootcamp
- [Felipe Fontoura](https://www.instagram.com/felipefdev/) - Instrutor do bootcamp

---

<p align="center">
  Desenvolvido com ❤️ durante o Bootcamp Fullstack
</p>
