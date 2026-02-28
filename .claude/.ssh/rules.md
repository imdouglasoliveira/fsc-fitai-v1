# Regras de Equipe - Git e Desenvolvimento

## Branches

- Branch `MAIN` SEMPRE é a default, é a branch de **PRODUÇÃO**
- Branch `DEV` é a branch de **DESENVOLVIMENTO**

## Commits e Pushes

- SEMPRE que terminar uma task faça o commit para a branch `dev` usando o alias SSH configurado (ex: `git@github-imdouglas`)
- NUNCA adicione co-autoria sem que seja aprovado antes

## Documentação

- SEMPRE atualize quando for necessário:
  - `README.md`
  - `README.pt-BR.md`
  - `./docs/...`

## Idioma

- Responda SEMPRE em pt-BR, independente do idioma de input

## Comandos Rápidos

### Inicializar novo repositório

```bash
# Inicializar o repositório
git init

# Criar o README
echo "# nome-do-projeto" >> README.md

# Adicionar o arquivo
git add README.md

# Configurar user.name e user.email (se necessário)
git config user.name "Douglas Oliveira"
git config user.email "imdouglasoliveira@users.noreply.github.com"

# Adicionar remote (usar alias SSH!)
git remote add origin git@github-imdouglas:imdouglasoliveira/nome-do-projeto.git

# Configurar branch e fazer push
git branch -M main
git commit -m "first commit"
git push -u origin main
```

### Workflow padrão

```bash
git status
git pull --rebase
git add .
git commit -m "mensagem"
git push
```

### Trocar de branch

```bash
git checkout dev
git checkout main
```
