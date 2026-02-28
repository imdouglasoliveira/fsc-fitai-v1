# 📝 Exemplos de Commits - Conventional Commits

## Estrutura Básica

```
<tipo>(<escopo>): <descrição>

<corpo - opcional>

<rodapé - opcional>
```

---

## Tipos e Exemplos

### 1️⃣ `feat:` - Nova Funcionalidade

```bash
feat: adicionar CRUD de alunos
feat(students): implementar listagem de alunos
feat(auth): adicionar login com JWT
feat(api): criar endpoints de treinos
```

**Commit Completo:**
```bash
feat(students): implementar cadastro de alunos

- Adiciona validação de email único
- Cria tabela no banco de dados
- Implementa validações de entrada
- Adiciona testes unitários

Closes #42
```

### 2️⃣ `fix:` - Correção de Bug

```bash
fix: corrigir validação de email
fix(auth): resolver erro de login
fix(students): corrigir duplicação de registros
fix(api): corrigir resposta vazia em listar
```

**Commit Completo:**
```bash
fix(auth): corrigir erro ao fazer login com senha especial

O usuário não conseguia fazer login se a senha tivesse
caracteres especiais. O erro estava no escape SQL.

Testes: ✅ Passou na validação local
Closes #89
```

### 3️⃣ `docs:` - Documentação

```bash
docs: atualizar README com instruções
docs(setup): adicionar guia de instalação
docs(api): documentar endpoints de autenticação
docs: adicionar guia de contribuição
```

### 4️⃣ `style:` - Formatação

```bash
style: formatar código com Prettier
style(components): remover espaços em branco
style: aplicar convenção de nomeação
```

### 5️⃣ `refactor:` - Refatoração

```bash
refactor: reorganizar estrutura de pastas
refactor(auth): extrair lógica em serviço
refactor(components): separar responsabilidades
refactor(db): melhorar queries do Prisma
```

### 6️⃣ `test:` - Testes

```bash
test: adicionar testes de login
test(students): aumentar cobertura para 90%
test(api): adicionar testes de integração
test: corrigir testes flaky
```

### 7️⃣ `chore:` - Atualizações

```bash
chore: atualizar dependências
chore(deps): upgrade para TypeScript 5.9.3
chore(package): atualizar pnpm-lock.yaml
chore: limpar arquivos temporários
```

### 8️⃣ `ci:` - CI/CD

```bash
ci: adicionar workflow de validação
ci: configurar GitHub Actions
ci(deploy): criar pipeline de deploy
ci: melhorar logs da ação
```

---

## Exemplos Completos por Feature

### Feature: Autenticação

#### 1. Criar modelo
```bash
feat(auth): criar modelo de usuário

- Adiciona tabela users com Prisma
- Campos: id, email, senha (hash), createdAt
- Adiciona validações básicas
```

#### 2. Implementar login
```bash
feat(auth): implementar endpoint de login

- POST /auth/login com email e senha
- Gera JWT válido por 24h
- Retorna token e dados do usuário
- Adiciona testes unitários
```

#### 3. Adicionar middleware
```bash
feat(auth): adicionar middleware de autenticação

- Valida JWT em requisições protegidas
- Retorna erro 401 se inválido
- Extrai userId do token
```

#### 4. Corrigir bug
```bash
fix(auth): impedir que token expire muito cedo

Causa: Configuração de TTL incorreta
Solução: Ajustar expiração para 24h
Teste: ✅ Login mantém sessão por 24h
```

---

### Feature: CRUD de Alunos

#### 1. Criar tabela
```bash
feat(students): criar schema do banco de dados

- Tabela com campos: id, nome, email, idade
- Adiciona índices para busca rápida
- Cria migrations com Prisma
```

#### 2. Criar endpoint de listagem
```bash
feat(students): implementar GET /students

- Lista todos os alunos
- Suporta paginação (limit, offset)
- Suporta filtro por nome
- Retorna 200 com array de alunos
```

#### 3. Criar endpoint de cadastro
```bash
feat(students): implementar POST /students

- Cria novo aluno
- Valida email único
- Valida campos obrigatórios
- Retorna 201 com aluno criado
```

#### 4. Criar endpoint de atualização
```bash
feat(students): implementar PUT /students/:id

- Atualiza aluno existente
- Valida ID
- Valida novos dados
- Retorna 200 com aluno atualizado
```

#### 5. Criar endpoint de deleção
```bash
feat(students): implementar DELETE /students/:id

- Deleta aluno por ID
- Verifica se existe
- Retorna 204 No Content
- Não permite deletar aluno com treinos ativas
```

#### 6. Adicionar testes
```bash
test(students): adicionar testes de CRUD

- Teste de criar aluno válido ✓
- Teste de rejeitar email duplicado ✓
- Teste de listar alunos ✓
- Teste de atualizar aluno ✓
- Teste de deletar aluno ✓
- Cobertura: 95%
```

---

## Padrões Avançados

### Referência de Issues

```bash
feat: adicionar sistema de relatórios

Closes #123          # Fecha issue 123
Fixes #124           # Fecha issue 124
Resolves #125        # Fecha issue 125
Related to #126      # Relacionado a 126
```

### Breaking Changes

```bash
feat!: mudar estrutura da API

BREAKING CHANGE: Endpoints de /api/v1 são removidos
Migrate para /api/v2 com nova estrutura

Closes #200
```

### Co-autoria (após aprovação)

```bash
feat: implementar dashboard

Co-Authored-By: Gabriel Kendy <gabriel@example.com>
Co-Authored-By: Adriano Morais <adriano@example.com>
```

---

## Anti-padrões ❌

### ERRADO - Mensagens genéricas
```bash
git commit -m "update"          # ❌
git commit -m "fix"             # ❌
git commit -m "changes"         # ❌
git commit -m "ajuste"          # ❌
```

### CORRETO - Mensagens específicas
```bash
git commit -m "fix(auth): corrigir erro de token"     # ✅
git commit -m "feat(api): adicionar endpoint"         # ✅
git commit -m "docs: atualizar guia de contribuição"  # ✅
```

---

## Checklist de Qualidade

Antes de fazer commit:

```
[ ] Código compila sem erros?
[ ] Tipo está correto (feat, fix, etc)?
[ ] Descrição é clara e em português?
[ ] Referência de issue (se houver)?
[ ] Testes estão passando?
[ ] Linting passou?
[ ] É apenas uma funcionalidade?
[ ] Não tem código comentado?
[ ] Não tem console.log de debug?
```

---

## Workflow Rápido

```bash
# 1. Trabalhe na funcionalidade
# 2. Verifique mudanças
git status
git diff

# 3. Execute validações
pnpm lint
pnpm test
pnpm build

# 4. Adicione ao staging
git add .

# 5. Faça commit com mensagem estruturada
git commit -m "feat(auth): adicionar login com JWT"

# 6. Push para dev
git push origin dev

# 7. Veja GitHub Actions validando automaticamente
# GitHub Actions → Actions tab
```

---

## Referência Rápida

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: adicionar CRUD` |
| `fix` | Correção de bug | `fix: corrigir validação` |
| `docs` | Documentação | `docs: atualizar README` |
| `style` | Formatação | `style: aplicar prettier` |
| `refactor` | Refatoração | `refactor: extrair serviço` |
| `test` | Testes | `test: aumentar cobertura` |
| `chore` | Atualizações | `chore: atualizar deps` |
| `ci` | CI/CD | `ci: adicionar workflow` |
| `perf` | Performance | `perf: otimizar query` |
| `build` | Build | `build: atualizar config` |

---

**Dúvidas?** Revise `.claude/skills/commit-dev/SKILL.md`
