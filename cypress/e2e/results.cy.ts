describe("Página de Resultados", () => {
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

  it("deve exibir informações do usuário", () => {
    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);
    cy.get('[data-testid="user-card"]').should("be.visible");
    cy.contains("octocat").should("be.visible");
    cy.contains("The Octocat").should("be.visible");
  });

  it("deve exibir lista de repositórios", () => {
    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);
    cy.get('[data-testid="repository-list"]').should("be.visible");
    cy.get('[data-testid="repository-card"]').should("have.length.at.least", 1);
  });

  it("deve ordenar repositórios por estrelas", () => {
    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.get('[data-testid="sort-select"]').select("stars");
    cy.wait("@getRepos");

    cy.get('[data-testid="repository-card"]').first().should("be.visible");
  });

  it("deve ordenar repositórios por nome", () => {
    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.get('[data-testid="sort-select"]').select("name");
    cy.wait("@getRepos");

    cy.get('[data-testid="repository-card"]').first().should("be.visible");
  });

  it("deve mudar direção da ordenação", () => {
    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.get('[data-testid="direction-select"]').select("asc");
    cy.wait("@getRepos");

    cy.get('[data-testid="repository-card"]').first().should("be.visible");
  });

  it("deve navegar para detalhes do repositório", () => {
    cy.intercept("GET", "**/api.github.com/repos/octocat/Hello-World", {
      fixture: "github-repository.json",
    }).as("getRepository");

    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.get('[data-testid="repository-link"]').first().click();
    cy.wait("@getRepository");
    cy.url().should("include", "/user/octocat/repo/Hello-World");
  });

  it("deve permitir buscar outro usuário", () => {
    cy.intercept("GET", "**/api.github.com/users/another-user", {
      fixture: "github-user.json",
    }).as("getAnotherUser");

    cy.intercept("GET", "**/api.github.com/users/another-user/repos*", {
      fixture: "github-repos.json",
      headers: {
        link: '<https://api.github.com/users/another-user/repos?page=1&per_page=12>; rel="first", <https://api.github.com/users/another-user/repos?page=1&per_page=12>; rel="last"',
      },
    }).as("getAnotherUserRepos");

    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getRepos"]);

    cy.get('[data-testid="search-input"]').clear().type("another-user");
    cy.get('[data-testid="search-button"]').click();
    cy.wait(["@getAnotherUser", "@getAnotherUserRepos"]);
    cy.url().should("include", "/user/another-user");
  });

  it("deve exibir paginação quando há múltiplas páginas", () => {
    cy.intercept("GET", "**/api.github.com/users/octocat/repos*", {
      fixture: "github-repos.json",
      headers: {
        link: '<https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="first", <https://api.github.com/users/octocat/repos?page=2&per_page=12>; rel="next", <https://api.github.com/users/octocat/repos?page=3&per_page=12>; rel="last"',
      },
    }).as("getReposPaginated");

    cy.visit("/user/octocat");
    cy.wait(["@getUser", "@getReposPaginated"]);

    cy.get('[data-testid="pagination"]').should("be.visible");
  });
});
