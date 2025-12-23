describe("Página de Busca", () => {
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

  it("deve exibir o campo de busca", () => {
    cy.visit("/");
    cy.get('[data-testid="search-input"]').should("be.visible");
    cy.get('[data-testid="search-button"]').should("be.visible");
  });

  it("deve desabilitar o botão quando o campo está vazio", () => {
    cy.visit("/");
    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-button"]').should("be.disabled");
  });

  it("deve habilitar o botão quando há texto no campo", () => {
    cy.visit("/");
    cy.get('[data-testid="search-input"]').type("octocat");
    cy.get('[data-testid="search-button"]').should("not.be.disabled");
  });

  it("deve validar username inválido", () => {
    cy.visit("/");
    cy.get('[data-testid="search-input"]').type("invalid-user-123!");
    cy.get('[data-testid="search-button"]').click();
    cy.contains("Username inválido").should("be.visible");
  });

  it("deve buscar um usuário válido e redirecionar", () => {
    cy.visit("/");
    cy.get('[data-testid="search-input"]').type("octocat");
    cy.get('[data-testid="search-button"]').click();
    cy.wait(["@getUser", "@getRepos"]);
    cy.url().should("include", "/user/octocat");
  });

  it("deve executar busca ao pressionar Enter", () => {
    cy.visit("/");
    cy.get('[data-testid="search-input"]').type("octocat{enter}");
    cy.wait(["@getUser", "@getRepos"]);
    cy.url().should("include", "/user/octocat");
  });

  it("deve mostrar erro para usuário inexistente", () => {
    cy.intercept("GET", "**/api.github.com/users/invalid-user-12345", {
      statusCode: 404,
      body: { message: "Not Found" },
    }).as("getUserError");

    cy.visit("/");
    cy.get('[data-testid="search-input"]').type("invalid-user-12345");
    cy.get('[data-testid="search-button"]').click();
    cy.wait("@getUserError");
    cy.contains("Usuário não encontrado").should("be.visible");
  });
});

