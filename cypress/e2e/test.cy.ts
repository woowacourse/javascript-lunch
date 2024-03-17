context('Assertions', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr'); // 모바일 화면으로 설정
    cy.visit('http://localhost:8080/');
  });

  describe('E2E 테스트', () => {
    it('식당 등록 모달을 열어 새로운 식당을 등록한다.', () => {
      const category = '일식';
      const name = '장정정';
      const distance = '10';
      const description = '일식 맛집입니다.';
      const link = 'https://naver.me/x6PU1WUM';

      cy.get('.gnb__button').click();
      cy.get('#category').select(category);
      cy.get('#name').type(name);
      cy.get('#distance').select(distance);
      cy.get('#description').type(description);
      cy.get('#link').type(link);

      cy.get('.register-button--submit').click();

      cy.get('lunch-items')
        .find('lunch-item')
        .first()
        .within(() => {
          cy.contains(name).should('exist');
          cy.contains(category).should('exist');
          cy.contains(distance).should('exist');
          cy.contains(description).should('exist');
        });
    });
  });
});
