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
│   └── github-api.json
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
    cy.stub(win.navigator, "onLine").value(false);
    win.dispatchEvent(new Event("offline"));
  });
});

Cypress.Commands.add("goOnline", () => {
  cy.window().then((win) => {
    cy.stub(win.navigator, "onLine").value(true);
    win.dispatchEvent(new Event("online"));
  });
});
```

## Mock da API

```typescript
beforeEach(() => {
  cy.intercept("GET", "**/api.github.com/users/*", {
    fixture: "github-user.json",
  }).as("getUser");

  cy.intercept("GET", "**/api.github.com/users/*/repos*", {
    fixture: "github-repos.json",
  }).as("getRepos");
});
```

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
    cy.contains("Erro ao buscar usuário").should("be.visible");
  });
});
```

## Data Test IDs

Adicione `data-testid` aos elementos importantes:

```tsx
<input
  data-testid="search-input"
  type="text"
/>

<button data-testid="search-button">
  Buscar
</button>
```

## Executar Testes

```bash
npm run cypress:open
npm run cypress:run
```

## Próximos Passos

1. Instalar Cypress e dependências
2. Configurar estrutura de pastas
3. Criar comandos customizados
4. Implementar mocks da API
5. Escrever testes para cada cenário
6. Adicionar data-testid aos componentes
7. Configurar CI/CD para executar testes automaticamente
