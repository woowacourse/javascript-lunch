describe('점심 뭐 먹지', () => {
  it('첫 페이지 렌더링이 잘 된다.', () => {
    cy.visit('http://localhost:8080/');
    cy.contains('점심 뭐 먹지');
    cy.contains('모든 음식점');
    cy.contains('자주 가는 음식점');
    cy.contains('전체');
    cy.contains('distance');
  });

  describe('음식점 상세 정보', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/').contains('피양콩할머니').click();
    });
    it('렌더링이 잘 된다.', () => {
      cy.contains('피양콩할머니').should('be.visible');
      cy.contains('삭제하기').should('be.visible');
      cy.contains('닫기').should('be.visible');
    });

    it('아이템을 삭제할 수 있다.', () => {
      cy.contains('피양콩할머니').should('be.visible');
      cy.contains('삭제하기').click();
      cy.contains('피양콩할머니').should('not.be.visible');
    });
  });

  describe('즐겨찾기', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/');
    });

    it('자주 가는 음식점을 추가하고, 자주 가는 음식점 탭에서 확인할 수 있다.', () => {
      cy.get('.favorite-icon').first().click();
      cy.contains('자주 가는 음식점').click();
      cy.contains('피양콩할머니').should('be.visible');
    });

    it('음식점 상세 정보에서 자주 가는 음식점을 추가하고, 자주 가는 음식점 탭에서 확인할 수 있다.', () => {
      cy.contains('피양콩할머니').click();
      cy.get('.modal-container .favorite-icon').click();
      cy.contains('닫기').click();
      cy.contains('자주 가는 음식점').click();
      cy.contains('피양콩할머니').should('be.visible');
    });
  });
});
