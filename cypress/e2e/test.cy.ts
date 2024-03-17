context('Assertions', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr'); // 모바일 화면으로 설정
    cy.visit('/');
  });

  describe('E2E 테스트', () => {
    it('식당 등록 모달을 열어 새로운 식당을 등록한다.', () => {
      // given
      const category = '일식';
      const name = '장정정';
      const distance = '10';
      const description = '일식 맛집입니다.';
      const link = 'https://naver.me/x6PU1WUM';

      // when
      cy.get('.gnb__button').click();
      cy.get('#category').select(category);
      cy.get('#name').type(name);
      cy.get('#distance').select(distance);
      cy.get('#description').type(description);
      cy.get('#link').type(link);

      cy.get('.register-button--submit').click();

      // then
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

    it('식당 세부 정보를 확인하는 모달을 열고 식당을 삭제한다.', () => {
      // given
      cy.get('lunch-items[liked=false]')
        .find('lunch-item')
        .its('length')
        .should('be.a', 'number')
        .then((length) => {
          const beforeItemsCount = length;

          // then
          cy.get('lunch-items[liked=false]').find('lunch-item').first().click();
          cy.get('lunch-detail-modal', { timeout: 10000 }).should('exist');
          cy.get('lunch-detail-modal').find('.detail-modal-delete').click();

          // when
          cy.get('lunch-items[liked=false]')
            .find('lunch-item')
            .its('length')
            .should('equal', beforeItemsCount - 1);
        });
    });

    it('모든 식당 리스트를 한식만 필터링한다.', () => {
      // given
      cy.get('lunch-items[liked=false]')
        .find('lunch-item')
        .filter('[category="한식"]')
        .its('length')
        .then((length) => {
          const expectedKoreanRestaurants = length;

          // when
          cy.get('lunch-dropdown[options="category"]')
            .find('select')
            .select('한식')
            .then(() => {
              // then
              cy.get('lunch-items[liked=false]')
                .find('lunch-item')
                .its('length')
                .should('equal', expectedKoreanRestaurants);
            });
        });
    });
  });
});
