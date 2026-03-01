# Checklist: Story Creation

**Use this checklist BEFORE pushing a new story.**

Copie e preencha cada item. Não pule nada.

---

## Story Structure

- [ ] **Título**: claro e descritivo (máx 10 palavras)
- [ ] **Summary**: 1-2 frases explicando "o quê" e "por quê"
- [ ] **Problem Statement**: explica o pain point e por que é necessário
- [ ] **Acceptance Criteria**: mínimo 3, máximo 5 critérios
- [ ] **AC formato**: todos em "Given/When/Then"
- [ ] **Scope: IN**: lista mínimo 3 itens do que ESTÁ incluído
- [ ] **Scope: OUT**: lista o que ESTÁ EXCLUÍDO explicitamente
- [ ] **Complexity**: score calculado (1-20)
- [ ] **Dependencies**: listadas ou "None"
- [ ] **DoD (Definition of Done)**: itens verificáveis

---

## Content Quality

- [ ] **Clareza**: uma pessoa não familiarizada consegue entender?
- [ ] **Sem jargão**: linguagem acessível (não técnica quando possível)
- [ ] **AC testáveis**: cada AC pode ser verificado?
- [ ] **Sem ambiguidade**: há apenas uma forma de interpretar?
- [ ] **Está completo**: faltam informações críticas?

---

## Complexity Assessment

- [ ] **Scope**: scored (files, components, routes afetados)
- [ ] **Integration**: scored (APIs externas)
- [ ] **Infrastructure**: scored (novo deploy, containers, etc.)
- [ ] **Knowledge**: scored (time familiaridade com padrão)
- [ ] **Risk**: scored (criticidade)
- [ ] **Total**: calculado e categorizado (SIMPLE/STANDARD/COMPLEX)

---

## Technical Accuracy

- [ ] **Architecture valid**: segue patterns do projeto?
- [ ] **Database**: schema changes (se houver) são necessários?
- [ ] **API contract**: endpoints estão bem definidos?
- [ ] **Frontend**: componentes e hooks estão planejados?
- [ ] **Security**: não introduz vulnerabilidades?

---

## Git & GitHub

- [ ] **File created**: `.claude/stories/{epic}.{num}.story.md`
- [ ] **File structure**: válido Markdown
- [ ] **Git**: `git add .claude/stories/...`
- [ ] **Commit**: `git commit -m "docs: create STORY-X - [title]"`
- [ ] **Push**: `git push origin dev`

---

## GitHub Issue (Opcional na 1ª vez)

- [ ] **Issue criada**: template usado?
- [ ] **Story file linkado**: referência ao arquivo `.claude/stories/...`
- [ ] **Issue linkada**: URL copiada para story file

---

## Final Validation

- [ ] **Todo item acima checkado?** → SIM? Pronto para @po validar!
- [ ] **Algum item deixado em branco?** → Volte e complete
- [ ] **Confiança alta?** → SIM? Pode fazer push
- [ ] **Dúvidas?** → Peça para @dev-lead revisar antes

---

**Resultado:**
- ✅ Story criada e pronta para validação (@po)
- ✅ Arquivo commitado e pusheado
- ✅ Pronto para fase seguinte (validação)

---

*Último atualizado: 2026-02-28*
