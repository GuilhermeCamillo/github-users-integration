/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      searchUser(username: string): Chainable<void>;
      goOffline(): Chainable<void>;
      goOnline(): Chainable<void>;
    }
  }
}

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

export {};

