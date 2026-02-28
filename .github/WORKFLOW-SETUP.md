# 🔄 Configuração do Workflow de Validação e Merge Automático

## 📋 O que faz

Este workflow GitHub Actions automatiza:

1. **🧪 Validação do Projeto**
   - Instala dependências (`pnpm install`)
   - Executa linting (`pnpm run lint`)
   - Verifica tipos TypeScript (`pnpm run typecheck`)
   - Build do projeto (`pnpm run build`)
   - Testes (`pnpm test`)

2. **🔀 Auto-Merge para Beta**
   - Cria PR automática de `dev` → `beta`
   - Faz merge automático (squash) se validação passar
   - Comenta no PR com status

3. **📢 Notificação**
   - Resume status de execução

## ⚙️ Pré-requisitos

### 1. Criar as branches `dev` e `beta`

```bash
# Criar e enviar branch dev
git checkout -b dev
git push -u origin dev

# Criar e enviar branch beta
git checkout -b beta
git push -u origin beta

# Voltar para master
git checkout master
```

### 2. Configurar Scripts no package.json

Certifique-se de ter esses scripts configurados:

```json
{
  "scripts": {
    "lint": "eslint src --fix",
    "typecheck": "tsc --noEmit",
    "build": "tsc",
    "test": "jest --passWithNoTests",
    "dev": "tsx --watch src/index.ts"
  }
}
```

### 3. Configurações de Proteção de Branches (GitHub)

#### Para a branch `beta`:
1. Acesse: **Settings** → **Branches** → **Add rule**
2. Configurações recomendadas:
   - Branch name pattern: `beta`
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

#### Para a branch `main` (opcional):
1. Mesmas configurações acima
2. Exigir pull request de `beta` para fazer merge

## 🚀 Fluxo de Desenvolvimento

### Passo 1: Criar feature branch
```bash
git checkout -b feature/sua-feature
# Desenvolva, faça commits...
git push origin feature/sua-feature
```

### Passo 2: Abrir PR para `dev`
- Abra PR de `feature/sua-feature` → `dev`
- Peça review
- Faça merge quando aprovado

### Passo 3: Push para `dev`
```bash
git checkout dev
git pull origin dev
git push origin dev
```

### Passo 4: Workflow Automático 🤖
1. **Validação** executa automaticamente
2. Se passar, **PR dev → beta** é criada automaticamente
3. **Auto-merge** acontece (squash)
4. **Notificação** é enviada

## 📊 Status do Workflow

### Verde ✅ - Tudo OK
- Validações passaram
- Auto-merge com beta realizado
- Pronto para deploy em `main`

### Amarelo ⚠️ - Validação com Problemas
- Linting, typecheck ou build falharam
- PR para `beta` é criada mas **não é feito merge**
- Revise e corrija os problemas

### Vermelho ❌ - Falha Total
- Verifique os logs no GitHub Actions
- Corrija os problemas na branch `dev`
- Faça novo push

## 🔧 Variáveis de Ambiente

Se seu projeto precisar de variáveis:

1. Acesse: **Settings** → **Secrets and variables** → **Actions**
2. Adicione os secrets:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - etc.

## 📝 Personalizações

### Para adicionar/remover validações:

Edite `.github/workflows/validate-and-merge.yml`:

```yaml
# Adicionar novo check
- name: 🎨 Prettier
  run: pnpm run format:check
  continue-on-error: true

# Remover um check (comente ou delete)
# - name: 🧪 Rodar testes
#   run: pnpm test
```

### Para mudar branch alvo:

```yaml
on:
  push:
    branches:
      - dev  # Alterar para outra branch
```

### Para mudar método de merge:

```yaml
merge_method: 'squash'  # Opções: 'merge', 'squash', 'rebase'
```

## 🐛 Troubleshooting

### "PR não faz merge automaticamente"
- Verifique se há conflitos entre `dev` e `beta`
- Confira proteção de branches no GitHub
- Veja logs do workflow

### "Workflow não dispara"
- Certifique-se de ter feito push para `dev` (não `master`)
- Aguarde alguns segundos (GitHub pode ter delay)
- Verifique em **Actions** se está visível

### "Linting/Tests falhando"
- Execute localmente: `pnpm lint`, `pnpm test`
- Corrija os problemas
- Faça novo push

## 📚 Referências

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Checkout Action](https://github.com/actions/checkout)
- [Setup Node Action](https://github.com/actions/setup-node)
- [GitHub Script Action](https://github.com/actions/github-script)

## 💡 Dicas

1. **Usar `continue-on-error: true`**: Permite que o workflow continue mesmo se um step falhar
2. **Squash commits**: Mantém histórico limpo em `beta`
3. **Commits atômicos**: Facilita identificar problemas
4. **Testar localmente primeiro**: Evita rejeições no workflow

---

**Workflow criado com sucesso!** 🎉

Próximos passos:
1. ✅ Criar branches `dev` e `beta`
2. ✅ Verificar scripts em `package.json`
3. ✅ Fazer primeiro push para `dev`
4. ✅ Acompanhar em **Actions**
