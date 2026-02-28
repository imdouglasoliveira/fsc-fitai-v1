# Spec para {objective}

Você está na fase **Spec** do workflow SDD.

Input desta fase:
- O `PRD.md` salvo em `.claude/plans/`.
- O objetivo `{objective}`.

Seu objetivo é transformar o PRD em uma **SPEC técnica clara**, dizendo
exatamente **quais arquivos serão criados/modificados** e **o que deve
acontecer em cada um**. Ainda **não é hora de escrever o código final**.

---

## Regras gerais

- Responda em **pt-BR**.
- Não replique o PRD inteiro; use apenas o que é necessário.
- Não implemente código completo nesta fase (no máximo trechos pequenos
  de exemplo ou pseudocódigo).
- A SPEC deve ser suficiente para que outro agente consiga implementar
  sem precisar “adivinhar”.

---

## Passos

1. **Leia o PRD por completo**
   - Entenda o contexto, regras de negócio e arquivos relevantes.
   - Se existirem “Perguntas em aberto”, registre-as também na SPEC.
   - **Consultar Agentes:** Verifique `.claude/agents/README.md` para encontrar o especialista correto. Incorpore seus requisitos na SPEC.

2. **Defina o escopo**
   - Explicite o que está **dentro** e o que está **fora** da entrega.
   - Aponte riscos/decisões que possam impactar prazo ou arquitetura.

3. **Liste arquivos a criar/modificar**
   - Separe em:
     - `Arquivos a criar`
     - `Arquivos a modificar`
   - Para cada arquivo, indique:
     - Caminho exato.
     - Papel/Responsabilidade.
     - Se é frontend, backend, infra, teste, migration, etc.

4. **Detalhe o que fazer em cada arquivo**
   - Descreva:
     - Novas funções, componentes, hooks, endpoints, migrations, etc.
     - Campos/props importantes e como interagem.
     - Fluxos de sucesso, erro e edge cases relevantes.
   - Quando necessário, use **pseudocódigo** ou listas de passos.

5. **Inclua testes, métricas e docs**
   - Para cada mudança importante, associe:
     - Arquivos de teste (unit/integration/e2e/contract).
     - Métricas/telemetria, se houver.
     - Atualizações em `README.md`, `docs/` ou arquivos em `.claude/stacks/`.

6. **Produza o `Spec.md`**
   - Salve um arquivo `Spec.md` dentro de `.claude/plans/` (ou diretório de planos).
   - Estrutura mínima sugerida:
     - `Objetivo`
     - `Escopo`
     - `Arquivos a criar`
     - `Arquivos a modificar`
     - `Fluxos e regras importantes`
     - `Testes`
     - `Métricas/observabilidade`
     - `Pontas soltas / Riscos / Perguntas`

---

## Resposta esperada nesta conversa

1. A SPEC completa, em formato Markdown. A SPEC deve ser salva em `.claude/specs`.
2. O caminho onde o `Spec.md` foi salvo.
