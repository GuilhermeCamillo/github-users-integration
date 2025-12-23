# Testes E2E com Cypress

## Instalação

```bash
npm install --save-dev cypress @testing-library/cypress
```

## Estrutura de Testes

```
cypress/
├── e2e/
│   ├── search.cy.ts
│   ├── results.cy.ts
│   ├── repository.cy.ts
│   ├── offline.cy.ts
│   └── offline-notification.cy.ts
├── fixtures/
│   ├── github-user.json
│   ├── github-repos.json
│   └── github-repository.json
└── support/
    ├── commands.ts
    └── e2e.ts
```

## Cenários de Teste

### 1. Página de Busca (`search.cy.ts`)

- Campo de busca visível
- Botão desabilitado quando campo vazio
- Validação de username inválido
- Busca bem-sucedida redireciona para resultados
- Busca de usuário inexistente mostra erro
- Enter no campo executa busca

### 2. Página de Resultados (`results.cy.ts`)

- Exibe informações do usuário
- Exibe lista de repositórios
- Paginação funciona
- Ordenação por estrelas funciona
- Ordenação por nome funciona
- Navegação entre páginas funciona
- Link para detalhes do repositório funciona
- Busca de outro usuário funciona

### 3. Página de Detalhes (`repository.cy.ts`)

- Exibe informações do repositório
- Breadcrumb funciona
- Links externos abrem em nova aba
- Botão de voltar funciona
- Estatísticas exibidas corretamente

### 4. Funcionalidade Offline (`offline.cy.ts`)

- Dados em cache exibidos quando offline
- Notificação offline no topo aparece quando conexão é perdida
- Busca funciona com dados em cache
- Navegação funciona offline
- Dados em cache priorizados quando offline
- Estado de erro quando offline e sem cache

### 5. Notificação Offline (`offline-notification.cy.ts`)

- Banner offline aparece no topo quando conexão é perdida
- Banner offline desaparece quando conexão é restaurada
- Banner tem estilo correto e é visível
- Banner não interfere na navegação

## Comandos Customizados

```typescript
Cypress.Commands.add("searchUser", (username: string) => {
  cy.visit("/");
  cy.get('[data-testid="search-input"]').type(username);
  cy.get('[data-testid="search-button"]').click();
});

Cypress.Commands.add("goOffline", () => {
  cy.window().then((win) => {
    Object.defineProperty(win.navigator, "onLine", {
      writable: true,
      configurable: true,
      value: false,
    });
    win.dispatchEvent(new Event("offline"));
  });
});

Cypress.Commands.add("goOnline", () => {
  cy.window().then((win) => {
    Object.defineProperty(win.navigator, "onLine", {
      writable: true,
      configurable: true,
      value: true,
    });
    win.dispatchEvent(new Event("online"));
  });
});
```

## Mock da API

Os testes usam fixtures para mockar as respostas da API do GitHub:

```typescript
beforeEach(() => {
  cy.intercept("GET", "**/api.github.com/users/octocat", {
    fixture: "github-user.json",
  }).as("getUser");

  cy.intercept("GET", "**/api.github.com/users/octocat/repos*", {
    fixture: "github-repos.json",
    headers: {
      link: '<https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="first", <https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="last"',
    },
  }).as("getRepos");
});
```

### Fixtures Disponíveis

- `github-user.json` - Dados de um usuário do GitHub
- `github-repos.json` - Lista de repositórios de um usuário
- `github-repository.json` - Dados de um repositório específico

## Exemplo de Teste

```typescript
describe("Página de Busca", () => {
  it("deve buscar um usuário válido", () => {
    cy.visit("/");
    cy.get('[data-testid="search-input"]').type("octocat");
    cy.get('[data-testid="search-button"]').click();
    cy.url().should("include", "/user/octocat");
    cy.contains("octocat").should("be.visible");
  });

  it("deve mostrar erro para usuário inexistente", () => {
    cy.visit("/");
    cy.intercept("GET", "**/api.github.com/users/invalid-user-12345", {
      statusCode: 404,
      body: { message: "Not Found" },
    }).as("getUserError");

    cy.get('[data-testid="search-input"]').type("invalid-user-12345");
    cy.get('[data-testid="search-button"]').click();
    cy.wait("@getUserError");
    cy.contains("Usuário não encontrado").should("be.visible");
  });
});
```

## Data Test IDs

Os componentes já possuem `data-testid` para facilitar os testes:

- `search-input` - Campo de busca
- `search-button` - Botão de busca
- `user-card` - Card do usuário
- `repository-card` - Card de repositório
- `repository-link` - Link para detalhes do repositório
- `repository-list` - Lista de repositórios
- `pagination` - Componente de paginação
- `sort-select` - Select de ordenação
- `direction-select` - Select de direção (asc/desc)
- `offline-banner` - Banner de notificação offline

## Executar Testes

### Modo Interativo

```bash
npm run cypress:open
```

Abre o Cypress Test Runner onde você pode selecionar e executar testes individualmente.

### Modo Headless (CI/CD)

```bash
npm run cypress:run
```

Executa todos os testes em modo headless, ideal para CI/CD.

### Alias

```bash
npm run test:e2e
```

Alias para `cypress:run`.

## Configuração

O Cypress está configurado para não salvar vídeos nem screenshots:

```javascript
// cypress.config.mjs
export default defineConfig({
  e2e: {
    video: false,
    screenshotOnRunFailure: false,
    // ...
  },
});
```

A pasta `cypress/downloads` está no `.gitignore` para evitar commits de arquivos de download.

## Status dos Testes

✅ Todos os testes E2E foram implementados:

- ✅ Página de busca
- ✅ Página de resultados
- ✅ Página de detalhes do repositório
- ✅ Funcionalidade offline
- ✅ Notificação offline
