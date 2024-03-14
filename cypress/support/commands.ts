declare namespace Cypress {
  interface Chainable<Subject> {
    setLocalStorage(restaurantDetails: unknown[]): Chainable<any>;
  }
}

Cypress.Commands.add("setLocalStorage", (restaurantDetails: unknown[]) => {
  window.localStorage.setItem(
    "restaurantDetail",
    JSON.stringify(restaurantDetails)
  );
});
