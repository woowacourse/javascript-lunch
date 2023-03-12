/// <reference types="cypress" />
describe('점심 뭐 먹지 E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('초기 화면이 잘 표시되어야 한다', () => {
    cy.get('r-header').contains('점심 뭐 먹지');
  });

  it('음식점을 카테고리 기준으로 필터링한다', () => {
    cy.get('section[slot="all"]').within(() => {
      cy.get('r-restaurant-category-select').find('select').select('한식');
      cy.get('r-restaurant-list-item').should('have.length', 1).contains('피양콩할머니');

      cy.get('r-restaurant-category-select').find('select').select('중식');
      cy.get('r-restaurant-list-item').should('have.length', 1).contains('친친');

      cy.get('r-restaurant-category-select').find('select').select('전체');
      cy.get('r-restaurant-list-item').should('have.length', 6);
    });
  });

  it('음식점을 이름순 또는 거리순으로 정렬하여 본다', () => {
    cy.get('section[slot="all"]').within(() => {
      cy.get('r-restaurant-sort-select').find('select').select('거리순');
      cy.get('r-restaurant-list-item').last().contains('이태리키친');

      cy.get('r-restaurant-sort-select').find('select').select('이름순');
      cy.get('r-restaurant-list-item').last().contains('호아빈 삼성점');
    });
  });

  it('음식점을 추가한다', () => {
    cy.get('r-header').find('button').click();

    cy.get('r-new-restaurant-modal').within(() => {
      cy.get('[name="category"]').find('select').select('한식', { force: true });
      cy.get('[name="name"]').find('input').type('맛있는 음식점', { force: true });
      cy.get('[name="distance"]').find('select').select('5분 내', { force: true });
      cy.get('[name="description"]')
        .find('textarea')
        .type('맛있는 음식점입니다. 많이 방문해주세요~', { force: true });
      cy.get('[name="referenceUrl"]').find('input').type('http://www.naver.com', { force: true });

      cy.get('r-button').contains('추가하기').click();
    });

    cy.get('section[slot="all"]').within(() => {
      cy.get('r-restaurant-list-item')
        .contains('맛있는 음식점')
        .contains('5분 내')
        .contains('맛있는 음식점입니다. 많이 방문해주세요~');
    });
  });
});
