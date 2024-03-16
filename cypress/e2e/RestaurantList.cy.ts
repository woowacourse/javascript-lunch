import { RESTAURANTS_DB_KEY } from '@/constants/Condition';

const NEW_RESTAURANT = {
  name: '아웃백',
  category: '양식',
  distance: '20',
  description: '호주 컨셉의 미국의 외식업체이다.',
  link: 'https://www.naver.com',
};

describe('음식점 리스트 불러오기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    const $addModalButton = cy.get('.gnb__button');
    $addModalButton.click();

    const $addModal = cy.get('#add-modal');
    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);
    $addModal.get('#description').type(NEW_RESTAURANT.description);
    $addModal.get('#link').type(NEW_RESTAURANT.link);

    const $addButton = $addModal.get('button').contains('추가하기');
    $addButton.click();
  });

  it('페이지에 접속하면 음식점 리스트를 로컬스토리지에 담긴 음식점 데이터의 개수만큼 잘 렌더링 한다.', () => {
    cy.get('.restaurant-list').should('exist');
    cy.get('.restaurant').should(
      'have.length',
      JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]').length,
    );
  });

  it('음식점 아이템에는 카테고리, 이름, 거리, 설명, 즐겨찾기 버튼이 모두 렌더링 된다.', () => {
    cy.get('.restaurant').then(($restaurant) => {
      cy.wrap($restaurant).find('category-icon');
      cy.wrap($restaurant).find('.restaurant__name');
      cy.wrap($restaurant).find('.restaurant__distance');
      cy.wrap($restaurant).find('.restaurant__description');
      cy.wrap($restaurant).find('.favorite-button');
    });
  });
});
