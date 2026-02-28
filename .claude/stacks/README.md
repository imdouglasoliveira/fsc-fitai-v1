# Stacks do Projeto A8Z

Este documento descreve todas as tecnologias e ferramentas utilizadas no Projeto A8Z, um sistema full-stack de gestão de oportunidades freelance.

## Arquitetura Geral

```
Scrapers (Python) → Supabase (PostgreSQL) → API (Fastify) → Dashboard (React)
                                          ↓
                                    Railway (API)
                                    Cloudflare Pages (Frontend)
```

---

## Frontend (Dashboard)

**Package:** `packages/frontend/`
**Deploy:** Cloudflare Pages ([gestao.a8z.com.br](https://gestao.a8z.com.br))
**Repositório:** `imdouglasoliveira/a8z-frontend`

### Core Stack
- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **TanStack Router v1** - Roteamento com type-safe
- **TanStack Table v8** - Tabelas avançadas com sorting/filtering

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Componentes acessíveis (Radix UI)
- **Lucide React** - Ícones
- **Vaul** - Bottom sheet mobile-first
- **Recharts** - Gráficos e dashboards
- **canvas-confetti** - Animações de celebração
- **react-beautiful-dnd** - Drag & drop para kanban

### State & Data
- **TanStack Query** - Data fetching e cache
- **Supabase JS** - Cliente do banco de dados
- **Zustand** (se usado) - State management leve

### Utilities
- **date-fns** - Manipulação de datas
- **react-hook-form** - Formulários
- **zod** - Validação de schemas

### Developer Tools
- **ESLint** - Linting
- **TypeScript 5+** - Type checking

---

## Backend (API)

**Package:** `packages/backend/`
**Deploy:** Railway ([api.a8z.com.br](https://api.a8z.com.br))
**Repositório:** `imdouglasoliveira/a8z-api`

### Core Stack
- **Node.js 20+** - Runtime
- **TypeScript** - Type safety
- **Fastify** - Framework web de alta performance
- **TSX** - TypeScript executor para dev
- **ESM** - Módulos ECMAScript (`"type": "module"`)

### Database & Auth
- **Supabase JS** - Cliente PostgreSQL + Auth
- **@supabase/supabase-js** - SDK oficial

### Validation & Typing
- **Zod** - Schema validation para body/params
- **Fastify JSON Schema** - Response types

### Testing
- **Vitest** - Framework de testes
- **@vitest/coverage-v8** - Coverage reports (mínimo 70%)
- **Faker.js** - Geração de dados de teste

### DevOps
- **tsx watch** - Dev server com hot reload
- **railway.json** - Config de deploy

---

## Database

**Provedor:** Supabase (PostgreSQL managed)
**Acesso:** REST API + Supabase JS Client

### Features Utilizadas
- **PostgreSQL 15+** - Banco relacional
- **Row Level Security (RLS)** - Segurança por linha
- **Views** - `projeto_sorted`, `proposta_sorted`, etc.
- **Triggers** - Auditoria automática
- **Constraints** - Foreign keys, UNIQUE, CHECK
- **JSONB** - Campos `meta`, `dados_anteriores`, `dados_novos`

### Schema Modules
- **Core CRM:** `projeto`, `proposta`, `cliente`, `status_catalog`
- **Financeiro:** `receita`, `despesa`, `categoria_financeira`, `conta_bancaria`, `extrato_bancario`
- **Agenda:** `evento_agenda`
- **Tarefas:** `tarefa`
- **Usuarios:** `usuarios` (team management)
- **Auditoria:** `audit_log`, `hist_*_status`
- **Notificações:** `notificacao`

---

## Scrapers

**Package:** `packages/scrapings/`
**Ambiente:** Local (Windows/Linux)
**Repositório:** `imdouglasoliveira/a8z-scrapings`

### Core Stack
- **Python 3.10+** - Linguagem principal
- **Selenium** - Automação de navegador
- **Chrome DevTools Protocol** - Controle de Chrome persistente
- **BeautifulSoup4** - Parsing HTML
- **requests** - HTTP client

### Data Pipeline
- **Supabase Python Client** - Escrita no banco
- **ScrapingDatabaseWriter** - Context manager para UPSERT

### Configuration
- **YAML** - `scrapers_config.yaml` (enable/disable scrapers)
- **python-dotenv** - Variáveis de ambiente

### Platforms Scraped
- Workana
- Upwork (feed + saved jobs)
- Reddit (r/forhire)
- Asimov

### Tools
- **Chrome Profile Manager** - `tools/chrome_profile/` (autenticação persistente)
- **Batch/Shell scripts** - Setup e automação

---

## Landing Page

**Package:** `packages/landingpage/`
**Deploy:** Cloudflare Pages
**Repositório:** `imdouglasoliveira/a8z-landingpage`

### Stack
- **React 19** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

### Routes
- `/` - Home
- `/obrigado` - Thank you page
- `/nao-e-o-momento-ideal` - Not interested page

---

## DevOps & Deploy

### Hosting & Infrastructure
- **Cloudflare Pages** - Frontend + Landing Page
  - Auto-deploy on push to `main`
  - Branches: `dev` → `beta` → `main`
- **Railway** - Backend API
  - Nixpacks builder
  - Health check: `/health`
  - Auto-deploy conectado ao GitHub

### CI/CD (GitHub Actions)
Cada sub-repo tem:
- **ci.yml** - Build + type check (dev/beta/main + PRs)
- **deploy.yml** - Deploy to Cloudflare (frontend only)
- **auto-merge.yml** - Auto-merge dev → beta

### Deployment Tools
- **Wrangler CLI** - Cloudflare Pages deploy
- **Railway CLI** (opcional) - Railway management
- **gh CLI** - GitHub operations (PRs, issues)

### Version Control
- **Git** - VCS
- **GitHub** - Hosting + CI/CD
- **SSH keys** - `git@github-imdouglas` alias

---

## Development Tools

### Package Managers
- **npm** - Node.js packages
- **pip** - Python packages
- **nvm/nvm4w** - Node version management

### Code Quality
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** (se usado) - Code formatting
- **TypeScript** - Static type checking
- **Vitest** - Testing framework

### Environment Management
- **.env files** - Configuração por package
  - `packages/backend/.env` - API config
  - `packages/frontend/.env` - Dashboard config
  - `.env` (root) - Scraper config

### Browsers & Automation
- **Chrome** - Browser para scrapers
- **Chrome DevTools Protocol** - Remote debugging
- **Selenium WebDriver** - Browser automation

---

## Monitoring & Logs

### Backend
- **Fastify Logger** - Request/response logging
- **Console logs** - Development debugging

### Database
- **Supabase Dashboard** - Query logs, performance
- **audit_log table** - Application-level audit trail

### Scrapers
- **Log files** - Timestamped logs em `projeto-link-logs-*.txt`
- **Console output** - Real-time progress

---

## Security

### Authentication
- **Supabase Auth** - JWT-based authentication
- **Email/Password** - Login method
- **Password Recovery** - Via email (Magic Link)

### Authorization
- **Bearer Tokens** - API authentication
- **Row Level Security (RLS)** - Database-level access control

### Best Practices
- **Environment Variables** - Secrets nunca commitados
- **CORS** - Configurado via `CORS_ORIGINS`
- **Input Validation** - Zod schemas em todas as rotas

---

## Data Import & Export

### Import Scripts (Python)
- **import_financeiro_completo.py** - Receitas + Despesas + NFSe
- **import_extrato_excel.py** - Extratos bancários (Inter/Santander)

### Data Formats
- **CSV** - Receitas, despesas, contas
- **XML** - NFSe (Nota Fiscal de Serviço Eletrônica)
- **Excel (XLSX)** - Extratos bancários

### Deduplication
- **Hash MD5** - Extratos bancários (`hash_transacao`)
- **UPSERT** - Por `referencia + mes + ano` (receitas/despesas)

---

## Design System

### Color Palette (shadcn/ui)
- **CSS Variables** - `--background`, `--foreground`, `--card`, `--primary`, etc.
- **Dark Mode** - Via Tailwind `dark:` classes
- **Theme Hook** - `useTheme()` com localStorage persistence

### Component Patterns
- **ResponsiveModal** - Dialog (desktop) + BottomSheet (mobile)
- **StandardModal** - Modal com header colorido por variante
- **UserSearchSelect** - Seletor de usuários com busca
- **Collapsible Sections** - localStorage para preferências

### Typography
- **Font Family** - System fonts (Tailwind default)
- **Font Sizes** - Tailwind utility classes

---

## Utilities & Libraries

### Date & Time
- **date-fns** - Formatação e manipulação
- **Date API nativa** - `toISOString()`, `new Date()`

### Data Processing
- **Faker.js** - Geração de dados de teste
- **Zod** - Validação de schemas
- **JavaScript Array/Object methods** - Map, filter, reduce

### HTTP & Network
- **Fetch API** - Frontend requests
- **Fastify** - Backend HTTP server
- **Supabase Client** - Database REST API

---

## Performance Optimization

### Frontend
- **Code Splitting** - Vite automatic chunks
- **Lazy Loading** - Dynamic imports
- **Memoization** - React.memo, useMemo
- **TanStack Query** - Request caching e deduplication

### Backend
- **Fastify** - One of the fastest Node.js frameworks
- **Database Views** - Pre-joined data (`projeto_sorted`, `proposta_sorted`)
- **Indexed Queries** - PostgreSQL indexes

### Database
- **Views** - Pre-computed joins
- **Indexes** - Em foreign keys e campos de busca
- **JSONB** - Campos flexíveis sem schema adicional

---

## Conventions & Standards

### Code Style
- **TypeScript Strict Mode** - `strict: true`
- **ESM Imports** - `.js` extension obrigatória no backend
- **Path Aliases** - `@/` para `src/`
- **Naming** - camelCase (JS/TS), snake_case (SQL)

### Git Workflow
- **Branches** - `dev` → `beta` → `main`
- **Commits** - Conventional Commits (feat, fix, docs, etc.)
- **Co-authored** - `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`

### Testing Standards
- **Coverage** - Mínimo 70%
- **Test Files** - `__tests__/*.test.ts`
- **Factories** - `src/tests/factories/`
- **Mocks** - `src/tests/utils/mocks/`

---

## Roadmap Tech Debt

### Planned Improvements
- [ ] Supabase Type Generation - Eliminar `@ts-ignore` em `.update()`
- [ ] E2E Testing - Playwright ou Cypress
- [ ] Storybook - Component documentation
- [ ] Monitoring - Sentry ou similar
- [ ] Performance Profiling - Lighthouse CI

### Known Limitations
- **No offline support** - Requires internet connection
- **Manual migration apply** - Via Supabase SQL Editor
- **Local-only features** - Scraping, validation, link import

---

## Useful Commands Reference

### Development
```bash
npm run dev              # API + Dashboard em paralelo
npm run dev:lp           # Landing page
start.bat                # Windows: terminais separados
```

### Testing
```bash
npm run test             # Backend tests (Vitest)
npm run test:coverage    # Com relatório de coverage
```

### Build & Deploy
```bash
npm run build            # Build all packages
npm run build:lp         # Build landing page
VITE_API_URL=https://api.a8z.com.br npm run build  # Frontend production
```

### Scraping
```bash
npm run scrape           # All scrapers
npm run scrape:dry       # Dry-run (preview)
npm run scrape:workana   # Specific scraper
npm run scrape:upwork-saved  # Upwork saved jobs
```

### Data Import
```bash
python packages/scrapings/scripts/import_financeiro_completo.py --dry-run
python packages/scrapings/scripts/import_extrato_excel.py <file.xlsx>
```

---

## Documentation

- **CLAUDE.md** - Guia principal para Claude Code
- **COMANDOS.md** - Referência de comandos (scraping)
- **docs/comandos-importacao-dados_financeiro.md** - Importação de dados
- **docs/archive/troubleshooting.md** - Base de conhecimento de issues

---

**Última atualização:** 2026-02-04
**Versão do Node.js:** 20+
**Versão do Python:** 3.10+
**Modelo Claude:** Sonnet 4.5
