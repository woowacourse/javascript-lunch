const TEST_URL = 'http://localhost:8080/';

describe('음식점 추가 창', () => {
  it('음식점 추가버튼(우측 상단)을 클릭하면 음식점 추가창을 볼 수 있다.', () => {
    cy.visit(TEST_URL);
    cy.get('.gnb__button').click();
    cy.contains('새로운 음식점');
  });
});
