# Implementação da Spec para {objective}

Você está na fase **Code** do workflow SDD.

Input desta fase:
- O arquivo `Spec.md` gerado na etapa anterior (em `.claude/plans/`).
- O objetivo `{objective}`.

Seu objetivo é **implementar fielmente** o plano descrito em `Spec.md`,
criando e modificando apenas os arquivos especificados, em passos pequenos
e seguros.

---

## Regras gerais

- Responda em **pt-BR**.
- Não mude o escopo da SPEC por conta própria.
  - Se encontrar algo ambíguo ou contraditório, pare e registre a dúvida
    em vez de inventar requisitos.
- Trabalhe sempre seguindo o **Preflight Git/SSH** definido no
  `Prompt Geral do Projeto` e em `.claude/.ssh/rules.md`.
- A pasta `./database/migrations/archive/` representa migrations aplicadas, se houver necessidade de criar migrations salve em `./database/migrations/`.

---

## Passos

1. **Conferir a SPEC**
   - Leia o `Spec.md` por completo.
   - Faça um mini-resumo (3–6 linhas) da estratégia de implementação
     antes de começar a codar.
   - **Consultar Agentes:** Verifique `.claude/agents/README.md` para encontrar o especialista correto.
     - Leia o arquivo do agente identificado e incorpore suas regras ("Procedimento" e "DoD").

2. **Preflight Git/SSH**
   - Identifique o repositório e a branch atual.
   - Garanta que você está na branch `dev` (criando a partir de `main`
     se necessário).
   - Confirme que o `origin` usa um alias SSH válido (conforme `git.txt`
     e `GUIA-SSH-MULTIPLAS-CONTAS.md`).
   - Não exponha segredos do `ssh.txt` em nenhuma resposta.

3. **Implementar arquivo por arquivo**
   - Para cada item em `Arquivos a criar`:
     - Criar o arquivo no caminho indicado.
     - Implementar o código conforme a SPEC, reaproveitando padrões do projeto.
   - Para cada item em `Arquivos a modificar`:
     - Abrir o arquivo existente.
     - Aplicar as mudanças de forma mínima, mantendo legibilidade e coesão.
   - Agrupar mudanças em **commits pequenos e focados**.

4. **Testes e qualidade**
   - Rodar lints e testes relevantes (unit, integration, e2e, contract),
     conforme indicado na SPEC.
   - Corrigir erros até que o CI local esteja verde.

5. **Documentação**
   - Se a SPEC indicar, atualizar:
     - `README.md`
     - Arquivos em `docs/`
     - Arquivos em `.claude/stacks/` (quando a stack mudar).

6. **Commit e push (se permitido)**
   - Ao terminar um conjunto coerente de mudanças:
     - `git status`
     - `git add` apenas nos arquivos relevantes.
     - `git commit -m "mensagem clara relacionada a {objective}"`
     - `git push origin dev` usando o alias SSH adequado.
   - Se não tiver permissão para executar comandos, explique para o
     usuário exatamente quais comandos rodar.

7. **Resumo final**
   - Liste os arquivos criados/modificados.
   - Resuma as decisões importantes tomadas durante a implementação.
   - Aponte qualquer pendência, limitação ou dúvida que precise de follow-up.

> Importante: **não** gere uma nova SPEC nesta etapa; implemente estritamente
> o que está em `Spec.md`.
