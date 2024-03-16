describe('addBtn 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('addBtn을 클릭하면 음식점 추가 modal이 띄워진다.', () => {
    cy.get('add-btn').click();
    cy.get('restaurant-form-inner').should('be.visible');
  });
});
