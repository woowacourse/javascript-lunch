type TestRestaurantInfoType = {
  imageSrc: string;
  name: string;
  distanceInMinutes: string;
  description: string;
  favoriteSrc: string;
};

type TestRestaurantFormInfoType = {
  category: string;
  name: string;
  distanceInMinutes: string;
  description: string;
  link: string;
};

const writeRestaurantAddForm = (input: TestRestaurantFormInfoType) => {
  cy.get('#category').select(input.category);
  if (input.name !== '') {
    cy.get('#name').type(input.name);
  }
  cy.get('#distance').select(input.distanceInMinutes);
  if (input.description !== '') {
    cy.get('#description').type(input.description);
  }
  if (input.link !== '') {
    cy.get('#link').type(input.link);
  }
  cy.get('#add-modal-submit').click();
};

const checkRestaurantItem = (index: number, info: TestRestaurantInfoType) => {
  cy.get('#restaurant-list-root .restaurant')
    .eq(index)
    .within(() => {
      cy.get('.category-icon').should('have.attr', 'src', info.imageSrc);
      cy.get('.restaurant__name').should('have.text', info.name);
      cy.get('.restaurant__distance').should(
        'have.text',
        `캠퍼스부터 ${info.distanceInMinutes}분 내`
      );
      cy.get('.restaurant__description').should('have.text', info.description);
      cy.get('.favorite-icon').should('have.attr', 'src', info.favoriteSrc);
    });
};

export { writeRestaurantAddForm, checkRestaurantItem };
