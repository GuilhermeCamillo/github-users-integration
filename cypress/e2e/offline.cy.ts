describe("Funcionalidade Offline", () => {
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

  it("deve exibir dados em cache quando offline", () => {
    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.get('[data-testid="user-card"]').should("be.visible");
    cy.get('[data-testid="repository-list"]').should("be.visible");

    cy.goOffline();

    cy.get('[data-testid="offline-banner"]').should("be.visible");
    cy.get('[data-testid="user-card"]').should("be.visible");
    cy.get('[data-testid="repository-list"]').should("be.visible");
  });

  it("deve permitir navegação offline com cache", () => {
    cy.intercept("GET", "**/api.github.com/repos/octocat/Hello-World", {
      fixture: "github-repository.json",
    }).as("getRepository");

    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.goOffline();

    cy.get('[data-testid="repository-link"]').first().click();

    cy.url().should("include", "/user/octocat/repo/Hello-World");
    cy.contains("Hello-World").should("be.visible");
  });

  it("deve mostrar erro quando offline e sem cache", () => {
    cy.visit("/");
    cy.goOffline();

    cy.get('[data-testid="search-input"]').type("new-user-without-cache");
    cy.get('[data-testid="search-button"]').click();

    cy.contains("Sem conexão e sem cache").should("be.visible");
  });

  it("deve priorizar cache quando offline", () => {
    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.get('[data-testid="repository-list"]').should("be.visible");
    cy.get('[data-testid="repository-card"]').should("have.length.at.least", 1);

    cy.goOffline();
    cy.get('[data-testid="offline-banner"]').should("be.visible");

    cy.get('[data-testid="repository-list"]').should("be.visible");
    cy.get('[data-testid="repository-card"]').should("have.length.at.least", 1);
  });

  it("deve restaurar funcionalidade quando voltar online", () => {
    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.goOffline();
    cy.get('[data-testid="offline-banner"]').should("be.visible");

    cy.goOnline();
    cy.get('[data-testid="offline-banner"]').should("not.exist");
  });
});
