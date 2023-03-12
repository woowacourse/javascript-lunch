describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(365, 945);
  });

  it('음식점을 추가한 뒤 화면에서 추가된 음식점을 확인할 수 있다.', () => {
    cy.get('.gnb__button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('더드림 김치찌개');
    cy.get('#distance').select('10');
    cy.get('#description').type('김치찌개에 라면사리 추가!');
    cy.get('#add-button').click();
    cy.get('.restaurant-list').children().should('contain.text', '더드림 김치찌개');
  });

  it('음식점을 클릭했을 때 삭제하기를 누르면 모달이 닫히고 삭제된다.', () => {
    cy.contains('피양콩할머니').click();
    cy.get('#delete-button').click();
    cy.get('.restaurant-list').should('not.have.text', '피양콩할머니');
  });

  it('즐겨찾기 아이콘을 클릭하면 자주 가는 음식점 목록에서 해당 음식점을 확인할 수 있다.', () => {
    cy.get('.favorite-icon').eq(0).click();
    cy.get('nav-bar').shadow().contains('자주 가는 음식점').click();
    cy.get('.restaurant-list').should('have.length', 1);
  });
});
