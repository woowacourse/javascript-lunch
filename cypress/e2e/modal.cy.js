describe('모달 기능 테스트 ㅎ ㅎ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('헤더에 존재하는 추가하기 아이콘을 누르면 모달창이 열린다.', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal').should('have.class', 'modal--open');
  });

  it('취소하기 버튼이나 모달 뒷 배경을 클릭하면 모달이 닫힌다.', () => {
    cy.get('.gnb__button').click();
    cy.get('.button--secondary').click();
    cy.get('.modal').should('not.have.class', 'modal--open');
  });

  it('모달 뒷 배경을 클릭하면 모달이 닫힌다.', () => {
    cy.get('.gnb__button').click();

    cy.get('.modal-backdrop').click({ force: true });

    cy.get('.modal').should('not.have.class', 'modal--open');
  });
});
