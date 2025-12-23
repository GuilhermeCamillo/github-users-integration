# GitHub Users Integration

Aplicação React para busca e visualização de usuários e repositórios do GitHub, com suporte offline completo através do React Query e persistência no localStorage.

## Demo

Você pode acessar a aplicação em produção em: [github-users.guilhermecamillo.com](https://github-users.guilhermecamillo.com/).

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

#### Modo Interativo (Recomendado para desenvolvimento)

1. **Inicie o servidor de desenvolvimento em um terminal:**

   ```bash
   npm run dev
   ```

2. **Em outro terminal, abra o Cypress:**

   ```bash
   npm run cypress:open
   ```

3. **No Cypress Test Runner:**
   - Selecione **"E2E Testing"**
   - Escolha um navegador (Chrome, Edge, Firefox, etc.)
   - Clique em **"Start E2E Testing"**
   - Selecione o arquivo de teste que deseja executar na lista

#### Modo Headless (Para CI/CD)

Execute todos os testes em modo headless (sem interface gráfica):

```bash
npm run cypress:run
```

Ou use o alias:

```bash
npm run test:e2e
```

### Dicas

1. **Servidor de Desenvolvimento**: Sempre inicie o servidor (`npm run dev`) antes de executar os testes
2. **Base URL**: Os testes estão configurados para `http://localhost:5173` (porta padrão do Vite)
3. **Mocks**: Os testes usam fixtures para mockar as respostas da API do GitHub, evitando chamadas reais
4. **Data Test IDs**: Os componentes usam `data-testid` para facilitar a seleção nos testes

Para mais detalhes, consulte [docs/cypress.md](./docs/cypress.md).
