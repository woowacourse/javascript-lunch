describe('음식점 추가 모달 테스트', () => {
  it('음식점 추가버튼을 누르면 음식점 추가 모달이 뜬다.', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.gnb__button').click();

    cy.get('.modal').should('be.visible');
  });

  it('음식점 추가 모달에서 새로운 음식점을 추가하면 음식점 리스트에 추가된다.', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.gnb__button').click();
    cy.get('.modal').should('be.visible');

    cy.get('#category').select('한식');
    cy.get('#name').type('김도니');
    cy.get('#distance').select('5분 내');
    cy.get('#description').type('한식 맛집');
    cy.get('#link').type('https://www.naver.com');

    cy.contains('추가하기').click();

    cy.get('restaurant-list').should('contain.text', '김도니');
  });

  it('음식점 추가 모달에서 취소하기 버튼을 누르면 모달이 사라진다.', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.gnb__button').click();
    cy.get('.modal').should('be.visible');

    cy.contains('취소하기').click();

    cy.get('.modal').should('not.be.visible');
  });
});

describe('음식점 필터링 테스트', () => {
  it('음식점의 카테고리를 선택하면 해당하는 음식점 목록만 보여진다.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#category-filter').select('한식');

    cy.get('restaurant-list').should('contain.text', '피양콩할마니');
  });

  it('음식점을 거리순으로 정렬하면 거리순으로 정렬되어 보여진다.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#sorting-filter').select('거리순');

    ['도스타코스', '친친', '잇쇼우', '피양콩할마니', '호아빈', '이태리키친'].forEach(
      (restaurant, idx) => {
        cy.get('restaurant-list-item').eq(idx).should('contain.text', restaurant);
      }
    );
  });
});

describe('음식점 즐겨찾기 테스트', () => {
  it('음식점의 즐겨찾기 버튼을 누르면 즐겨찾기 추가/해제를 할 수 있다.', () => {
    cy.visit('http://localhost:8080/');

    [0, 1].forEach((idx) => cy.get('.favorite__button').eq(idx).click());
    cy.contains('자주 가는 음식점').click();

    cy.get('restaurant-list').should('contain.text', '피양콩할마니');
    cy.get('restaurant-list').should('contain.text', '친친');

    cy.get('.favorite__button').eq(0).click();

    cy.get('restaurant-list').should('not.contain.text', '피양콩할마니');
  });
});

describe('음식점 상세정보 모달 테스트', () => {
  it('음식점 목록을 클릭하면 음식점 상세정보 모달이 뜬다.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('restaurant-list-item').eq(0).click();

    cy.get('.modal').should('contain.text', '피양콩할마니');
  });

  it('음식점 상세정보 모달에서 즐겨찾기 추가/해제를 할 수 있다.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('restaurant-list-item').eq(0).click();
    cy.get('restaurant-detail .favorite__button').click();
    cy.contains('닫기').click();
    cy.contains('자주 가는 음식점').click();

    cy.get('.modal').should('contain.text', '피양콩할마니');
  });

  it('음식점 상세정보 모달에서 음식점을 삭제할 수 있다.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('restaurant-list-item').eq(0).click();
    cy.contains('삭제하기').click();

    cy.get('restaurant-list').should('not.contain.text', '피양콩할마니');
  });
});
