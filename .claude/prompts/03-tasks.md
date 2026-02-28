# Planejamento de tasks para {objective}

Você está na **etapa 3 – Tasks** do fluxo:

1. **Search** → entender o contexto e gerar `PRD.md`
2. **Spec** → detalhar solução técnica em `Spec.md`
3. **Tasks** → transformar a SPEC em tasks claras e executáveis
4. **Code** → implementar as tasks

Seu papel agora é **ler a Spec de {objective}** (e o PRD, se necessário) e gerar um conjunto de tasks pequenas, objetivas e bem definidas, usando **exatamente** o template de task abaixo.

---

## Como pensar sobre as tasks

1. **Entenda o escopo real**
   - Leia o `Spec.md` por completo.
   - Confirme quais entregas são obrigatórias para {objective} (MVP) e quais são melhorias opcionais (follow-ups/P2).
   - Identifique mudanças de:
     - **backend** (APIs, jobs, regras de negócio)
     - **frontend / UI-UX** (componentes, páginas, roteamento)
     - **migrations** (banco de dados, schema, índices)
     - **tests** (unit, integration, e2e, contract)
     - **security** (permissões, políticas, validações, exposição de dados)
     - **infra / DevOps / geral** (observabilidade, docs, grooming, etc.)

2. **Quebre em tasks pequenas**
   - Cada task deve ser realizável em **até algumas horas de trabalho focado**.
   - Evite tasks gigantes tipo “Implementar toda a feature”.
   - Prefira tasks como:
     - “Criar endpoint X com validações Y”
     - “Atualizar componente Z para suportar fluxo W”
     - “Adicionar testes E2E para o fluxo de checkout”

3. **Cubra todas as áreas necessárias**
   - Se a SPEC mencionar alterações em mais de uma camada, distribua as tasks por área:
     - `backend`, `ui-ux`, `routers`, `migrations`, `tests`, `security`, `general`.
   - Se faltar decisão importante (ex.: “qual estratégia de migração de dados?”), crie uma task de **discovery/alinhamento** antes da implementação.

4. **Defina prioridade e ordem**
   - Use `P0` para tasks críticas que bloqueiam a entrega de {objective} ou a saúde do sistema.
   - Use `P1` para tasks importantes mas não bloqueadoras imediatas.
   - Use `P2` para refinamentos, optimizações e follow-ups.
   - Pense em uma sequência lógica: modelagem → implementação → testes → docs → rollout/monitoramento.

---

## Formato obrigatório da saída

Você **deve** gerar um conjunto de tasks em Markdown, **apenas** no formato abaixo, uma após a outra, separadas por linhas em branco.

Não inclua comentários fora do template.

```md
---
id: TASK-{{yyyy}}{{mm}}-{{seq}}
title: <ação objetiva no imperativo>
area: <security|backend|ui-ux|routers|migrations|tests|general>
labels: [agent:<slug>, type:<refactor|bug|feature|chore>]
priority: <P0|P1|P2>
estimate: "<2h|4h|1d|…>"
assignees: []
due: null
links: []
---

## Contexto
<o que motivou, sintomas, evidências — referencie PRD/Spec quando útil>

## Objetivo
<resultado esperado em 1–2 frases, específico para esta task>

## Plano de execução
- [ ] Passo 1
- [ ] Passo 2

## Critérios de aceitação (DoD)
- [ ] Testes/CI verdes
- [ ] Sem regressões
- [ ] Métrica/efeito verificado: <ex.: p95 ≤ 300ms | cobertura ≥ 70% | CSP sem violações>

## Riscos & Rollback
- <risco principal ou incerteza>
- Plano de rollback: <git tag/commit ou estratégia clara de reversão>

**IMPORTANT**: SALVE a tasks com prefixo numerada iniciando por "01" em `.claude/tasks/`.