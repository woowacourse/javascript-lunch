describe('식당 좋아요 테스트', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr'); // 모바일 화면으로 설정
    cy.visit('/');
  });

  it('좋아요를 누르면 자주 가는 음식점 탭에서 확인할 수 있어야 한다.', () => {
    // given
    cy.get('lunch-items[liked=false]')
      .find('lunch-item')
      .first()
      .invoke('attr', 'name')
      .then((expectedName) => {
        cy.get('lunch-items[liked=false]').find('lunch-item').first().find('.liked-icon').click();

        // when
        cy.get('.tab-button-liked').click();

        // then
        cy.get('lunch-items[liked=true]')
          .find('lunch-item')
          .first()
          .invoke('attr', 'name')
          .should('equal', expectedName);
      });
  });
});
