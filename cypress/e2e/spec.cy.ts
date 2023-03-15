import { CLASS, ID } from '../../src/constants';

describe('앱 E2E 테스트', () => {
  it(`클래스명이 ${CLASS.ADD_MODAL}인 모달창을 열면 클래스명이 ${CLASS.MODAL_OPEN}이 된다.`, () => {
    cy.visit('http://localhost:8080/');
    cy.get(`.${CLASS.GNB_BUTTON}`).click();
    cy.get(`.${CLASS.MODAL_OPEN}`);
    cy.get(`#${ID.CANCEL_BUTTON}`).click();
    cy.get(`.${CLASS.ADD_MODAL}`);
  });

  it('헤더의 음식점 추가하기 버튼을 누르고 "양식 테스트"라는 이름의 음식점을 등록하면 음식점 목록에 추가된다.', () => {
    cy.visit('http://localhost:8080/');
    cy.get(`.${CLASS.GNB_BUTTON}`).click();
    cy.get('#category').select('양식', { force: true });
    cy.get('#name').type('양식 테스트');
    cy.get('#distance').select('10분 내');
    cy.get('#description').type('설명 테스트');
    cy.get('#link').type('https://www.google.com');
    cy.get(`#${ID.ADD_FORM}`).submit();

    cy.get(`.${CLASS.RESTAURANT}`).contains('양식 테스트');
  });

  it('음식점을 눌러 세부사항 모달창을 열고, 삭제하기를 누르면 음식점 목록에서 삭제된다.', () => {
    cy.visit('http://localhost:8080/');
    ['아시안', '딩가딩가', '이태리키친', '일일일'].forEach((name) => {
      cy.get(`.${CLASS.RESTAURANT}`).contains(name).click();
      cy.get(`#${ID.DELETE_BUTTON}`).click();
    });

    ['아시안', '딩가딩가', '이태리키친', '일일일'].forEach((name) => {
      cy.get(`.${CLASS.RESTAURANT}`).contains(name).should('not.exist');
    });
  });

  it('음식점을 거리순 / 이름순, 카테고리별로 정렬할 수 있다.', () => {
    cy.visit('http://localhost:8080/');
    cy.get(`#${ID.SORTING_FILTER}`).select('거리순');
    ['양식', '일식', '한식', '아시안', '기타', '전체'].forEach((category) => {
      cy.get(`#${ID.CATEGORY_FILTER}`).select(category);
    });
    cy.get(`#${ID.SORTING_FILTER}`).select('이름순');
  });

  it('자주 가는 음식점 버튼을 활성화/비활성화 하면 자주 가는 음식점에 등록/취소된다.', () => {
    cy.visit('http://localhost:8080/');

    [1, 3, 5, 6].forEach((number) => {
      cy.get(`.${CLASS.FAVORITE}`).eq(number).click({ force: true });
    });

    cy.get(`#${ID.FAVORITE_RESTAURANT}`).click();

    ['아시안', '일일일', '중중중', '피양콩할마니'].forEach((favoriteItem) => {
      cy.get(`.${CLASS.RESTAURANT_LIST_CONTAINER}`).contains(favoriteItem).should('exist');
    });

    [1, 3, 5, 6].forEach((number) => {
      cy.get(`.${CLASS.FAVORITE}`).eq(number).click({ force: true });
    });

    cy.get(`#${ID.ALL_RESTAURANT}`).click();
    cy.get(`#${ID.FAVORITE_RESTAURANT}`).click();

    ['아시안', '일일일', '중중중', '피양콩할마니'].forEach((favoriteItem) => {
      cy.get(`.${CLASS.RESTAURANT_LIST_CONTAINER}`).contains(favoriteItem).should('not.exist');
    });
  });
});
