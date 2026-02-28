# 🔄 Skill: Commit Dev

## O que é?

Uma skill do Claude Code que automatiza o processo de fazer commits estruturados seguindo o padrão **Conventional Commits** e as regras da equipe, fazendo push automático para a branch `dev`.

## Como usar?

### Opção 1: Comando direto
```bash
/commit-dev
```

### Opção 2: Mencionar a skill
Diga ao Claude:
- "faça um commit"
- "commit e push para dev"
- "fazer commit das alterações"
- "push para dev"

## O que ela faz?

```
1️⃣  Mostra status do repositório (git status)
2️⃣  Mostra mudanças (git diff)
3️⃣  Pede confirmação das mudanças
4️⃣  Pede que escolha o tipo de commit (feat, fix, docs, etc)
5️⃣  Pede que descreva o commit
6️⃣  Faz o commit com mensagem estruturada
7️⃣  Faz push para branch dev
8️⃣  Mostra resultado
```

## Padrão de Commits

A skill usa **Conventional Commits**:

```
<tipo>(<escopo>): <descrição>

<corpo - opcional>

<rodapé - opcional>
```

### Tipos Válidos

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação
- **refactor**: Refatoração
- **test**: Testes
- **chore**: Atualizações
- **ci**: CI/CD
- **perf**: Performance
- **build**: Build

### Exemplos

```bash
feat: adicionar CRUD de alunos
fix(auth): corrigir erro de login
docs: atualizar README
ci: adicionar workflow de validação
test(students): aumentar cobertura
```

## Regras da Equipe

### ✅ OBRIGATÓRIO

- Sempre faça commits para `dev`
- Use padrão Conventional Commits
- Mensagens em português brasileiro
- Commits atômicos (uma feature = um commit)
- Nunca adicione co-autoria sem aprovação

### ❌ PROIBIDO

- Commits para `main` ou `master`
- Mensagens genéricas ("update", "fix")
- Co-autoria não autorizada
- Push para outras branches sem razão

## Arquivos da Skill

| Arquivo | Descrição |
|---------|-----------|
| `SKILL.md` | Documentação completa |
| `EXEMPLOS.md` | Exemplos de commits |
| `README.md` | Este arquivo |

## Fluxo Automático

Após fazer push para `dev`:

```
Push para dev
    ↓
GitHub Action dispara
    ↓
Validações (lint, test, build)
    ↓
Se passar → PR criada (dev → beta)
    ↓
Auto-merge com squash
    ↓
Notificação no PR
```

## Workflow Completo

```bash
# 1. Trabalhe na funcionalidade
# (edite arquivos, teste localmente)

# 2. Faça commit e push
/commit-dev

# A skill irá:
# - Mostrar mudanças
# - Pedir confirmação
# - Pedir tipo de commit
# - Pedir descrição
# - Fazer commit
# - Fazer push para dev
# - Mostrar resultado

# 3. GitHub Actions valida automaticamente
# Acompanhe em: GitHub → Actions
```

## Exemplos Rápidos

### Adicionando nova feature
```
Tipo: feat
Escopo: students
Descrição: adicionar listagem de alunos

Resultado:
feat(students): adicionar listagem de alunos
```

### Corrigindo bug
```
Tipo: fix
Escopo: auth
Descrição: corrigir erro de token expirado

Resultado:
fix(auth): corrigir erro de token expirado
```

### Atualizando documentação
```
Tipo: docs
Escopo: (deixar em branco)
Descrição: atualizar guia de instalação

Resultado:
docs: atualizar guia de instalação
```

## Troubleshooting

### "Mensagem rejeitada"
Verifique se segue o padrão:
- `tipo: descrição` ✅
- `Genérico` ❌

### "Push falhou"
```bash
# Tentar atualizar
git pull --rebase origin dev
# Resolver conflitos se houver
git rebase --continue
# Tentar push novamente
git push origin dev
```

### "Workflow falhou"
Veja GitHub Actions e execute localmente:
```bash
pnpm lint
pnpm test
pnpm build
```

## Dicas

1. **Commits frequentes**: Pequenos commits são mais fáceis de revisar
2. **Descrições claras**: Seja específico
3. **Scope relevante**: `feat(auth)` é melhor que `feat`
4. **Feche issues**: Use `Closes #123` na mensagem
5. **Verifique antes**: Rodepnpm lint/test antes de commit

## Links Úteis

- [Conventional Commits](https://www.conventionalcommits.org/)
- [EXEMPLOS.md](./EXEMPLOS.md) - Exemplos de commits
- [SKILL.md](./SKILL.md) - Documentação completa

## Próximos Passos

1. ✅ Use `/commit-dev` para fazer commits
2. ✅ Veja GitHub Actions validar
3. ✅ Aproveite o auto-merge com `beta`

---

**Versão**: 1.0
**Padrão**: Conventional Commits v1.0.0
**Idioma**: Português Brasileiro
