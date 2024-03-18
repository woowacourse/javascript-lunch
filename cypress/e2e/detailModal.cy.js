describe('레스토랑 상세 모달 테스트', () => {
  it('레스토랑 Card element를 클릭 시, 상세 모달이 나온다.', () => {
    cy.visit('http://localhost:8080/');

    cy.contains('농민백암순대 본점').click();

    cy.get('#restaurant-detail-modal').should('have.class', 'modal--open');
    cy.get('#restaurant-detail-modal').should('not.have.class', 'modal--close');
  });

  it('레스토랑 상세 모달에서 닫기 버튼을 클릭 시, 상세 모달이 닫힌다.', () => {
    cy.visit('http://localhost:8080/');

    cy.contains('농민백암순대 본점').click();
    cy.contains('닫기').click();

    cy.get('#restaurant-detail-modal').should('not.have.class', 'modal--open');
    cy.get('#restaurant-detail-modal').should('have.class', 'modal--close');
  });

  it('레스토랑 상세 모달에서 삭제 버튼을 클릭 시, 해당 레스토랑이 지워지고 모달이 닫힌다', () => {
    cy.visit('http://localhost:8080/');

    // 삭제 버튼 클릭 시
    cy.contains('농민백암순대 본점').click();
    cy.contains('삭제').click();

    // UI 상에서 지워지는지 확인
    cy.contains('농민백암순대 본점').should('not.be.visible');
    cy.get('#restaurant-detail-modal').should('have.class', 'modal--close');

    // 데이터 상에서 지워지는지 확인
    cy.getAllLocalStorage().then((result) => {
      const localStorageData = JSON.parse(result['http://localhost:8080'].restaurants);
      const hasRestaurant = localStorageData.some((restaurant) => restaurant.name === '농민백암순대 본점');

      expect(hasRestaurant).to.be.not.true;
    });
  });
});
