describe('점심 뭐 먹지 root 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('음식점 등록 시 음식점 목록에 추가된다.', () => {
    cy.get('.gnb__button').click();
    cy.get('#restaurant-name').type('e2e test-restaurantName');
    cy.get('#restaurant-category').select('한식').should('have.value', '한식');
    cy.get('#restaurant-minuteswalk').select('10분 내').should('have.value', '10');
    cy.get('#restaurant-description').type('e2e test-restaurantDescription');
    cy.get('#restaurant-referenceurl').type('https://github.com/greetings1012');
    cy.get('#submit-adding-restaurant-button').click();
    cy.get('.restaurant-list').find('li').should('have.length', 7);
  });

  it('음식점 삭제 시 음식점 목록에서 제거된다.', () => {
    cy.get('#restaurant-item-도스타코스선릉점').click();
    cy.get('#delete-restaurant-info').click();
    cy.get('.restaurant-list').find('li').should('have.length', 5);
  });

  it('음식점을 즐겨찾기에 추가하면 자주 찾는 음식점 탭에서 따로 확인할 수 있다.', () => {
    cy.get('#favorite-button-친친').click();
    cy.get('#favorite-button-이태리키친').click();
    cy.get('#show-favorite').click();
    cy.get('.restaurant-list').find('li').should('have.length', 2);
  });
});
