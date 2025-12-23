# Estrutura do Projeto - GitHub Users Integration

## Visão Geral

Aplicação React para busca e visualização de usuários e repositórios do GitHub, com suporte offline através do React Query e persistência no localStorage.

## Estrutura de Pastas

```
src/
├── lib/
│   ├── queryClientConfig.ts
│   └── queryClient.tsx
├── services/
│   └── githubApi.ts
├── hooks/
│   ├── useGitHubUser.ts
│   ├── useGitHubRepositories.ts
│   ├── useGitHubRepositoriesPaginated.ts
│   ├── useGitHubRepository.ts
│   ├── useUserSearch.ts
│   ├── useNetworkStatus.ts
│   └── index.ts
├── pages/
│   ├── Search.tsx
│   ├── Results.tsx
│   └── RepositoryDetails.tsx
├── components/
│   ├── SearchBar.tsx
│   ├── UserCard.tsx
│   ├── UserCardSkeleton.tsx
│   ├── RepositoryCard.tsx
│   ├── RepositoryCardSkeleton.tsx
│   ├── RepositoryList.tsx
│   ├── RepositoryListSkeleton.tsx
│   ├── RepositoryDetailsSkeleton.tsx
│   ├── SortFilter.tsx
│   ├── Pagination.tsx
│   └── Skeleton.tsx
├── types/
│   └── github.ts
├── utils/
│   └── networkStatus.ts
├── App.tsx
└── App.scss
```

## Funcionalidades

### React Query com Persistência Offline

- Cache de 5 minutos, retenção de 24 horas
- Persistência no localStorage via `@tanstack/query-async-storage-persister`
- Modo offline-first: prioriza cache mesmo sem conexão
- Retry inteligente: não retenta em erros 404
- Cache versionado com sistema de buster

### Serviços de API (Axios)

Todas as chamadas HTTP são realizadas através do Axios. O cliente HTTP está configurado em `services/githubApi.ts` com:

- Base URL: `https://api.github.com`
- Headers padrão: `Accept: application/vnd.github.v3+json`
- Instância Axios reutilizável para todas as requisições

Funções disponíveis:

- `fetchGitHubUser(username)`: Busca informações do usuário
- `fetchUserRepositories(username, sort, direction)`: Busca repositórios sem paginação
- `fetchUserRepositoriesPaginated(username, sort, direction, page, perPage)`: Busca repositórios com paginação
- `fetchRepository(owner, repo)`: Busca repositório específico
- `validateGitHubUsername(username)`: Valida formato do username
- Extração automática de paginação dos headers HTTP (Link header)

### Hooks Customizados

Todos os hooks configurados com `meta.persist: true`:

- `useGitHubUser(username)`: Dados do usuário
- `useGitHubRepositories({ username, sort, direction })`: Repositórios sem paginação
- `useGitHubRepositoriesPaginated({ username, sort, direction, page, perPage })`: Repositórios com paginação
- `useGitHubRepository(owner, repo)`: Repositório específico
- `useUserSearch({ username, sort, direction, page, perPage })`: Usuário e repositórios simultaneamente
- `useNetworkStatus()`: Monitora status da conexão (retorna `{ isOffline: boolean }`)

### Rotas

- `/` - Página de busca
- `/user/:username` - Resultados com informações do usuário e repositórios paginados
- `/user/:owner/repo/:repo` - Detalhes do repositório

### Componentes

- **SearchBar**: Barra de busca com validação
- **UserCard**: Avatar, nome, bio, estatísticas e localização
- **UserCardSkeleton**: Skeleton loader para UserCard
- **RepositoryCard**: Nome, descrição, stats e link
- **RepositoryCardSkeleton**: Skeleton loader para RepositoryCard
- **RepositoryList**: Lista com ordenação e paginação
- **RepositoryListSkeleton**: Skeleton loader para RepositoryList
- **RepositoryDetailsSkeleton**: Skeleton loader para página de detalhes
- **SortFilter**: Ordenação por estrelas ou nome (crescente/decrescente)
- **Pagination**: Navegação e números de página
- **Skeleton**: Componente base para skeleton loaders

### UI/UX

- Paginação: 12 repositórios por página (configurável)
- Ordenação: Por estrelas ou nome (crescente/decrescente)
- Estados de loading: Skeleton loaders durante carregamento
- Tratamento de erros: Mensagens amigáveis
- Notificação offline: Banner fixo no topo quando offline
- Scroll automático: Volta ao topo ao mudar de página
- Design responsivo: Mobile e desktop
- Modo escuro fixo: Cores escuras por padrão

### Detecção de Conexão

- `useNetworkStatus()`: Monitora mudanças na conexão (retorna `{ isOffline: boolean }`)
- Utilitários para detectar status online/offline em `utils/networkStatus.ts`
- Banner fixo no topo quando offline (exibido em `App.tsx`)
- Dados em cache disponíveis offline
- Priorização de cache quando offline
- Tratamento de estado offline sem cache na página de resultados

## Exemplos de Uso

### Buscar usuário

```tsx
import { useGitHubUser } from "./hooks";

const UserProfile = ({ username }: { username: string }) => {
  const { data: user, isLoading, error } = useGitHubUser(username);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>@{user?.login}</p>
      <p>Seguidores: {user?.followers}</p>
    </div>
  );
};
```

### Buscar repositórios com paginação

```tsx
import { useGitHubRepositoriesPaginated } from "./hooks";
import { Pagination } from "./components/Pagination";
import { useState } from "react";

const RepositoriesList = ({ username }: { username: string }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGitHubRepositoriesPaginated({
    username,
    sort: "stars",
    direction: "desc",
    page,
    perPage: 12,
  });

  if (isLoading) return <div>Carregando repositórios...</div>;

  return (
    <div>
      {data?.data.map((repo) => (
        <div key={repo.id}>{repo.name}</div>
      ))}
      {data?.pagination && (
        <Pagination pagination={data.pagination} onPageChange={setPage} />
      )}
    </div>
  );
};
```

### Monitorar conexão

```tsx
import { useNetworkStatus } from "./hooks";

const App = () => {
  const { isOffline } = useNetworkStatus();

  return (
    <div>
      {isOffline && (
        <div role="alert" className="offline-banner">
          ⚠️ Você está offline. Dados em cache estão disponíveis.
        </div>
      )}
    </div>
  );
};
```

### Usar skeleton loaders

```tsx
import { UserCardSkeleton } from "./components/UserCardSkeleton";
import { RepositoryListSkeleton } from "./components/RepositoryListSkeleton";

const ResultsPage = () => {
  const { isLoading } = useUserSearch({ username });

  if (isLoading) {
    return (
      <div>
        <UserCardSkeleton />
        <RepositoryListSkeleton />
      </div>
    );
  }

  return <div>{/* Conteúdo */}</div>;
};
```

## Cache e Persistência

- Cache em memória: 5 minutos de staleTime
- Persistência no localStorage: 24 horas
- Chave de cache: `GITHUB_USERS_CACHE_v1` (com versão)
- Versão do cache: `v1` (incrementável para invalidar cache antigo)
- Modo offline-first: Usa cache mesmo sem conexão

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router DOM
- React Query (TanStack Query)
- Axios
- Sass
- @tanstack/query-async-storage-persister

## Status

1. ✅ Estrutura React Query com offline
2. ✅ Páginas (busca, resultados, detalhes)
3. ✅ Roteamento com React Router
4. ✅ Componentes de UI
5. ✅ Componentes Skeleton para loading states
6. ✅ Estilização com Sass (modo escuro fixo)
7. ✅ Paginação de repositórios
8. ✅ Ordenação e filtros
9. ✅ Notificação offline no topo (banner)
10. ✅ Detecção de status de conexão
11. ⏳ Testes unitários (React Testing Library)
12. ✅ Testes E2E (Cypress)
13. ✅ Deploy em VPS com Coolify
