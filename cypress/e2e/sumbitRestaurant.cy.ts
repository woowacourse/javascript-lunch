interface IForm {
  category: string;
  name: string;
  distanceFromCampus: string;
  description: string;
  link: string;
}

describe('음식점 제출 모달 테스트', () => {
  let restaurantCountBeforeAdd: number;
  before(() => {
    cy.viewport(1920, 1080);
    cy.on('uncaught:exception', () => false);
    cy.visit('/');

    cy.get('.restaurant-list')
      .children()
      .its('length')
      .then((length: number) => {
        restaurantCountBeforeAdd = length;
      });
  });

  it('Restaurant Form 제출 시 List에 추가된다.', () => {
    cy.get('#add-restaurant-button').click();

    cy.fixture('example.json').then((data: IForm) => {
      cy.get('#add-category-select').select(data.category);
      cy.get('#name').type(data.name);
      cy.get('#add-distance-select').select(data.distanceFromCampus);
      cy.get('#description').type(data.description);
      cy.get('#link').type(data.link);
    });

    cy.get('.button-container').children().eq(1).click();
    cy.get('.restaurant-list')
      .children()
      .its('length')
      .should('eq', restaurantCountBeforeAdd + 1);
  });
});
