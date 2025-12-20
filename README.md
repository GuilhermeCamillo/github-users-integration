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
