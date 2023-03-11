const addRestaurant = (category, name, distance) => {
  cy.get('#modal-open-button').click();
  cy.get('#category').select(category);
  cy.get('#name').type(name);
  cy.get('#distance').select(distance);
  cy.get('button').contains('추가하기').click();
};

const clickFavoriteIcon = () => {
  cy.get('#favorite-icon').click();
};

it('음식점 정보를 입력하여 음식점을 추가할 수 있다.', () => {
  cy.viewport(400, 830);
  cy.visit('http://localhost:8080/');

  addRestaurant('한식', 'cypress 맛집', '5');

  cy.get('#restaurant-list-container').children().children().should('contain.text', 'cypress 맛집');
});

it('별표 아이콘을 클릭하여 자주가는 음식점 체크를 할 수 있다.', () => {
  cy.viewport(400, 830);
  cy.visit('http://localhost:8080/');

  addRestaurant('한식', 'cypress 맛집', '5');

  clickFavoriteIcon();
  cy.get('#favorite-icon').should('have.attr', 'alt', 'favorite-icon-filled');

  clickFavoriteIcon();
  cy.get('#favorite-icon').should('have.attr', 'alt', 'favorite-icon-lined');
});

it('자주가는 음식점 탭을 클릭하여 자주가는 음식점 목록을 볼 수 있다.', () => {
  cy.viewport(400, 830);
  cy.visit('http://localhost:8080/');

  addRestaurant('한식', 'cypress 맛집', '5');

  clickFavoriteIcon();

  cy.get('label').contains(' 자주 가는 음식점 ').click();

  cy.get('#restaurant-list-container').children().children().should('contain.text', 'cypress 맛집');
});

it('카테고리 별 필터를 선택하여 카테고리 별 음식점 목록을 볼 수 있다.', () => {
  cy.viewport(400, 830);
  cy.visit('http://localhost:8080/');

  addRestaurant('한식', '한식 맛집', '5');
  addRestaurant('중식', '중식 맛집', '5');
  addRestaurant('일식', '일식 맛집', '5');
  addRestaurant('아시안', '아시안 맛집', '5');
  addRestaurant('양식', '양식 맛집', '5');
  addRestaurant('기타', '기타 맛집', '5');

  cy.get('#category-filter').select('한식');
  cy.get('#restaurant-list-container').children().children().should('contain.text', '한식 맛집');

  cy.get('#category-filter').select('중식');
  cy.get('#restaurant-list-container').children().children().should('contain.text', '중식 맛집');

  cy.get('#category-filter').select('일식');
  cy.get('#restaurant-list-container').children().children().should('contain.text', '일식 맛집');

  cy.get('#category-filter').select('아시안');
  cy.get('#restaurant-list-container').children().children().should('contain.text', '아시안 맛집');

  cy.get('#category-filter').select('양식');
  cy.get('#restaurant-list-container').children().children().should('contain.text', '양식 맛집');

  cy.get('#category-filter').select('기타');
  cy.get('#restaurant-list-container').children().children().should('contain.text', '기타 맛집');
});

describe('정렬 필터 기능', () => {
  it('이름순 필터를 선택하여 이름순 음식점 목록을 볼 수 있다.', () => {
    cy.viewport(400, 830);
    cy.visit('http://localhost:8080/');

    addRestaurant('한식', '가 맛집', '5');
    addRestaurant('한식', '나 맛집', '5');
    addRestaurant('한식', '다 맛집', '5');

    cy.get('#sorting-filter').select('이름순');

    cy.get('#restaurant-list-container')
      .children()
      .children()
      .first()
      .should('contain.text', '가 맛집');

    cy.get('#restaurant-list-container')
      .children()
      .children()
      .first()
      .next()
      .should('contain.text', '나 맛집');

    cy.get('#restaurant-list-container')
      .children()
      .children()
      .last()
      .should('contain.text', '다 맛집');
  });

  it('거리순 필터를 선택하여 거리순 음식점 목록을 볼 수 있다.', () => {
    cy.viewport(400, 830);
    cy.visit('http://localhost:8080/');

    addRestaurant('한식', '5분 맛집', '5');
    addRestaurant('한식', '10분 맛집', '10');
    addRestaurant('한식', '15분 맛집', '15');

    cy.get('#sorting-filter').select('거리순');
    cy.get('#restaurant-list-container')
      .children()
      .children()
      .first()
      .should('contain.text', '5분 맛집');

    cy.get('#restaurant-list-container')
      .children()
      .children()
      .first()
      .next()
      .should('contain.text', '10분 맛집');

    cy.get('#restaurant-list-container')
      .children()
      .children()
      .last()
      .should('contain.text', '15분 맛집');
  });
});
