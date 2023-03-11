
describe('test', () => {
  it('레스토랑 추가', () => {
    cy.visit("http://localhost:8080/");
    cy.get('#addIcon').click();
    cy.get('select#category').select('일식');
    cy.get('#name').type('마구로우니동');
    cy.get('select#distance').select('5');
    cy.get('#description').type('하이');
    cy.get('#link').type('https://naver.com');
    cy.get('.button--primary').click();
    cy.get("ul.restaurant-list").children().should("contain.text", "마구로우니동");
  })
})