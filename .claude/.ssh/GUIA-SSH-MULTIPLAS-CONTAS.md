# 🔐 Guia: SSH para Múltiplas Contas GitHub

## 📌 Por que chaves SSH diferentes para cada conta?

### Resposta Curta
**NÃO é necessário!** Você pode usar a **mesma chave SSH** em múltiplas contas GitHub.

### O que foi feito aqui
No seu setup atual, foram criadas **4 chaves diferentes** (uma por conta) por questões de:

1. **Organização**: Facilita identificar qual chave pertence a qual conta
2. **Isolamento**: Se uma chave for comprometida, não afeta todas as contas
3. **Revogação seletiva**: Pode remover acesso de uma conta sem afetar outras
4. **Auditoria**: Rastreia qual conta/chave foi usada em cada operação

### Alternativa: Uma única chave para todas as contas
Você **pode** adicionar a mesma chave pública em todas as contas GitHub. O GitHub permite isso!

---

## 🔄 Como Refazer o Procedimento

### Opção 1: Usar UMA chave para TODAS as contas

#### Passo 1: Gerar uma única chave SSH
```bash
ssh-keygen -t ed25519 -C "seu-email@example.com" -f ~/.ssh/id_ed25519_github
```

#### Passo 2: Obter a chave pública
```bash
cat ~/.ssh/id_ed25519_github.pub
```

#### Passo 3: Adicionar a MESMA chave em TODAS as contas
- Acesse cada conta GitHub
- Vá em: Settings → SSH and GPG keys → New SSH key
- Cole a mesma chave pública em todas

#### Passo 4: Configurar `~/.ssh/config`
```bash
# Conta 1
Host github-imdouglas
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes

# Conta 2
Host github-gabriel
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes

# Conta 3
Host github-adriano
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes
```

#### Passo 5: Usar
```bash
git clone git@github-imdouglas:imdouglasoliveira/repo.git
git clone git@github-gabriel:gabrielkendy/repo.git
git clone git@github-adriano:adrianomorais-ganbatte/repo.git
```

---

### Opção 2: Chaves separadas para cada conta (atual)

#### Passo 1: Gerar chave para nova conta
```bash
ssh-keygen -t ed25519 -C "adrianomorais-ganbatte@users.noreply.github.com" -f ~/.ssh/id_ed25519_adriano
```

#### Passo 2: Obter a chave pública
```bash
cat ~/.ssh/id_ed25519_adriano.pub
```

#### Passo 3: Adicionar no GitHub
- Acesse: https://github.com/settings/ssh/new
- Cole a chave pública
- Salve

#### Passo 4: Adicionar ao `~/.ssh/config`
```bash
Host github-adriano
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_adriano
  IdentitiesOnly yes
```

#### Passo 5: Carregar no SSH-Agent
```bash
ssh-add ~/.ssh/id_ed25519_adriano
```

#### Passo 6: Testar conexão
```bash
ssh -T git@github-adriano
```

---

## 🎯 Recomendação

### Para sua situação (adicionar nova conta `adrianomorais-ganbatte`):

**Use uma chave existente!** Não precisa criar nova.

#### Passo a passo:

1. **Escolha uma chave existente** (ex: `id_ed25519_imdouglas`)

2. **Obtenha a chave pública:**
```bash
cat ~/.ssh/id_ed25519_imdouglas.pub
```

3. **Adicione no GitHub da nova conta:**
   - Login em: https://github.com/adrianomorais-ganbatte
   - Settings → SSH and GPG keys → New SSH key
   - Cole a chave
   - Salve

4. **Adicione ao `~/.ssh/config`:**
```bash
Host github-adriano
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_imdouglas
  IdentitiesOnly yes
```

5. **Pronto! Use:**
```bash
git clone git@github-adriano:adrianomorais-ganbatte/repositorio.git
```

---

## 📋 Contas Configuradas

| Alias | Usuário GitHub | Chave SSH |
|-------|----------------|-----------|
| `github-imdouglas` | imdouglasoliveira | id_ed25519_imdouglas |
| `github-gabriel` | gabrielkendy | id_ed25519_gabriel |
| `github-fappssh` | FappsSH | id_ed25519_fappssh |
| `github-moradigna` | moradigna | id_ed25519_moradigna |
| `github-adriano` | adrianomorais-ganbatte | id_ed25519_adriano |

### Chaves Públicas Atuais

#### imdouglas
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIKtuhudTzuzntprouQfppVgxEFWyLkA5zTo77PQ6gpQ imdouglasoliveira@users.noreply.github.com
```

#### gabriel
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGN1JNbvDMIjZLwG3a16c57j0W6Z8WtZGQhNDP+DXKwq gabrielkendy@users.noreply.github.com
```

#### fappssh
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAbVT/F4vWDfwxbHj7fZZX+qxX7783p5lQCnhtyqqvn9 FappsSH@users.noreply.github.com
```

#### moradigna
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBh5lEFNhVJIQ7EVbnS3g/bgkQ5fe89vyBA5QEDtyKMH douglasoliveira-moradigna@users.noreply.github.com
```

**Você pode usar QUALQUER uma dessas chaves em múltiplas contas!**

---

## 🔧 Como Adicionar ao ~/.ssh/config

### Método 1: Editar manualmente
```bash
# Abrir o arquivo
nano ~/.ssh/config
# ou
vim ~/.ssh/config
# ou no Windows Git Bash
notepad ~/.ssh/config
```

Adicione o bloco:
```
Host github-NOME_ALIAS
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_NOME_CHAVE
  IdentitiesOnly yes
```

### Método 2: Adicionar via comando
```bash
cat >> ~/.ssh/config << 'EOF'

Host github-adriano
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_adriano
  IdentitiesOnly yes
EOF
```

---

## 🚀 Como Usar Depois

### 1. Clonar repositórios
```bash
git clone git@github-adriano:adrianomorais-ganbatte/nome-repo.git
```

### 2. Adicionar remote em repositório existente
```bash
cd seu-repositorio
git remote add origin git@github-adriano:adrianomorais-ganbatte/nome-repo.git
```

### 3. Alterar remote existente
```bash
git remote set-url origin git@github-adriano:adrianomorais-ganbatte/nome-repo.git
```

### 4. Verificar remote atual
```bash
git remote -v
```

### 5. Testar conexão
```bash
ssh -T git@github-adriano
```

Resposta esperada:
```
Hi adrianomorais-ganbatte! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 🔧 Comandos Úteis

### Ver chaves carregadas no SSH-Agent
```bash
ssh-add -l
```

### Carregar chave no SSH-Agent
```bash
ssh-add ~/.ssh/id_ed25519_nome
```

### Testar conexão SSH (todas as contas)
```bash
ssh -T git@github-imdouglas
ssh -T git@github-gabriel
ssh -T git@github-fappssh
ssh -T git@github-moradigna
ssh -T git@github-adriano
```

### Ver configuração SSH
```bash
cat ~/.ssh/config
```

### Listar todas as chaves
```bash
ls -la ~/.ssh/id_*.pub
```

### Backup da configuração SSH
```bash
cp ~/.ssh/config ~/.ssh/config.backup.$(date +%Y%m%d_%H%M%S)
```

---

## ⚠️ Importante

1. **Chave PRIVADA** (sem `.pub`): NUNCA compartilhe!
2. **Chave PÚBLICA** (`.pub`): Pode compartilhar, vai no GitHub
3. Uma chave pública pode ser usada em **múltiplas contas**
4. O GitHub identifica a conta pelo contexto do repositório, não pela chave
5. O alias no `~/.ssh/config` (ex: `github-adriano`) diferencia qual conta usar

---

## 📚 Resumo Final

| Aspecto | Uma Chave | Múltiplas Chaves |
|---------|-----------|------------------|
| Segurança | ⚠️ Média | ✅ Alta |
| Praticidade | ✅ Simples | ⚠️ Mais complexo |
| Manutenção | ✅ Fácil | ⚠️ Mais trabalhoso |
| Recomendado para | Uso pessoal | Trabalho/clientes separados |

**Para adicionar `adrianomorais-ganbatte`: Use uma chave existente!**

---

## ❌ Erros Comuns e Como Resolver

### Erro 1: "Repository not found" ao clonar

**Sintoma:**
```bash
$ git clone git@github.com:adrianomorais-ganbatte/WorkersCloudFlare.git
Cloning into 'WorkersCloudFlare'...
ERROR: Repository not found.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

**Causa:** Você usou `git@github.com` em vez do **alias configurado** `git@github-adriano`

**Solução:**
```bash
# ❌ ERRADO - usa chave SSH padrão
git clone git@github.com:adrianomorais-ganbatte/WorkersCloudFlare.git

# ✅ CORRETO - usa alias e chave correta
git clone git@github-adriano:adrianomorais-ganbatte/WorkersCloudFlare.git
```

**Por que acontece:**
- `git@github.com` tenta usar a chave SSH padrão do sistema
- O alias `github-adriano` está configurado no `~/.ssh/config` para usar a chave específica
- Sem o alias, o GitHub não reconhece sua permissão

---

### Erro 2: "Permission denied (publickey)"

**Sintoma:**
```bash
$ git clone git@github-adriano:user/repo.git
Permission denied (publickey).
fatal: Could not read from remote repository.
```

**Causas possíveis:**

1. **Chave não carregada no SSH-Agent**
```bash
# Verificar chaves carregadas
ssh-add -l

# Carregar a chave
ssh-add ~/.ssh/id_ed25519_adriano
```

2. **Chave pública não adicionada no GitHub**
```bash
# Ver a chave pública
cat ~/.ssh/id_ed25519_adriano.pub

# Adicionar em: https://github.com/settings/ssh/new
```

3. **Configuração no ~/.ssh/config incorreta**
```bash
# Verificar se existe o bloco
cat ~/.ssh/config | grep -A 5 "github-adriano"

# Deve aparecer:
# Host github-adriano
#   HostName github.com
#   User git
#   IdentityFile ~/.ssh/id_ed25519_adriano
#   IdentitiesOnly yes
```

---

### Erro 3: "Could not resolve hostname github-adriano"

**Sintoma:**
```bash
$ git clone git@github-adriano:user/repo.git
ssh: Could not resolve hostname github-adriano: Name or service not known
```

**Causa:** O alias `github-adriano` não está no arquivo `~/.ssh/config`

**Solução:**
```bash
# Verificar se o bloco existe
cat ~/.ssh/config | grep "github-adriano"

# Se não existir, adicionar:
cat >> ~/.ssh/config << 'EOF'

Host github-adriano
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_adriano
  IdentitiesOnly yes
EOF
```

---

### Erro 4: "Bad owner or permissions on ~/.ssh/config"

**Sintoma:**
```bash
Bad owner or permissions on C:\Users\user\.ssh\config
```

**Solução (Windows Git Bash):**
```bash
chmod 600 ~/.ssh/config
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519_*
```

---

### Erro 5: Clonou mas fez commit com conta errada

**Sintoma:**
Depois de fazer commit, aparece outro nome/email no GitHub

**Causa:** O repositório está usando configuração git global em vez da conta específica

**Solução:**
```bash
# Dentro do repositório, configurar a conta correta
cd WorkersCloudFlare

# Verificar configuração atual
git config user.name
git config user.email

# Configurar para a conta adriano
git config user.name "Adriano Morais"
git config user.email "adrianomorais-ganbatte@users.noreply.github.com"

# Verificar
git config --list | grep user
```

---

### Erro 6: "ssh-add: command not found" ou SSH-Agent não iniciado

**Sintoma:**
```bash
$ ssh-add ~/.ssh/id_ed25519_adriano
Could not open a connection to your authentication agent.
```

**Solução:**
```bash
# Iniciar SSH-Agent
eval $(ssh-agent -s)

# Carregar a chave
ssh-add ~/.ssh/id_ed25519_adriano

# Verificar
ssh-add -l
```

---

### Erro 7: Remote com URL HTTPS em vez de SSH

**Sintoma:**
Você clonou com HTTPS e quer usar SSH

**Solução:**
```bash
# Ver remote atual
git remote -v
# origin  https://github.com/adrianomorais-ganbatte/repo.git (fetch)

# Alterar para SSH com alias
git remote set-url origin git@github-adriano:adrianomorais-ganbatte/repo.git

# Verificar
git remote -v
# origin  git@github-adriano:adrianomorais-ganbatte/repo.git (fetch)
```

---

## 🔍 Checklist de Diagnóstico

Quando algo não funcionar, execute na ordem:

```bash
# 1. Verificar se o alias existe
cat ~/.ssh/config | grep -A 5 "github-adriano"

# 2. Verificar se a chave existe
ls -la ~/.ssh/id_ed25519_adriano*

# 3. Ver chave pública (para comparar com GitHub)
cat ~/.ssh/id_ed25519_adriano.pub

# 4. Verificar chaves carregadas no agent
ssh-add -l

# 5. Testar conexão SSH
ssh -T git@github-adriano

# 6. Testar com verbose (mostra detalhes do erro)
ssh -vT git@github-adriano

# 7. Verificar remote do repositório
git remote -v

# 8. Verificar configuração git do repositório
git config --list | grep user
```

Resposta esperada no teste SSH:
```
Hi adrianomorais-ganbatte! You've successfully authenticated, but GitHub does not provide shell access.
```
