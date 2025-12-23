describe("Página de Detalhes do Repositório", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api.github.com/repos/octocat/Hello-World", {
      fixture: "github-repository.json",
    }).as("getRepository");
  });

  it("deve exibir informações do repositório", () => {
    cy.visit("/user/octocat/repo/Hello-World");
    cy.wait("@getRepository");

    cy.contains("Hello-World").should("be.visible");
    cy.contains("This your first repo!").should("be.visible");
  });

  it("deve exibir estatísticas do repositório", () => {
    cy.visit("/user/octocat/repo/Hello-World");
    cy.wait("@getRepository");

    cy.contains("80").should("be.visible");
    cy.contains("9").should("be.visible");
  });

  it("deve exibir breadcrumb", () => {
    cy.visit("/user/octocat/repo/Hello-World");
    cy.wait("@getRepository");

    cy.contains("Busca").should("be.visible");
    cy.contains("octocat").should("be.visible");
    cy.contains("Hello-World").should("be.visible");
  });

  it("deve navegar pelo breadcrumb", () => {
    cy.intercept("GET", "**/api.github.com/users/octocat", {
      fixture: "github-user.json",
    }).as("getUser");

    cy.intercept("GET", "**/api.github.com/users/octocat/repos*", {
      fixture: "github-repos.json",
      headers: {
        link: '<https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="first", <https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="last"',
      },
    }).as("getRepos");

    cy.visit("/user/octocat/repo/Hello-World");
    cy.wait("@getRepository");

    cy.contains("octocat").click();
    cy.wait(["@getUser", "@getRepos"]);
    cy.url().should("include", "/user/octocat");
    cy.url().should("not.include", "/repo/Hello-World");
  });

  it("deve abrir link externo em nova aba", () => {
    cy.visit("/user/octocat/repo/Hello-World");
    cy.wait("@getRepository");

    cy.get('a[href="https://github.com/octocat/Hello-World"]')
      .should("have.attr", "target", "_blank")
      .should("have.attr", "rel", "noopener noreferrer");
  });

  it("deve voltar para perfil do usuário", () => {
    cy.intercept("GET", "**/api.github.com/users/octocat", {
      fixture: "github-user.json",
    }).as("getUser");

    cy.intercept("GET", "**/api.github.com/users/octocat/repos*", {
      fixture: "github-repos.json",
      headers: {
        link: '<https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="first", <https://api.github.com/users/octocat/repos?page=1&per_page=12>; rel="last"',
      },
    }).as("getRepos");

    cy.visit("/user/octocat/repo/Hello-World");
    cy.wait("@getRepository");

    cy.contains("Voltar para perfil").click();
    cy.wait(["@getUser", "@getRepos"]);
    cy.url().should("include", "/user/octocat");
    cy.url().should("not.include", "/repo/Hello-World");
  });

  it("deve mostrar erro para repositório não encontrado", () => {
    cy.intercept("GET", "**/api.github.com/repos/octocat/invalid-repo", {
      statusCode: 404,
      body: { message: "Not Found" },
    }).as("getRepositoryError");

    cy.visit("/user/octocat/repo/invalid-repo");
    cy.wait("@getRepositoryError");

    cy.contains("Repositório não encontrado").should("be.visible");
  });
});

