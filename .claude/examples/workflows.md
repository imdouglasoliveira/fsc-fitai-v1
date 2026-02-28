# 🔎 Workflow de Pesquisa

Use para iniciar uma nova tarefa.

```bash
claudecode "Analise {TAREFA} usando @.claude/prompts/01-search.md

{TAREFA} = XYZ"
```

---

# 📝 Workflow de Especificação

Use após a pesquisa, para gerar o plano técnico.

```bash
claudecode "Gere a SPEC para {TAREFA} usando @.claude/prompts/02-spec.md usando o PRD salvo em XYZ

{TAREFA} = XYZ"
```

---

# 💻 Workflow de criação de tasks

Use para codar baseado na SPEC validada.

```bash
claudecode "Gere as tasks da {TAREFA} usando @.claude/prompts/03-tasks.md, a SPEC da {TAREFA} está salvo em XYZ, o PRD está salvo em XYZ.

{TAREFA} = XYZ"
```

---

# 💻 Workflow de Implementação

Use para codar baseado na SPEC validada.

```bash
claudecode "Implemente {TAREFA} usando @.claude/prompts/04-code.md, a SPEC da {TAREFA} está salvo em XYZ, o PRD está salvo em XYZ e as tasks da {TAREFA} está salvo em `.claude\tasks\`.

{TAREFA} = XYZ"

**IMPORTANTE**:
1. Schemma do banco de dados atual: `database\schema\schemma.sql`
2. Views: `database\schema\views.sql`
3. Functions: `database\schema\functions.sql`
4. Triggers: `database\schema\triggers.sql`
5. Backend/API do projeto em `./packages/backend`
6. Frontend do projeto em `./packages/frontent`
7. Ao concluir as tasks, e antes do envio para o repo, rode o build para verificar SE a aplicação está estável, SE houver erros, corrija-os antes d enviar para o repo. 
8. SEMPRE ao concluir uma task, marque-a como concluída e faça commit e push para o repo adequado.
9. SEMPRE responda em PTBR.
```

---

# 🧪 Workflow de Revisão de Implementação (UI/UX / Fidelidade ao layout)

Reviar a UI implementada, mas não fielmente, ou seja, quando precisar de ajustes.

```bash
claudecode "Revise a implementação da {TAREFA} usando @.claude/agents/uiux-planner.system.md.

A SPEC da {TAREFA} está em {SPEC_PATH}, o PRD está em {PRD_PATH} e as tasks da {TAREFA} estão em {TASKS_DIR}.
Use o procedimento definido em uiux-planner.system.md (preflight, auditoria de fluxos, heurísticas Nielsen + WCAG, severidade, etc.).

Layout/base de referência (quando houver): {LAYOUT_BASE}.

Objetivo da revisão:
- Verificar a aderência entre:
  - o que foi implementado hoje;
  - o que está descrito na SPEC/PRD;
  - o layout/base de referência ({LAYOUT_BASE}) e anexos.
- Foco em UX/UI, comportamento visual e fluxo de uso.
- NÃO tratar este fluxo como bugfix genérico; é uma revisão de alinhamento de implementação vs especificação.

FAÇA A REVISÃO COM FOCO EM:
{REVISAO}

Considere também o contexto técnico:
1. Schema atual do banco de dados: `database\schema\schema.sql`
2. Views: `database\schema\views.sql`
3. Backend/API do projeto em `.\packages\backend`
4. Frontend do projeto em `.\packages\frontend`

SAÍDA ESPERADA (EM PT-BR):

1) **Resumo executivo**
   - 3–5 bullets explicando, em alto nível, o estado atual da implementação vs o esperado.

2) **Lista de divergências de UI/UX**
   - Use uma tabela ou lista estruturada com:
     - `seção / tela / fluxo`
     - `comportamento/layout ESPERADO` (segundo PRD/SPEC/layout base)
     - `comportamento/layout IMPLEMENTADO` (como está hoje)
     - `impacto na experiência` (ex.: confusão, fricção, risco de erro)
     - `severidade` (P0/P1/P2)
     - `sugestão de ajuste` (objetiva, implementável)

3) **Plano de ação / tasks**
   - Liste as tasks necessárias para alinhar a implementação ao esperado, agrupadas por prioridade (P0/P1/P2).
   - Para cada task, descreva:
     - contexto rápido;
     - o que deve ser feito;
     - critérios de aceite (DoD);
     - arquivos/áreas prováveis impactadas (frontend, backend, DB, etc.).

4) **Orientações finais**
   - Se for necessário refino no PRD/SPEC ou criação de novas tasks em `{TASKS_DIR}`, indique claramente.

SEMPE RESPONDA EM PTBR."

{TAREFA}     = """DESCREVA AQUI A TAREFA/FEATURE QUE ESTÁ SENDO REVISADA."""
{SPEC_PATH}  = ".claude\specs\XXX-SPEC-*.md"
{PRD_PATH}   = ".claude\plans\XXX-PRD-*.md"
{TASKS_DIR}  = ".claude\tasks\"
{LAYOUT_BASE}= "CAMINHO/REFERÊNCIA DO PROJETO BASE (FIGMA, .backup\UI\..., etc.)"
{REVISAO}    = """
1. Ponto de revisão A…
2. Ponto de revisão B…
3. Ponto de revisão C…
"""
```


---

# 🐛 Workflow de Bugfix

Quando surgir um erro específico.

```bash
claudecode "Analise e corrija o erro {ERRO} usando @.claude/agents/debugger.system.md e @.claude/prompts/04-code.md"
```

ou ```bash
Analise e corrija o erro {ERRO} usando @.claude/agents/debugger.system.md e @.claude/prompts/04-code.md

{ERRO} = .temp\01-logs_result.json

Fizemos uma atualização na API, removendo da railway e migrando para vercel, a {TAREFA} era:

"""
O frontend já foi migrado para vercel! Agora preciso adequar a API para ser migrada para vercel, analise o docs\migration-vercel\guia-api.md e planeje a migração da API. Aproveite e remova os arquivos tanto do backend quanto do frontend que não precisamos mais em ./allyra-api ./allyra-saas como exemplo allyra-saas\wrangler.json
"""

A SPEC da {TAREFA} está salvo em .claude\specs\001-SPEC-migracao-api-vercel.md, o PRD está salvo em .claude\plans\001-PRD-migracao-api-vercel.md e as tasks estão salvo em `.claude\tasks\`.
```