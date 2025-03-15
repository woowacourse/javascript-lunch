import { RESTAURANT_DATA } from '../../public/restaurantData.ts';
import { CATEGORY, DISTANCE_OPTIONS } from '../../src/constants/SETTING.js';

describe('음식점 목록 추가 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.viewport(1280, 1000);
  });

  it('음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력할 수 있다.', () => {
    cy.get('.gnb__button').click();

    cy.get('select#category').should('exist');
    cy.get('#name').should('exist');
    cy.get('#distance').should('exist');
    cy.get('#description').should('exist');
    cy.get('#link').should('exist');

    cy.get('select#category').select('한식').should('have.value', '한식');
    cy.get('#name').type('기와집').should('have.value', '기와집');
    cy.get('#distance').select('5분 내').should('have.value', '5');
    cy.get('#description')
      .type('50년 전통을 자랑하는 수육 맛집')
      .should('have.value', '50년 전통을 자랑하는 수육 맛집');
    cy.get('#link')
      .type('https://techcourse.woowahan.com/')
      .should('have.value', 'https://techcourse.woowahan.com/');
  });

  it('음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력하여 음식점을 추가 할 수 있다.', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal-container').should('be.visible');

    cy.get('select#category').select('한식');
    cy.get('#name').type('기와집');
    cy.get('#distance').select('5분 내');
    cy.get('#description').type('50년 전통을 자랑하는 수육 맛집');
    cy.get('#link').type('https://techcourse.woowahan.com/');

    cy.get('button.button--primary').click();
    cy.get('.modal-container').should('not.be.visible');

    cy.get('.restaurant-list')
      .children()
      .should('have.length', RESTAURANT_DATA.length + 1);
    cy.get('.restaurant-list')
      .contains('.restaurant', '기와집')
      .should('exist')
      .within(() => {
        cy.get('.restaurant__name').should('contain.text', '기와집');
        cy.get('.restaurant__category').should('exist');
        cy.get('.restaurant__distance').should('contain.text', '5분 내');
        cy.get('.restaurant__description').should('contain.text', '50년 전통을 자랑하는 수육 맛집');
      });
  });

  it('카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.', () => {
    Object.values(CATEGORY).forEach((categoryOption) => {
      cy.get('select#category').should('contain.text', categoryOption);
    });
  });

  it('거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.', () => {
    DISTANCE_OPTIONS.forEach((distanceOption) => {
      cy.get('select#distance').should('contain.text', distanceOption);
    });
  });

  it('새로고침 시 이전에 추가한 새로운 음식점 정보는 유지된다.', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal-container').should('be.visible');

    cy.get('select#category').select('한식');
    cy.get('#name').type('기와집');
    cy.get('#distance').select('5분 내');
    cy.get('#description').type('50년 전통을 자랑하는 수육 맛집');
    cy.get('#link').type('https://techcourse.woowahan.com/');

    cy.get('button.button--primary').click();

    cy.get('.restaurant-list')
      .children()
      .should('have.length', RESTAURANT_DATA.length + 1);

    cy.reload();
    cy.get('.restaurant-list')
      .children()
      .should('have.length', RESTAURANT_DATA.length + 1);
  });
});
