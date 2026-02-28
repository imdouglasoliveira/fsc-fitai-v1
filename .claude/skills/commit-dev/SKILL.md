---
name: "commit-dev"
description: "Faz commits e push para branch dev com padrão Conventional Commits"
trigger: "quando o usuário quer fazer commit e push para dev"
---

# 🔄 Skill: Commit Dev com Conventional Commits

## Descrição
Automatiza o processo de commit e push para a branch `dev` seguindo o padrão **Conventional Commits** e as regras de equipe do projeto.

## Gatilhos
- "faça um commit"
- "commit e push para dev"
- "fazer commit das alterações"
- "commitando para dev"
- "push para dev"

## Padrão de Commits (Conventional Commits)

### Tipos de Commits

```
feat:      Nova funcionalidade
fix:       Correção de bug
docs:      Mudanças em documentação
style:     Formatação, sem mudanças lógicas
refactor:  Refatoração de código existente
perf:      Melhorias de performance
test:      Adição ou modificação de testes
chore:     Atualizações de dependências/config
ci:        Mudanças em CI/CD
build:     Mudanças no build/compilação
revert:    Reverter commit anterior
```

### Estrutura do Commit

```
<tipo>(<escopo>): <descrição resumida>

<corpo detalhado - opcional>

<rodapé - opcional>
```

### Exemplos Válidos

```bash
# Simples
feat: adicionar CRUD de alunos
fix: corrigir validação de email
docs: atualizar README com instruções de setup
ci: adicionar workflow de validação e auto-merge

# Com escopo
feat(auth): implementar JWT authentication
fix(backend): resolver erro de conexão com BD
test(students): adicionar testes de cadastro

# Com corpo
feat: adicionar sistema de relatórios

Implementa dashboard com métricas de progresso
dos alunos. Inclui gráficos de frequência e
evolução de desempenho.

Closes #123
```

## Workflow Automático

```
1️⃣  Verificar status (git status)
2️⃣  Atualizar da origem (git pull --rebase origin dev)
3️⃣  Adicionar mudanças (git add .)
4️⃣  Criar commit com mensagem estruturada
5️⃣  Fazer push para dev (git push origin dev)
6️⃣  GitHub Action valida automaticamente
7️⃣  Se passar: Auto-merge com branch beta
```

## Regras de Equipe

### 🚫 OBRIGATÓRIO

- ✅ SEMPRE faça commits para a branch `dev`
- ✅ Use o alias SSH configurado (ex: `git@github-imdouglas`)
- ✅ Siga o padrão Conventional Commits
- ✅ Mensagens em português brasileiro
- ✅ Commits atômicos (uma funcionalidade = um commit)
- ✅ NUNCA adicione co-autoria sem aprovação prévia

### ❌ PROIBIDO

- ❌ Commits diretos para `main` ou `master`
- ❌ Commits sem padrão estruturado
- ❌ Mensagens genéricas ("update", "fix", "changes")
- ❌ Co-autoria não autorizada
- ❌ Push para outras branches sem motivo justificado

### 📌 IMPORTANTE

- **Branch `main/master`**: Apenas produção
- **Branch `dev`**: Desenvolvimento (onde você trabalha)
- **Branch `beta`**: Testes (auto-merge via action)

## Passos Detalhados

### 1. Preparar as mudanças

```bash
# Ver status
git status

# Verificar mudanças
git diff

# Adicionar tudo (ou arquivos específicos)
git add .
# ou
git add arquivo1.ts arquivo2.ts
```

### 2. Criar o commit

**Determine o tipo:**
- `feat`: Implementou nova funcionalidade?
- `fix`: Corrigiu um bug?
- `docs`: Atualizou documentação?
- `ci`: Modificou workflow/ação?
- `refactor`: Reorganizou código sem mudar comportamento?

**Escreva a mensagem:**

```bash
# Formato: tipo(escopo): descrição
git commit -m "feat: adicionar validação de email"
git commit -m "fix(auth): resolver erro de login"
git commit -m "docs: atualizar guia de instalação"
```

### 3. Fazer o push

```bash
# Para branch dev (padrão)
git push origin dev

# Ou apenas (se estiver na dev)
git push
```

## Checklist de Commit

Antes de fazer commit, valide:

- [ ] Código está compilando? (`pnpm build`)
- [ ] Testes passam? (`pnpm test`)
- [ ] Linting passa? (`pnpm lint`)
- [ ] Tipo de commit está correto?
- [ ] Descrição é clara e concisa?
- [ ] Escopo (se houver) está relevante?
- [ ] Mensagem está em português?
- [ ] É apenas uma funcionalidade por commit?

## Exemplos Reais

### Feature de Autenticação
```bash
git commit -m "feat(auth): implementar login com JWT

- Adiciona rota POST /auth/login
- Gera token JWT válido por 24h
- Adiciona middleware de verificação
- Testes unitários inclusos"
```

### Correção de Bug
```bash
git commit -m "fix(students): corrigir duplicação de alunos

Problema: Não havia validação única de email
Solução: Adicionar constraint UNIQUE no BD
Closes #45"
```

### Atualização de Documentação
```bash
git commit -m "docs: adicionar seção de instalação do PostgreSQL

- Passo a passo de instalação
- Configuração de variáveis
- Teste de conexão"
```

### Mudança de Configuração
```bash
git commit -m "chore(deps): atualizar pnpm para 10.30.3

- Melhora performance
- Compatível com Node 18+"
```

## Automação após Push

Após fazer `git push origin dev`:

1. ✅ GitHub Action dispara automaticamente
2. 🧪 Validações executam (lint, typecheck, build, test)
3. ✅ Se tudo passar: PR criada automaticamente (dev → beta)
4. 🔀 Auto-merge com branch beta (squash)
5. 📢 Comentário no PR com status

## Troubleshooting

### "Mensagem de commit rejeitada"
- Verificar formato (tipo + descrição)
- Exemplo válido: `feat: adicionar CRUD`
- Exemplo inválido: `Mudanças` ou `Update`

### "Push recusado (conflito)"
```bash
# Atualizar com rebase
git pull --rebase origin dev
# Resolver conflitos
git rebase --continue
# Tentar push novamente
git push origin dev
```

### "Workflow falhou na validação"
1. Veja logs em GitHub Actions
2. Execute localmente: `pnpm lint`, `pnpm test`, `pnpm build`
3. Corrija os problemas
4. Faça novo commit e push

### "Esqueceu de adicionar arquivo"
```bash
# Adicionar arquivo
git add arquivo-esquecido.ts
# Amender ao último commit (NÃO crie novo)
git commit --amend --no-edit
# Force push (apenas para dev)
git push --force-with-lease origin dev
```

## Dicas de Pro

1. **Commits frequentes**: Pequenos commits são mais fáceis de revisar
2. **Mensagens descritivas**: Futuro você agradecerá
3. **Scope específico**: `feat(auth)` é melhor que apenas `feat`
4. **Verbo no imperativo**: "adicionar" não "adicionando"
5. **Referência de issues**: `Closes #123` automaticamente fecha issue

## Variáveis de Ambiente

Certifique-se de estar configurado:

```bash
# Verificar
git config user.name
git config user.email

# Configurar (se necessário)
git config user.name "Douglas Oliveira"
git config user.email "imdouglasoliveira@users.noreply.github.com"

# Global (opcional)
git config --global user.name "Douglas Oliveira"
git config --global user.email "imdouglasoliveira@users.noreply.github.com"
```

## Links Úteis

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Git Rebase](https://git-scm.com/docs/git-rebase)
- [Git Cherry-pick](https://git-scm.com/docs/git-cherry-pick)

## Resumo Rápido

```bash
# Workflow padrão
git pull --rebase origin dev      # Atualizar
git add .                         # Adicionar mudanças
git commit -m "tipo: descrição"   # Commit estruturado
git push origin dev               # Push para dev
```

---

**Versão**: 1.0
**Atualizado**: 2026-02-28
**Padrão**: Conventional Commits v1.0.0
