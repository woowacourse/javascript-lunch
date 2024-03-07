import { sampleRestaurants } from './data';

describe('점심 뭐 먹지 E2E 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport(550, 950);
    localStorage.setItem('restaurants', JSON.stringify(sampleRestaurants));
  });

  it('새로운 음식점을 추가할 수 있다.', () => {
    cy.get('.gnb__button').click();

    cy.get('.modal-category').select('한식');
    cy.get('.modal-restaurant-name').type('파슬리와 썬데이의 삼겹살집');
    cy.get('.modal-distance').select('5');
    cy.get('.modal-description').type('파슬리와 썬데이가 장인 정신으로 한땀한땀 구워주는 삼겹살 맛집입니다.');
    cy.get('.modal-reference').type('https://www.woowacourse.io/');

    cy.get('.button--primary').click();

    cy.get('.restaurant').last().find('.restaurant__name').should('contain', '파슬리와 썬데이의 삼겹살집');
    cy.get('.restaurant').last().find('.restaurant__distance').should('contain', '5');
    cy.get('.restaurant')
      .last()
      .find('.restaurant__description')
      .should('contain', '파슬리와 썬데이가 장인 정신으로 한땀한땀 구워주는 삼겹살 맛집입니다.');
  });
});
