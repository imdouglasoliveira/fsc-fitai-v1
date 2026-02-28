# 🤖 .claude/ - O Cérebro do Workflow Agentico

Este diretório contém toda a inteligência, configurações e processos que guiam os agentes de IA no desenvolvimento do projeto **A8Z**.

A estrutura foi desenhada para suportar o fluxo **SDD (Spec-Driven Development)**, garantindo contexto, segurança e consistência técnica.

---

## 📂 Estrutura de Diretórios

### `agents/` (Os Especialistas)
Contém os "personas" ou papéis especializados.
- **`README.md`**: Índice central de todos os agentes.
- **`*.system.md`**: Instruções e DoDs (Definition of Done) para cada especialista (ex: `security`, `backend`, `uiuxPlanner`).
- *Uso:* O Prompt de Código consulta o `README.md` desta pasta para saber qual especialista invocar.

### `prompts/` (O Fluxo de Trabalho)
Prompts principais que orquestram as fases do desenvolvimento.
- **`01-search.md`**: Pesquisa e contexto -> Gera PRD em `plans/`.
- **`02-spec.md`**: Definição técnica -> Gera SPEC em `plans/`.
- **`03-code.md`**: Implementação -> Gera Código.

### `stacks/` (O Contexto Técnico)
Definições imutáveis da tecnologia do projeto.
- O agente consulta esta pasta para saber "como fazemos X aqui" (ex: `frontend.md`, `backend.md`).
- *Objetivo:* Evitar alucinações sobre bibliotecas ou padrões não usados no projeto.

### `tasks/` (As Demandas)
Entrada de trabalho.
- Local para salvar tickets, descrições de funcionalidade ou bugs antes de processá-los.

### `plans/` (A Memória)
Saída das fases de planejamento.
- Armazena os **PRDs** (Produto) e **SPECs** (Técnico) gerados pelos prompts.
- Servem como "contrato" antes da escrita de código.

### `examples/` (Cheat Sheets)
Exemplos práticos e comandos rápidos.
- **`workflows.md`**: Comandos prontos para copiar e colar (`claudecode ...`).

### `templates/` (Padronização)
Arquivos base para novos artefatos.
- **`taskTemplate.md`**: Modelo padrão para abertura de tasks.

---

## 🚀 Como Usar

O fluxo padrão segue 3 etapas:

1. **Pesquisa**: Entender o problema.
   ```bash
   claudecode "Analise {TAREFA} usando @.claude/prompts/01-search.md"
   ```

2. **Especificação**: Planejar a solução.
   ```bash
   claudecode "Gere a SPEC para {TAREFA} usando @.claude/prompts/02-spec.md"
   ```

3. **Código**: Executar com segurança.
   ```bash
   claudecode "Implemente {TAREFA} usando @.claude/prompts/03-code.md"
   ```

---

## ⚙️ Configuração (`settings.local.json`)

Define os caminhos críticos para o Claude Code:
```json
{
  "plansDirectory": ".claude/plans",
  "stacksDirectory": ".claude/stacks",
  "tasksDirectory": ".claude/tasks",
  ...
}
```
