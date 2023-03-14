describe('javascript-lunch 미션 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(412, 915);

    cy.get('#add-restaurant-button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('우래옥');
    cy.get('#distance').select('30');
    cy.get('#description').type('우래옥은 웨이팅 2시간 평양냉면 맛집');
    cy.contains('추가하기').click();
  });

  it('음식점 정보를 입력해 목록에 추가할 수 있다.', () => {
    const restaurantName = '필동면옥';

    cy.get('#add-restaurant-button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type(restaurantName);
    cy.get('#distance').select('10');
    cy.get('#description').type('필동면옥은 타미가 소개해준 평양냉면 맛집');
    cy.contains('추가하기').click();

    cy.get('.restaurant-list').children().should('contain', restaurantName);
  });

  it('음식점 추가 시 유효하지 않은 음식점 정보를 입력한 경우 에러 메시지가 뜬다. ', () => {
    cy.get('#add-restaurant-button').click();
    cy.get('#name').type('🥸스시사카우');
    cy.get('#description').type('가성비 좋은 오마카세 맛집');
    cy.get('#link').type('abc');

    cy.contains('추가하기').click();

    cy.get('#category-caption').should('contain', '카테고리를 선택해 주세요.');
    cy.get('#name-caption').should(
      'contain',
      '음식점 이름은 한글, 영어, 숫자, !@#$%^&*?\'",.만 포함하는 15글자 이하의 문자열로 입력해 주세요.',
    );
    cy.get('#distance-caption').should('contain', '거리를 선택해 주세요.');
    cy.get('#link-caption').should('contain', '유효한 링크를 입력해 주세요.');
  });

  it('음식점 추가 시 중복되는 음식점 이름을 입력한 경우 에러 메시지가 뜬다. ', () => {
    cy.get('#add-restaurant-button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('우래옥');
    cy.get('#distance').select('30');

    cy.contains('추가하기').click();

    cy.get('#name-caption').should(
      'contain',
      '이미 존재하는 음식점 이름입니다. 다시 입력해 주세요.',
    );
  });

  it('음식점을 클릭하면 상세정보를 확인할 수 있다.', () => {
    cy.contains('우래옥').click();

    cy.get('#restaurant-detail-modal .restaurant__name').should('contain', '우래옥');
    cy.get('#restaurant-detail-modal .restaurant__category img').should('have.attr', 'alt', '한식');
    cy.get('#restaurant-detail-modal .restaurant__distance').should('contain', '30분');
  });

  it('음식점 상세정보에서 삭제하기를 클릭하면 음식점을 삭제할 수 있다.', () => {
    cy.contains('우래옥').click();
    cy.contains('삭제하기').click();

    cy.get('.restaurant-list').should('not.contain', '우래옥');
  });

  it('즐겨찾기를 등록하면 자주 가는 음식점 목록에 추가할 수 있다.', () => {
    cy.contains('우래옥').closest('.restaurant').find('.favorite-button').click();
    cy.contains('자주 가는 음식점').click();

    cy.get('.restaurant-list').should('contain', '우래옥');
  });

  it('즐겨찾기를 해제하면 자주 가는 음식점 목록에서 삭제할 수 있다.', () => {
    cy.contains('우래옥').closest('.restaurant').find('.favorite-button').click();
    cy.contains('자주 가는 음식점').click();
    cy.contains('우래옥').closest('.restaurant').find('.favorite-button').click();

    cy.get('.restaurant-list').should('not.contain', '우래옥');
  });

  it('음식점 추가 후 새로고침을 했을 때 추가한 음식점이 목록에 있다.', () => {
    cy.reload();

    cy.get('.restaurant-list').should('contain', '우래옥');
  });

  it('자주가는 음식점 추가 후 새로고침을 했을 때 추가한 음식점이 목록에 있다.', () => {
    cy.contains('우래옥').closest('.restaurant').find('.favorite-button').click();
    cy.contains('자주 가는 음식점').click();

    cy.reload();

    cy.get('.restaurant-list').should('contain', '우래옥');
  });
});
