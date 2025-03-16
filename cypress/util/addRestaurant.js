export function addRestaurant({ category, name, distance }) {
  cy.get('.gnb__button').click();
  cy.get('#category').select(category, { force: true });
  cy.get('#name').type(name);
  cy.get('#distance').select(distance);
  cy.get('#description').type('재영이가 좋아하는 재영이 맛집');
  cy.get('#link').type('https://naver.com');

  cy.get('form').submit();
}
