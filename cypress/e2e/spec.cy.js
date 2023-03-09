const TEST_URL = 'http://localhost:8080/';

describe('음식점 추가 창', () => {
  it('음식점 추가버튼(우측 상단)을 클릭하면 음식점 추가창을 볼 수 있다.', () => {
    cy.visit(TEST_URL);
    cy.get('.gnb__button').click();
    cy.contains('새로운 음식점');
  });

  it('음식점 추가 창에서 취소하기 버튼을 클릭하면 이전 화면으로 돌아간다.', () => {
    cy.visit(TEST_URL);
    cy.get('.gnb__button').click();
    cy.contains('새로운 음식점');
    cy.get('#modal-cancel').click();
    cy.get('.modal').should('not.exist');
  });
});
