import { IRestaurant } from "../../src/types/types";

const addRestaurant = ({ category, name, distance }: IRestaurant) => {
  cy.get(".gnb__button").click();
  cy.get(".modal-container").should("be.visible");

  cy.get("#category").select(category);
  cy.get("#name").type(name);
  cy.get("#distance").select(distance.toString());

  cy.get("#addRestaurantButton").click();
};

export default addRestaurant;
