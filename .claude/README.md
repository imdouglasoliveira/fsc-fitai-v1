# 🎯 A8Z Framework — Índice Master

Bem-vindo ao **A8Z Framework** do projeto **Bootcamp SGT**. Este diretório contém toda a infraestrutura de desenvolvimento inteligente, autônomo e adaptativo.

---

## 📚 Comece Aqui — Seu Papel?

| Papel | Leia Primeiro | Depois Leia |
|-------|--------------|-------------|
| **Story Manager (@sm)** | [Story Creation Playbook](playbooks/story-creation-playbook.md) | [Checklist](checklists/story-creation-checklist.md) |
| **Developer (@dev)** | [Dev Implementation Playbook](playbooks/dev-implementation-playbook.md) | [Pre-Push Checklist](checklists/pre-push-checklist.md) |
| **QA Engineer (@qa)** | [Story Lifecycle Rule](rules/story-lifecycle.md) | [QA Gate Checklist](checklists/qa-gate-checklist.md) |
| **Architect** | [Agent Authority Rule](rules/agent-authority.md) | [IDS Principles](rules/ids-principles.md) |
| **Team Lead** | Framework Overview (abaixo) | [All Rules](#-regras-governança) |

---

## 🗂️ Estrutura do Diretório

```
.claude/
├── README.md                          ← Você está aqui (índice master)
├── CLAUDE.md                          ← Framework guide detalhado (PT-BR)
│
├── agents/                            ← AI specialists por domínio
│   ├── README.md
│   ├── backend.system.md
│   ├── security.system.md
│   └── ... (12 agentes)
│
├── rules/                             ← Governance & decisões
│   ├── agent-authority.md             (EXCLUSIVE roles)
│   ├── ralph-integration.md           (Phase 1: autonomous loops)
│   ├── bmad-integration.md            (Phase 2: prompt optimization)
│   ├── skill-composition.md           (Phase 3: workflow orchestration)
│   ├── story-lifecycle.md             (4-phase development)
│   ├── workflow-routing.md            (Phase 5: intelligent routing)
│   ├── memory-system.md               (Phase 4: decision audit)
│   └── ... (9 rules totais)
│
├── playbooks/                         ← Procedimentos operacionais passo-a-passo
│   ├── README.md
│   ├── story-creation-playbook.md     ← Como criar um story
│   ├── dev-implementation-playbook.md ← Como implementar
│   ├── feature-developer.md           ← Feature guide end-to-end
│   └── ... (mais planejados)
│
├── checklists/                        ← Copy-paste checklists
│   ├── story-creation-checklist.md
│   ├── dev-phase-checklist.md
│   ├── pre-push-checklist.md
│   ├── qa-gate-checklist.md
│   └── ... (conforme necessário)
│
├── templates/                         ← Estruturas reutilizáveis
│   ├── story-template.md
│   ├── complexity-assessment.md
│   ├── clarity-scoring.md
│   └── workflow-selection-tree.md
│
├── skills/                            ← Custom commands (/ralph, /bmad, etc.)
│   ├── README.md
│   └── ... (7 skills)
│
├── prompts/                           ← Prompt registry & versioning
│   ├── REGISTRY.md
│   ├── 01-search/, 02-spec/, etc.
│   └── ... (5 prompt phases)
│
├── memory/                            ← Learning & decision audit
│   ├── decision-log.json
│   ├── patterns/
│   └── learning/
│
├── stories/                           ← Story files (criados por @sm)
│   └── *.story.md
│
└── worktrees/                         ← Ralph loop isolation (transient)
    └── STORY-X-ralph/
```

---

## 🚀 Framework Overview

### O que é A8Z?

Framework **AI-driven** que integra 7 fases de automação inteligente:

| Fase | Nome | Propósito | Resultado |
|------|------|-----------|-----------|
| 1 | **Ralph Loop** | Exploração iterativa autônoma | Spec claro (ambíguo → determinado) |
| 2 | **BMAD** | Otimização de prompts (teste variantes) | Melhores outputs (0.79 → 0.86 score) |
| 3 | **Skill Composition** | Orquestração de skills em workflows | Automação end-to-end |
| 4 | **Memory System** | Auditoria estruturada de decisões | Aprendizado contínuo |
| 5 | **Workflow Routing** | Seleção inteligente de melhor caminho | Path otimizado por story |
| 6 | **Orchestration Dashboard** | Status & metrics em tempo real | `/status` command |
| 7 | **Learning & Cleanup** | Synthesis + framework evolution | Framework melhora com tempo |

---

## 📖 Rules (Teórico — Governança)

Leia para entender **POR QUÊ**:

### Governance Core
- **[agent-authority.md](rules/agent-authority.md)** — Quem pode fazer o quê (EXCLUSIVE roles)
- **[ids-principles.md](rules/ids-principles.md)** — REUSE > ADAPT > CREATE (evitar duplication)

### Development Workflows
- **[story-lifecycle.md](rules/story-lifecycle.md)** — Draft → Ready → InProgress → InReview → Done (4-phase)
- **[workflow-execution.md](rules/workflow-execution.md)** — 4 primary workflows
- **[workflow-routing.md](rules/workflow-routing.md)** — Quando usar Ralph vs SDD vs Rapid

### Framework Phases (1-7)
- **[ralph-integration.md](rules/ralph-integration.md)** — Phase 1: Autonomous exploration
- **[bmad-integration.md](rules/bmad-integration.md)** — Phase 2: Prompt optimization
- **[skill-composition.md](rules/skill-composition.md)** — Phase 3: Workflow orchestration
- **[memory-system.md](rules/memory-system.md)** — Phase 4: Decision audit trail
- (Phases 5-7 documentadas mas veja regras)

### Infrastructure
- **[coderabbit-integration.md](rules/coderabbit-integration.md)** — Self-healing code reviews

---

## 🎬 Playbooks (Prático — Procedimentos)

Leia para **FAZER COISAS**:

1. **[Story Creation Playbook](playbooks/story-creation-playbook.md)** — 5 steps criar story bem-formado
2. **[Dev Implementation Playbook](playbooks/dev-implementation-playbook.md)** — 9 steps do dev ao push
3. **[Feature Developer Playbook](playbooks/feature-developer.md)** — End-to-end implementation guide

**Planejados:** QA Review, Escalation, Bug Fix, Refactoring playbooks

---

## ✅ Checklists (Operacional — Não Esquecer)

Use para **VALIDAR**:

- **[story-creation-checklist.md](checklists/story-creation-checklist.md)** — Antes de push de story novo
- **[dev-phase-checklist.md](checklists/dev-phase-checklist.md)** — Passo-a-passo durante dev
- **[pre-push-checklist.md](checklists/pre-push-checklist.md)** — Antes de git push
- **[qa-gate-checklist.md](checklists/qa-gate-checklist.md)** — Validação antes de merge

---

## 📋 Templates (Estruturas Reutilizáveis)

Use para estruturar:

- **[story-template.md](templates/story-template.md)** — Estrutura de um story
- **[complexity-assessment.md](templates/complexity-assessment.md)** — Como calcular score
- **[clarity-scoring.md](templates/clarity-scoring.md)** — Como medir clareza
- **[workflow-selection-tree.md](templates/workflow-selection-tree.md)** — Árvore de decisão

---

## 🤖 Skills (Comandos Customizados)

Use `/comando`:

| Skill | O Quê | Quando |
|-------|--------|--------|
| `/ralph {story}` | Autonomous exploration | Requisitos < 50% clarity |
| `/bmad {phase}` | Test prompt variants | Testing improvements |
| `/compose {story}` | Auto-orchestrate skills | Story Ready → Implement |
| `/audit {story}` | Log decision outcome | End of implementation |
| `/workflow-select {story}` | Recommend workflow | Unsure of path |
| `/status` | Framework dashboard | Weekly/monthly review |

---

## 🧠 Agents (AI Specialists)

Veja [agents/README.md](agents/README.md) para overview dos 12 agentes especializados.

---

## 💾 Memory & Learning

Framework aprende com tempo:

- **[decision-log.json](memory/decision-log.json)** — Structured log de decisões
- **[Memory System Rule](rules/memory-system.md)** — Como funciona
- **learning/** — Monthly insights & patterns

---

## 🎓 Quick Start by Role

### Story Manager (@sm)
```
1. Leia: Story Creation Playbook
2. Abra: .claude/stories/
3. Use: story-creation-checklist.md
4. Push + notifique @po
```

### Developer (@dev)
```
1. Leia: Dev Implementation Playbook
2. Use: dev-phase-checklist.md
3. Use: /be, /fe, /tdd conforme needed
4. CodeRabbit self-heal
5. Pre-push-checklist.md + push
6. Notifique @qa
```

### QA Engineer (@qa)
```
1. Leia: story-lifecycle.md
2. Use: qa-gate-checklist.md
3. Teste todos AC manualmente
4. Revise código
5. Decida: PASS/CONCERNS/FAIL
```

---

## 🔄 Common Tasks

| Pergunta | Resposta |
|----------|----------|
| Como criar um story? | [Story Creation Playbook](playbooks/story-creation-playbook.md) |
| Como implementar? | [Dev Implementation Playbook](playbooks/dev-implementation-playbook.md) |
| Quando usar Ralph? | [Workflow Routing](rules/workflow-routing.md) |
| Como fazer commit? | Use skill `/commit-dev` |
| CRITICAL no CodeRabbit? | Escalate to @architect |

---

## 📊 Framework Status

| Fase | Status | Docs | Ready |
|------|--------|------|-------|
| 1: Ralph | ✅ Live | ✅ | ⏳ Operational |
| 2: BMAD | ✅ Live | ✅ | ⏳ Operational |
| 3: Composition | ✅ Live | ✅ | ⏳ Operational |
| 4: Memory | ✅ Live | ✅ | ⏳ Operational |
| 5: Routing | ✅ Live | ✅ | ⏳ Operational |
| 6: Dashboard | ✅ Live | ✅ | ⏳ Operational |
| 7: Learning | 🟡 Planned | ✅ | Next Sprint |

---

## 🔗 Relacionamentos

```
RULES (teórico)
  ↓ (explica)
PLAYBOOKS (procedimento)
  ↓ (detalha)
CHECKLISTS (validação)
  ↓ (usa)
TEMPLATES (estrutura)
```

---

## ⚙️ Config

Para integração com VS Code:
- `.vscode/settings.json` (quando criado)
- `.devcontainer/devcontainer.json` (quando criado)

---

## 📞 Help

| Situação | Ação |
|----------|------|
| Não entendo uma rule | Leia o arquivo correspondente |
| Como fazer X? | Procure playbook; se não existir, abra issue |
| Novo no projeto | Escolha seu role acima, siga Quick Start |
| Problema no framework | Abra issue: `[framework] Problem...` |

---

**Last Updated: 2026-02-28**
**Framework: A8Z v1.0 | Status: 🟢 Operational**
