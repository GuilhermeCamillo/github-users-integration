describe("Notificação Offline", () => {
  it("deve exibir banner quando conexão é perdida", () => {
    cy.visit("/");
    cy.goOffline();

    cy.get('[data-testid="offline-banner"]').should("be.visible");
    cy.get('[data-testid="offline-banner"]').should(
      "contain",
      "Você está offline"
    );
  });

  it("deve ocultar banner quando conexão é restaurada", () => {
    cy.visit("/");
    cy.goOffline();

    cy.get('[data-testid="offline-banner"]').should("be.visible");

    cy.goOnline();
    cy.get('[data-testid="offline-banner"]').should("not.exist");
  });

  it("deve ter estilo correto e ser visível", () => {
    cy.visit("/");
    cy.goOffline();

    cy.get('[data-testid="offline-banner"]')
      .should("be.visible")
      .should("have.attr", "role", "alert");
  });

  it("não deve interferir na navegação", () => {
    cy.intercept("GET", "**/api.github.com/users/octocat", {
      fixture: "github-user.json",
    }).as("getUser");

    cy.intercept("GET", "**/api.github.com/users/octocat/repos*", {
      fixture: "github-repos.json",
      headers: {
        link: '<https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="first", <https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="last"',
      },
    }).as("getRepos");

    cy.visit("/");
    cy.goOffline();

    cy.get('[data-testid="offline-banner"]').should("be.visible");

    cy.get('[data-testid="search-input"]').type("octocat");
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="offline-banner"]').should("be.visible");
  });
});

