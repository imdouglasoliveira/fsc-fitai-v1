# Pesquisa para {objective}

Você está na fase **Pesquisa** do workflow SDD (Spec-Driven Development).

Seu objetivo aqui é **apenas entender o contexto** necessário para implementar
**{objective}**, sem ainda escrever especificação técnica nem mexer no código.

---

## Regras gerais

- Não faça alterações de código nesta fase.
- Responda sempre em **pt-BR**.
- Use a janela de contexto de forma enxuta: registre só o que será útil na SPEC.
- Sempre que precisar entender a stack, consulte os arquivos em `.claude/stacks/`.
  - Se estiver vazio, peça para criar a partir de `templates/stacksOfTheProject.md` ou inferir do projeto.
- Gere o `PRD` com prefixo do numero atual do `PRD`, para isso verifique qual o numero atual.

---

## Passos

1. **Entenda o objetivo**
   - Leia com cuidado o texto entre chaves `{objective}`.
   - Se algo estiver vago, registre as dúvidas na seção “Perguntas em aberto”
     do PRD em vez de inventar requisitos.

2. **Mapeie a base de código**
   - Pesquise no repositório arquivos relacionados a {objective}.
   - Liste:
     - Arquivos diretamente afetados.
     - Componentes, hooks, serviços ou endpoints reutilizáveis.
     - Locais onde a feature já aparece (se for refactor/ajuste).

3. **Leia documentação relevante**
   - Verifique `README.md`, `docs/`, `docs/guides/stacks.md` e qualquer guia
     específico (security, backend, UI/UX, etc.).
   - Anote regras de negócio, decisões arquiteturais e convenções importantes.

3.1 *Schemma do banco de dados*
  - Verifique o arquivo salvo em database\schema\schemma.sql

3.2 *API, Frontend, scrapings e landingpage*
  - Verifique a pasta ./packages, nela teremos todos os arquivos respectivos a Backend, Frontend, scrapings, e landingpage do projeto.

1. **Padrões internos de implementação**
   - Identifique como o projeto já resolve problemas parecidos:
     - Estrutura de rotas, páginas e layouts.
     - Padrões de formulários, validações e chamadas de API.
     - Organização de testes e factories.
   - Prefira reutilizar padrões existentes a criar algo totalmente novo.

2. **Padrões externos (opcional)**
   - Quando necessário, consulte documentação oficial das libs citadas em
     `docs/guides/stacks.md`.
   - Registre só o essencial para a implementação; evite colar blocos grandes de docs.

3. **Produza o `PRD.md`**
   - Gere um arquivo `PRD.md` dentro de `.claude/plans/` (ou no diretório de planos configurado).
   - Estruture, no mínimo, as seções:
     - `Objetivo`
     - `Arquivos relevantes da base de código`
     - `Regras de negócio / contexto`
     - `Padrões de implementação internos`
     - `Padrões / referências externas (se houver)`
     - `Riscos ou pontos de atenção`
     - `Perguntas em aberto`
   - Seja conciso: foque em informações que serão usadas na SPEC.

---

## Resposta esperada nesta conversa

1. Um **resumo curto** (5–10 linhas) do que foi descoberto.
2. O **caminho** onde o `PRD.md` foi salvo (por padrão: `.claude/plans/PRD.md` ou nome equivalente).
