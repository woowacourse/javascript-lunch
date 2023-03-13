import "../../src/util/store";

Cypress.Commands.add("addRestaurant", (category, name, distance, description, link) => {
  cy.get(".gnb__button").click();
  cy.get("#category").select(category);
  cy.get("#name").type(name);
  cy.get("#distance").select(distance);
  if (description) cy.get("#description").type(description);
  if (link) cy.get("#link").type(link);
  cy.get("#add-button").click();
});

Cypress.Commands.add("selectCategory", (category) => {
  cy.get("#category-filter").select(category);
});

Cypress.Commands.add("findStarOnModal", () => {
  cy.get(".modal").find(".star-container").find(".star-icon");
});

Cypress.Commands.add("sortBy", (sortingWay) => {
  cy.get("#sorting-filter").select(sortingWay);
});

Cypress.Commands.add("expectRestaurantListToBe", (result) => {
  cy.get(".restaurant-list")
    .find(".restaurant__name") // 각 식당 아이템의 이름 엘리먼트 선택
    .then(($names) => {
      const nameArray = Array.from($names).map(($name) => $name.innerText);
      expect(nameArray).to.deep.equal(result);
    });
});
