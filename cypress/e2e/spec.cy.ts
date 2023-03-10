import { CLASS, ID } from '../../src/constants';

describe('template spec', () => {
  it('모달창 여닫기', () => {
    cy.visit('http://localhost:8080/');
    cy.get(`.${CLASS.GNB_BUTTON}`).click();
    cy.get(`#${ID.CANCEL_BUTTON}`).click();
    cy.get(`.${CLASS.GNB_BUTTON}`).click();
    cy.get(`#${ID.CANCEL_BUTTON}`).click();
  });

  it('음식점 추가하기', () => {
    cy.visit('http://localhost:8080/');
    cy.get(`.${CLASS.GNB_BUTTON}`).click();
    cy.get('#category').select('양식', { force: true });
    cy.get('#name').type('양식 테스트');
    cy.get('#distance').select('10분 내');
    cy.get('#description').type('설명 테스트');
    cy.get('#link').type('https://www.google.com');
    cy.get(`#${ID.ADD_FORM}`).submit();
  });

  it('음식점 여닫고 삭제하기', () => {
    cy.visit('http://localhost:8080/');
    ['아시안', '딩가딩가', '양양양', '이태리키친', '일일일'].forEach((name) => {
      cy.get(`.${CLASS.RESTAURANT}`).contains(name).click();
      cy.get(`#${ID.DELETE_BUTTON}`).click();
    });
  });

  it('음식점 정렬하기', () => {
    cy.visit('http://localhost:8080/');
    cy.get(`#${ID.SORTING_FILTER}`).select('거리순');
    ['양식', '일식', '한식', '아시안', '기타', '전체'].forEach((category) => {
      cy.get(`#${ID.CATEGORY_FILTER}`).select(category);
    });
    cy.get(`#${ID.SORTING_FILTER}`).select('이름순');
  });

  it('자주 가는 음식점 등록/삭제하기', () => {
    cy.visit('http://localhost:8080/');

    [1, 3, 5, 6].forEach((number) => {
      cy.get(`.${CLASS.FAVORITE}`).eq(number).click({ force: true });
    });

    cy.get(`#${ID.FAVORITE_RESTAURANT}`).click();

    [1, 3, 5, 6].forEach((number) => {
      cy.get(`.${CLASS.FAVORITE}`).eq(number).click({ force: true });
    });

    cy.get(`#${ID.ALL_RESTAURANT}`).click();
    cy.get(`#${ID.FAVORITE_RESTAURANT}`).click();
  });
});
