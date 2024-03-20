describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });
  it('음식점을 추가하는 버튼이 존재한다.', () => {
    cy.get('add-store-btn').should('be.visible');
  });

  it('음식점을 추가하는 버튼을 클릭 하지 않았다면, 입력 폼 모달이 화면에 보이지 않는다.', () => {
    cy.get('#modal-container-child').children().should('not.exist');
  });

  it('음식점 버튼을 클릭하면, 입력 폼 모달이 화면에 나타난다.', () => {
    cy.get('add-store-btn').click();
    cy.get('restaurant-form-inner').should('be.visible');
  });
});
