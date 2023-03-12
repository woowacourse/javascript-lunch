describe('점심 뭐 먹지', () => {
  it('첫 페이지 렌더링이 잘 된다.', () => {
    cy.visit('http://localhost:8080/');
    cy.contains('점심 뭐 먹지');
    cy.contains('모든 음식점');
    cy.contains('자주 가는 음식점');
    cy.contains('전체');
    cy.contains('distance');
  });

  it('음식점 상세 정보를 확인할 수 있다', () => {
    cy.visit('http://localhost:8080/').get('restaurant-item').eq(0).click();
    cy.contains('삭제하기');
    cy.contains('닫기');
  });
});
