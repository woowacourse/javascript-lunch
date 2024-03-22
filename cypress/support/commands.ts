/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
interface AddRestaurantProps {
  nameValue: string;
  categoryValue: string;
  distanceValue: string;
  descriptionValue?: string;
  linkValue?: string;
}
declare namespace Cypress {
  interface Chainable {
    addRestaurant({
      nameValue,
      categoryValue,
      distanceValue,
      descriptionValue,
      linkValue,
    }: AddRestaurantProps): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add(
  "addRestaurant",
  ({
    nameValue,
    categoryValue,
    distanceValue,
    descriptionValue = "",
    linkValue = "",
  }) => {
    const form = cy.get(
      "#adding-restaurant-modal-container>div.modal>div.modal-container>form"
    );

    const category = form.get("div.form-item>select[name=category]");
    category.select(categoryValue, { force: true });

    const name = form.get("div.form-item>input[name=name]");
    name.type(nameValue);

    const distance = form.get("div.form-item>select[name=distance]");
    distance.select(distanceValue);

    const description = form.get("div.form-item>textarea[name=description]");
    descriptionValue && description.type(descriptionValue);

    const link = form.get("div.form-item>input[name=link]");
    linkValue && link.type(linkValue);

    form.get("div.button-container>button.button--primary").click();
  }
);
