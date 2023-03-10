describe('javascript-lunch 미션 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(412, 915);

    cy.get('.gnb__button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('우래옥');
    cy.get('#distance').select('30');
    cy.get('#description').type('우래옥은 웨이팅 2시간 평양냉면 맛집');
    cy.contains('추가하기').click();
  });

  it('음식점 정보를 입력해 목록에 추가할 수 있다.', () => {
    const restaurantName = '필동면옥';

    cy.get('.gnb__button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type(restaurantName);
    cy.get('#distance').select('10');
    cy.get('#description').type('필동면옥은 타미가 소개해준 평양냉면 맛집');
    cy.contains('추가하기').click();

    cy.get('.restaurant-list').children().should('contain', restaurantName);
  });

  it('음식점을 클릭하면 상세정보를 볼 수 있다.', () => {
    cy.contains('우래옥').click();

    cy.get('#restaurant-detail-modal').should('contain', '우래옥');
  });

  it('음식점 상세정보에서 삭제하기를 클릭하면 음식점을 삭제할 수 있다.', () => {
    cy.contains('우래옥').click();
    cy.contains('삭제하기').click();

    cy.get('.restaurant-list').should('not.contain', '우래옥');
  });

  it('즐겨찾기를 등록하면 자주 가는 음식점 목록에 추가할 수 있다.', () => {
    cy.get('.favorite-button').eq(0).click();
    cy.contains('자주 가는 음식점').click();

    cy.get('.restaurant-list').should('contain', '우래옥');
  });

  it('즐겨찾기를 해제하면 자주 가는 음식점 목록에서 삭제할 수 있다.', () => {
    cy.get('.favorite-button').eq(0).click();
    cy.contains('자주 가는 음식점').click();
    cy.get('.favorite-button').eq(0).click();

    cy.get('.restaurant-list').should('not.contain', '우래옥');
  });

  it('음식점 추가 후 새로고침을 했을 때 추가한 음식점이 목록에 있다.', () => {
    cy.reload();

    cy.get('.restaurant-list').should('contain', '우래옥');
  });

  it('자주가는 음식점 추가 후 새로고침을 했을 때 추가한 음식점이 목록에 있다.', () => {
    cy.get('.favorite-button').eq(0).click();
    cy.contains('자주 가는 음식점').click();
    cy.reload();

    cy.get('.restaurant-list').should('contain', '우래옥');
  });
});
