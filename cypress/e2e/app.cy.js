const TEST_URL = 'http://localhost:8081/';

describe('새로운 음식점 추가 모달', () => {
  beforeEach('beforeEach', () => {
    cy.visit(TEST_URL);
  });

  it('음식점 추가 버튼을 클릭하면 새로운 음식점 모달창이 보인다.', () => {
    cy.get('.gnb__button').click();
    cy.contains('새로운 음식점');
  });

  it('음식점 추가 모달의 취소하기 버튼을 누르면 모달창이 닫힌다.', () => {
    cy.get('.gnb__button').click();
    cy.get('#cancel-modal-button').click();
    cy.get('.modal').should('not.be.visible');
  });
});
