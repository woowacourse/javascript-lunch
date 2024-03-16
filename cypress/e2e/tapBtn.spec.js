describe('tapBtn 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
    cy.get('restaurant-box[name="도스타코스 선릉점"]').find('star-btn').click();
  });

  it('자주가는 음식점 버튼을 클릭하면 즐겨찾기한 음식점 정보만 출력된다.', () => {
    cy.get('#like-restaurant').click();
    cy.get('#like-restaurant').should('have.class', 'click');
    cy.get('#all-restaurant').should('not.have.class', 'click');

    cy.contains('restaurant-box', '도스타코스 선릉점').should('exist');
    // 즐겨찾기 하지 않은 음식점의 정보는 출력되지 않는다.
    cy.contains('restaurant-box', '친친').should('not.exist');
  });

  it('모든 음식점 버튼을 클릭하면 전체 음식점 정보를 출력한다.', () => {
    cy.get('#all-restaurant').click();
    cy.get('#all-restaurant').should('have.class', 'click');
    cy.get('#like-restaurant').should('not.have.class', 'click');

    cy.contains('restaurant-box', '도스타코스 선릉점').should('exist');
    cy.contains('restaurant-box', '친친').should('exist');
  });
});
