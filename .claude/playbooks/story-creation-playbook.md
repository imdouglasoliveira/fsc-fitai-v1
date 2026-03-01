# Story Creation Playbook

**Purpose:** Criar um story bem-estruturado e pronto para validação pela PO.

**Success Criteria:**
- ✅ Story file criado com estrutura completa
- ✅ Acceptance Criteria (AC) escritos em formato Given/When/Then
- ✅ Escopo IN e OUT claramente definidos
- ✅ Complexity score calculado (1-20)
- ✅ Story pronto para @po validar

---

## Step 1: Reunir Informações (5-10 min)

### 1.1 Entender a Necessidade

```
[ ] Por que este story é necessário? (problema do usuário/negócio)
[ ] Qual é o resultado esperado?
[ ] Quem é o usuário final?
[ ] Qual é o benefício de negócio?
```

**Dica:** Comece respondendo estas 4 perguntas em linguagem simples.

### 1.2 Pesquisar Contexto

```
[ ] Este é um novo feature?
[ ] É uma melhoria em feature existente?
[ ] É um bug fix?
[ ] É um refactor/tech debt?
```

---

## Step 2: Estruturar o Story (15-20 min)

### 2.1 Criar Story File

```bash
# Navegar para diretório de stories
cd .claude/stories/

# Criar arquivo com padrão: {epic-num}.{story-num}.story.md
# Exemplo: 01.42.story.md
code 01.42.story.md
```

### 2.2 Preencher Seções Obrigatórias

```markdown
# STORY-42: [Título Descritivo - Max 10 palavras]

## Story Summary
[1 parágrafo: O que o usuário quer e por quê]

Example:
"Como um aluno, eu quero poder visualizar meu histórico de treinos,
para que eu possa rastrear meu progresso ao longo do tempo."

## Problem Statement
[Por que? Qual é o pain point?]

Example:
"Atualmente, alunos não conseguem visualizar histórico de treinos.
Isso dificulta o acompanhamento de progresso e motivação."

## Acceptance Criteria
[Usar formato Given/When/Then - mínimo 3, máximo 5]

Example:
- [ ] Given: Aluno autenticado, When: acessa página de histórico, Then: vê lista de últimos 10 treinos
- [ ] Given: Aluno com 0 treinos, When: acessa histórico, Then: vê mensagem "Nenhum treino registrado"
- [ ] Given: Histórico com muitos treinos, When: rola para baixo, Then: carrega mais treinos (pagination)

## Scope: IN
[O que ESTÁ incluído]
- [ ] Backend: endpoint GET /api/treinos/historico
- [ ] Frontend: página de histórico com listagem
- [ ] Database: query otimizada com pagination

## Scope: OUT
[O que ESTÁ EXCLUÍDO - importante para evitar creep]
- [ ] Filtros avançados (data range, tipo de treino) - PRÓXIMO story
- [ ] Exportar histórico para PDF - PRÓXIMO story
- [ ] Gráficos de progresso - DESIGN primeiro

## Complexity Assessment

[Taxa cada dimensão de 1-5, depois some]

| Dimensão | Score | Notas |
|----------|-------|-------|
| Scope (arquivos afetados) | 3/5 | Backend: 1 rota + service; Frontend: 1 página + hook |
| Integration (APIs externas) | 1/5 | Sem API externa |
| Infrastructure (infra nova) | 1/5 | Sem containers/env novo |
| Knowledge (conhecimento do time) | 2/5 | Pagination conhecida, mas nunca usou com este schema |
| Risk (criticidade) | 2/5 | Não afeta fluxo crítico |
| **TOTAL** | **9/25** | **STANDARD (9-15)** |

[Resultado]
- **9-15:** STANDARD complexity
- **1-8:** SIMPLE complexity
- **16+:** COMPLEX complexity

## Dependencies
[Stories/tasks que precisam terminar antes]
- None (pode começar imediatamente)
OR
- STORY-41 (usuário autenticação) - precisa estar pronto

## Definition of Done (DoD)
[O que significa "pronto"?]
- [ ] All AC met and tested
- [ ] Code review passed
- [ ] Test coverage >= 85% (new code)
- [ ] No CRITICAL issues from CodeRabbit
- [ ] API tested com Postman/Thunder Client
- [ ] Frontend tested manualmente (desktop + mobile)
- [ ] Documentation: API endpoint + pagina user guide

## Change Log
[Rastrear mudanças - append only]
- **2026-02-28:** Story created by @sm (Douglas)
```

---

## Step 3: Validar Qualidade (5 min)

### 3.1 Checklist de Estrutura

```
[ ] Título claro e descritivo (max 10 palavras)?
[ ] Summary é uma frase completa (não apenas keywords)?
[ ] Problem statement explica o "por quê"?
[ ] AC são testáveis (Given/When/Then)?
[ ] AC entre 3 e 5 (nem muito poucos, nem muitos)?
[ ] Scope: IN lista pelo menos 3 itens?
[ ] Scope: OUT lista o que está EXCLUÍDO?
[ ] Complexity calculado corretamente?
[ ] Dependencies (se houver) estão claros?
[ ] DoD são itens verificáveis (não vago)?
```

### 3.2 Validar Clarity

**Antes (ruim):**
```
# Login

Implementar login de usuário

## AC
- User can login
- User gets token
```

**Depois (bom):**
```
# Implement JWT Authentication for User Login

## Story Summary
Como usuário, quero fazer login com email e senha,
para que eu possa acessar áreas protegidas do aplicativo.

## Problem Statement
Atualmente não há autenticação. Todo endpoint é público,
criando risco de segurança.

## AC
- [ ] Given: User with valid credentials, When: POST /auth/login, Then: receive JWT token with 24h expiry
- [ ] Given: User with expired token, When: access protected route, Then: receive 401 Unauthorized
- [ ] Given: User with invalid credentials, When: POST /auth/login, Then: receive 400 Bad Request

## Complexity
15/25 (STANDARD) - Envolve crypto, JWT, middleware
```

---

## Step 4: Push para Git (5 min)

```bash
# Adicionar arquivo
git add .claude/stories/01.42.story.md

# Commit
git commit -m "docs: create STORY-42 - User authentication story"

# Push
git push origin dev
```

---

## Step 5: Criar GitHub Issue (5 min)

1. Abrir GitHub → Issues → New Issue
2. Selecionar template: **feature-story** (quando implementado)
3. Preencher com informações do story
4. Referenciar arquivo: "Story: `.claude/stories/01.42.story.md`"
5. Create Issue
6. Atualizar story file com link: `GitHub Issue: #123`

---

## Common Pitfalls

### ❌ Erros Comuns

1. **AC muito vago**
   - ❌ "User can login"
   - ✅ "Given valid credentials, When POST /auth/login, Then receive JWT"

2. **Scope creep - não excluir o que NÃO faz**
   - ❌ Só listar: "Backend, Frontend, Database"
   - ✅ Listar IN e OUT: "NOT including social login or 2FA"

3. **Complexity super estimado**
   - ❌ "Score: 20" (crítico/mega-feature?)
   - ✅ "Score: 12" (sim, é feature, mas conhecida)

4. **Dependências esquecidas**
   - ❌ Story assumindo outro está pronto, mas não está
   - ✅ "Depende de STORY-41 (database schema)"

5. **DoD muito vago**
   - ❌ "Code is good"
   - ✅ "Coverage >= 85%, all AC met, no CRITICAL issues"

---

## Story File Checklist (Copy-Paste)

Use isto ANTES de fazer push:

```markdown
## Story Creation Checklist

- [ ] Título: claro e descritivo (max 10 palavras)
- [ ] Summary: 1-2 frases explicando o "quê" e "por quê"
- [ ] Problem Statement: explica o pain point
- [ ] AC 1: Given/When/Then formato
- [ ] AC 2: Given/When/Then formato
- [ ] AC 3: Given/When/Then formato
- [ ] Scope IN: lista pelo menos 3 itens
- [ ] Scope OUT: lista o que está EXCLUÍDO explicitamente
- [ ] Complexity: score 1-20 com cálculo
- [ ] Dependencies: listadas ou "None"
- [ ] DoD: itens verificáveis
- [ ] Change Log: entry criada com data + author
- [ ] File structure: válido Markdown
- [ ] Git: adicionado e commiteado
- [ ] GitHub Issue: criada e linkada (opcional primeira vez)
```

---

## Resources

- **CLAUDE.md** — Project patterns
- **Story Template:** `.claude/templates/story-template.md`
- **Complexity Assessment:** `.claude/templates/complexity-assessment.md`

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
