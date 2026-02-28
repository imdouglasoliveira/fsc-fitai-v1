# Bootcamp SGT - Regras de Desenvolvimento

Você está trabalhando com **Sistema de Gestão de Treinos (SGT)**, um projeto fullstack para gerenciamento de treinos acadêmicos.

## 📋 Sobre o Projeto

- **Nome**: Sistema de Gestão de Treinos (SGT)
- **Tipo**: Fullstack Web Application
- **Stack**: Node.js + Fastify (Backend) | Next.js (Frontend)
- **Linguagem**: TypeScript
- **BD**: PostgreSQL + Prisma ORM
- **Bootcamp**: Fullstack Club

## 🌍 Preferências Gerais

- **Idioma**: Sempre responder em **Português Brasileiro**
- **Package Manager**: `pnpm` (v10.30.3)
- **Node.js**: v18+

## 📂 Estrutura do Projeto

```
bootcamp-sgt/
├── backend/              # API REST (Fastify + Node.js)
│   ├── src/
│   │   ├── routes/      # Rotas da API
│   │   ├── controllers/ # Lógica de negócio
│   │   ├── services/    # Serviços da aplicação
│   │   ├── repositories/# Acesso a dados
│   │   ├── middlewares/ # Middlewares
│   │   └── index.ts     # Entry point
│   ├── prisma/          # Schema do banco de dados
│   └── package.json
│
├── frontend/             # App Web (Next.js + React)
│   ├── src/
│   │   ├── app/         # Páginas (App Router)
│   │   ├── components/  # Componentes React
│   │   ├── services/    # Serviços (chamadas à API)
│   │   ├── hooks/       # Custom Hooks
│   │   ├── types/       # TypeScript types/interfaces
│   │   └── styles/      # Estilos globais
│   └── package.json
│
├── .claude/             # Configurações Claude Code
├── CLAUDE.md            # Este arquivo (raiz)
├── README.md            # Documentação do projeto
├── docker-compose.yml   # Orquestração de containers
└── .env.example         # Template de variáveis
```

## 🚀 Scripts Principais

### Backend
```bash
pnpm run dev          # Modo desenvolvimento
pnpm run build        # Compilar TypeScript
pnpm start            # Modo produção
npx prisma studio    # Interface do banco
npx prisma migrate dev # Migração do BD
```

### Frontend
```bash
pnpm run dev          # Servidor de desenvolvimento
pnpm run build        # Compilar para produção
pnpm run lint         # Verificar linting
```

## 📝 Padrões de Código

### Commits (Conventional Commits)
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação (sem lógica)
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Atualizações

**Exemplo**: `feat: adicionar CRUD de alunos`

### Branches
- `main` - Produção
- `develop` - Desenvolvimento
- `feature/nome-feature` - Novas funcionalidades
- `fix/nome-bug` - Correções
- `hotfix/nome` - Críticas em produção

### Nomeação de Código
- **Variáveis/Funções**: `camelCase`
- **Tipos/Interfaces**: `PascalCase`
- **Componentes React**: `PascalCase`
- **Arquivos**: `kebab-case` ou `snake_case`
- **Comentários**: Em português

## ⚙️ Configurações Técnicas

- **TypeScript**: v5.9.3 (strict mode)
- **ESLint**: v9.39.3
- **Prettier**: v3.8.1
- **Husky**: v9.1.7 (git hooks)

## 🔐 Variáveis de Ambiente

### Backend (`.env` na pasta backend/)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/sgt?schema=public"
JWT_SECRET="sua-chave-secreta-aqui"
PORT=3001
NODE_ENV="development"
```

### Frontend (`.env.local` na pasta frontend/)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📚 Funcionalidades Planejadas

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

## 🎯 Padrões de Desenvolvimento

### Ao implementar features:
1. Leia o código existente primeiro
2. Siga os padrões do projeto
3. Mantenha componentes focados e testáveis
4. Adicione testes para novas funcionalidades
5. Atualize documentação se necessário

### Ao trabalhar com Backend (Fastify):
- Use decorators de rota estruturados
- Separe controllers, services e repositories
- Implemente error handling robusto
- Use Prisma para queries ao BD

### Ao trabalhar com Frontend (Next.js):
- Use App Router (não Pages Router)
- Crie componentes reutilizáveis
- Implemente error boundaries
- Use custom hooks para lógica compartilhada

### Ao fazer commits:
- Use conventional commits
- Referencie issues quando aplicável
- Mantenha commits atômicos
- Exemplo: `feat: implement student CRUD endpoints`

## 🔗 Links Úteis

- [Fullstack Club](https://www.fullstackclub.com.br/)
- [Fastify Docs](https://www.fastify.io/)
- [Next.js Docs](https://nextjs.org/)
- [Prisma Docs](https://www.prisma.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 💡 Dicas de Produtividade

- Use `/commit` para fazer commits estruturados
- Use `/feature-dev` para adicionar features
- Sempre execute `pnpm install` após mudanças em package.json
- Teste frequentemente durante desenvolvimento
- Mantenha o código limpo e bem documentado

---
*Bootcamp SGT - Configuração Claude Code v1.0*
