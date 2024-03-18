describe('화면 전환 확인', () => {
  beforeEach(() => {
    cy.visit('/'); // 웹 페이지로 이동
  });

  it('메뉴 탭 클릭으로 화면 전환 확인', () => {
    // '모든 음식점' 탭을 클릭하고 활성화 여부를 확인합니다.
    cy.contains('모든 음식점').click();
    cy.get('.tab__item.active').should('contain', '모든 음식점');

    // '자주 가는 음식점' 탭을 클릭하고 활성화 여부를 확인합니다.
    cy.contains('자주 가는 음식점').click();
    cy.get('.tab__item.active').should('contain', '자주 가는 음식점');
  });
});
