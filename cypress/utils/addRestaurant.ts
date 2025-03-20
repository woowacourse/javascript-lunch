import { Restaurant } from "../../src/types/type";

const addRestaurant = ({ category, title, distance }: Restaurant) => {
  cy.get(".gnb__button").click();
  cy.get(".modal-container").should("be.visible");

  cy.get("#category").select(category);
  cy.get("#name").type(title);
  cy.get("#distance").select(distance.toString());

  cy.get("#add-button").click();
};

export default addRestaurant;
