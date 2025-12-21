# GitHub Users Integration

Aplicação React para busca e visualização de usuários e repositórios do GitHub, com suporte offline completo através do React Query e persistência no localStorage.

## Funcionalidades

- Busca de usuários do GitHub
- Visualização de informações do usuário (nome, bio, seguidores, localização, etc.)
- Listagem de repositórios com paginação
- Ordenação de repositórios por estrelas ou nome (crescente/decrescente)
- Detalhes completos de cada repositório
- Suporte offline com cache persistente
- Notificações de status de conexão
- Design responsivo com modo escuro

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router DOM
- React Query (TanStack Query)
- Axios
- Sass
- @tanstack/query-async-storage-persister

## Instalação

```bash
npm install
```

## Configuração

### GitHub Personal Access Token

Para evitar problemas com rate limit da API do GitHub, é recomendado configurar um token de acesso pessoal. O token aumenta o limite de requisições de 60 para 5000 por hora.

#### Como criar um token:

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** > **"Generate new token (classic)"**
3. Dê um nome descritivo (ex: "github-users-integration")
4. Selecione o escopo **"public_repo"** (ou **"repo"** se precisar acessar repositórios privados)
5. Clique em **"Generate token"**
6. Copie o token gerado

#### Configurar o token:

1. Copie o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

2. Abra o arquivo `.env` e adicione seu token:

   ```env
   VITE_GITHUB_TOKEN=seu_token_do_github_aqui
   ```

3. Reinicie o servidor de desenvolvimento se estiver rodando

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Estrutura do Projeto

Consulte [docs/structure.md](./docs/structure.md) para detalhes sobre a arquitetura e estrutura do projeto.

## Testes

Consulte [docs/cypress.md](./docs/cypress.md) para informações sobre testes E2E.
