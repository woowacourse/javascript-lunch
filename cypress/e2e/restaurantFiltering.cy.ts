describe('카테고리 선택 테스트', () => {
  it('한식 카테고리를 선택 시, 모킹 데이터 중 "농민 백암순대 본점"과 "피양콩할마니"가 나오고 다른 카테고리는 나오지 않는다 ', () => {
    cy.visit('http://localhost:8080/');
    cy.get('select[id=category-select]').select('한식');

    cy.contains('농민백암순대 본점').should('exist');
    cy.contains('피양콩할마니').should('exist');
    cy.contains('영빈관').should('not.exist');
  });

  it('일식 카테고리를 선택 시, 모킹 데이터 중 "잇쇼우"가 나오고 다른 카테고리는 나오지 않는다 ', () => {
    cy.visit('http://localhost:8080/');
    cy.get('select[id=category-select]').select('일식');

    cy.contains('잇쇼우').should('exist');
  });
});
