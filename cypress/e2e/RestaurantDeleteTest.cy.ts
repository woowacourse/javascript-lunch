describe('식당 삭제 테스트', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr'); // 모바일 화면으로 설정
    cy.visit('/');
  });

  it('식당 리스트의 두 번째 식당 클릭 시 식당 세부 모달이 열려야 한다.', () => {
    // when
    cy.get('lunch-items[liked=false]').find('lunch-item').eq(1).click();

    // then
    cy.get('.detail-modal--open').should('exist');
  });

  it('식당 세부 정보 모달에서 식당을 삭제할 수 있어야 한다.', () => {
    // given
    cy.get('lunch-items[liked=false]')
      .find('lunch-item')
      .its('length')
      .should('be.a', 'number')
      .then((length) => {
        const expectedItemsCount = length - 1;

        // then
        cy.get('lunch-items[liked=false]').find('lunch-item').first().click();
        cy.get('lunch-detail-modal', { timeout: 10000 }).should('exist');
        cy.get('lunch-detail-modal').find('.detail-modal-delete').click();

        // when
        cy.get('lunch-items[liked=false]')
          .find('lunch-item')
          .its('length')
          .should('equal', expectedItemsCount);
      });
  });
});
