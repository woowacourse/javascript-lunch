describe('점심 뭐 먹지 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(500, 1000);
  });

  it('음식점을 추가하고 추가한 음식점을 화면서 확인한다.', () => {
    cy.get('.gnb__button').click();
    cy.get('select#category').select('양식');
    cy.get('input#name').type('양식음식점임123');
    cy.get('select#distance').select('15');
    cy.get('.button--primary').click({ force: true });
    cy.get('section.restaurant-list-container')
      .children()
      .should('contain.text', '양식음식점임123');
  });

  it('음식점을 클릭해 상세정보를 확인한 뒤, 삭제하기 버튼을 누르고 삭제 여부를 확인한다.', () => {
    cy.contains('친친').click();
    cy.get('.information-modal--open').contains('삭제하기').click();
    cy.get('ul.restaurant-list').children('li').should('not.have.text', '친친');
  });

  it('음식점을 즐겨찾기한 뒤, 즐겨찾기 여부를 확인한다.', () => {
    // cy.get('ul.restaurant-list').children('li').contains('친친').get('.category-lined').click();
    cy.get('ul.restaurant-list').contains('친친').get('.category-lined').click();
    // cy.get('.category-lined').eq(1).click();
    cy.get('.render-unselected').click();
    cy.get('.restaurant-list').children().should('contain.text', '친친');
  });
});
