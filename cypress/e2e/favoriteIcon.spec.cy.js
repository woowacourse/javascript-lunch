describe('즐겨찾기 아이콘 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('즐겨찾지 않은 음식점의 즐겨찾기 아이콘을 클릭 시, 해당 음식점의 즐겨찾기 여부가 "true"로 변경된다.', () => {
    //즐겨찾기 여부 확인
    cy.get('restaurant-item')
      .eq(0)
      .find('.favorite-false-img')
      .should('be.visible');
    cy.get('restaurant-item')
      .eq(0)
      .find('.favorite-true-img')
      .should('not.be.visible');

    //즐겨찾기 변경
    cy.get('restaurant-item').eq(0).find('favorite-icon').click();

    // 즐겨찾기 변경 여부 확인
    cy.get('restaurant-item')
      .eq(0)
      .find('.favorite-false-img')
      .should('not.be.visible');
    cy.get('restaurant-item')
      .eq(0)
      .find('.favorite-true-img')
      .should('be.visible');
  });

  it('즐겨찾는 음식점의 즐겨찾기 아이콘을 클릭 시, 해당 음식점의 즐겨찾기 여부가 "false"로 변경된다.', () => {
    //즐겨찾기 여부 확인
    cy.get('restaurant-item')
      .eq(1)
      .find('.favorite-false-img')
      .should('not.be.visible');
    cy.get('restaurant-item')
      .eq(1)
      .find('.favorite-true-img')
      .should('be.visible');

    //즐겨찾기 변경
    cy.get('restaurant-item').eq(1).find('favorite-icon').click();

    // 즐겨찾기 변경 여부 확인
    cy.get('restaurant-item')
      .eq(1)
      .find('.favorite-false-img')
      .should('be.visible');
    cy.get('restaurant-item')
      .eq(1)
      .find('.favorite-true-img')
      .should('not.be.visible');
  });

  it('음식 정보 모달 내에서 즐겨찾기 여부를 변경 시, 모달 밖의 음식점 리스트의 즐겨찾기 아이콘도 변경된다.', () => {
    //즐겨찾기 여부 확인 : 즐겨찾는 음식점이 아닌 상태
    cy.get('restaurant-item')
      .eq(3)
      .find('.favorite-false-img')
      .should('be.visible');

    cy.get('restaurant-item')
      .eq(3)
      .find('.favorite-true-img')
      .should('not.be.visible');

    //모달 오픈
    cy.get('restaurant-item').eq(3).click();
    // 즐겨찾기 변경
    cy.get('restaurant-info-modal-inner').find('favorite-icon').click();

    //즐겨찾기 변겨 여부
    //모달 내
    cy.get('restaurant-info-modal-inner')
      .find('.favorite-true-img')
      .should('be.visible');

    //모달 밖의 모든 음식점 내
    cy.get('restaurant-item')
      .eq(3)
      .find('.favorite-true-img')
      .should('be.visible');
  });

  it('자주 가는 음식점 목록에서 즐겨찾기되어 있는 음식점의 즐겨찾기 아이콘을 클릭하면, 자주 가는 음식적 목록에서 해당 음식점을 사라진다.', () => {
    //자주 가는 음식점 목록 열기
    cy.get('navigation-bar').find('button').eq(1).click();

    const $restaurantItem = cy.get('restaurant-item').first();
    const storeName = $restaurantItem.invoke('attr', 'store-name');

    cy.get('restaurant-item').first().find('favorite-icon').click();

    //자주 가는 음식점 목록에서 해당 음식점이 제거 되었는지 확인
    cy.get('restaurant-item')
      .invoke('attr', 'store-name')
      .then((hrefValue) => {
        expect(hrefValue !== storeName).to.be.true;
      });
  });
});
