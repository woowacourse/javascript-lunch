/// <reference types="cypress" />
import 'cypress-wait-until';
import { mockData } from '../../src/mocks/restaurantsInfo';

describe('점심 뭐 먹지 E2E test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('mock', JSON.stringify(mockData));
      },
    });
    cy.viewport('iphone-xr');
  });

  it('음식점 추가를 할 수 있다', () => {
    cy.get('.gnb__button').click();

    cy.get('#category').select('중식');
    cy.get('#name').type('친친');
    cy.get('#distance').select('5분 내');
    cy.get('#description').type('30년 전통의 중식집');
    cy.get('#link').type('http://www.chinchin.com');

    cy.get('.button').contains('추가하기').click();

    cy.get('.restaurant').should('have.length', 11).last().should('contain', '친친');
  });

  it('음식점을 즐겨찾기에 추가할 수 있다', () => {
    cy.get('.restaurant-list').contains('피양콩할머니').parent().find('img.favorite-icon').click();
    cy.get('#nav-tab-2').click();

    cy.get('.restaurant').should('have.length', 1).last().should('contain', '피양콩할머니');
  });

  it('음식점을 카테고리에 따라 필터링이 가능하다', () => {
    cy.get('#category-filter').select('중식');

    cy.get('.restaurant').should('have.length', 2);
  });

  it('음식점을 거리순에 따라 필터링이 가능하다', () => {
    cy.get('#sorting-filter').select('거리순');

    cy.waitUntil(() => cy.get('.restaurant').first().should('contain', '10분 내'));
  });

  it('음식점을 이름순에 따라 필터링이 가능하다', () => {
    cy.get('#sorting-filter').select('이름순');

    cy.waitUntil(() => cy.get('.restaurant').first().should('contain.text', '동남아할머니'));
  });
});
