import { categoryOptions, distanceOptions, restaurantItems } from '../../public/restaurantData.js';

describe('식당 리스트 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.viewport(1280, 1000);
  });

  it('음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄운다', () => {
    cy.get('.modal-container').should('not.be.visible');
    cy.get('.gnb__button').click();

    cy.get('.modal-container').should('be.visible');
    cy.get('select#category').should('be.visible');
    cy.get('#name').should('be.visible');
    cy.get('#distance').should('be.visible');
    cy.get('#description').should('be.visible');
    cy.get('#link').should('be.visible');
  });

  it('음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력할 수 있다', () => {
    cy.get('.gnb__button').click();

    cy.get('select#category').should('exist');
    cy.get('#name').should('exist');
    cy.get('#distance').should('exist');
    cy.get('#description').should('exist');
    cy.get('#link').should('exist');

    cy.get('select#category').select('한식').should('have.value', '한식');
    cy.get('#name').type('기와집').should('have.value', '기와집');
    cy.get('#distance').select('5분 내').should('have.value', '5분 내');
    cy.get('#description')
      .type('50년 전통을 자랑하는 수육 맛집')
      .should('have.value', '50년 전통을 자랑하는 수육 맛집');
    cy.get('#link')
      .type('https://techcourse.woowahan.com/')
      .should('have.value', 'https://techcourse.woowahan.com/');
  });

  it('음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력하여 음식점을 추가 할 수 있다', () => {
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
      .should('have.length', restaurantItems.length + 1);
    cy.get('.restaurant-list').children().last().should('contain.text', '기와집');
  });

  it('카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다', () => {
    categoryOptions.forEach((categoryOption) => {
      cy.get('select#category').should('contain.text', categoryOption);
    });
  });

  it('거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다', () => {
    distanceOptions.forEach((distanceOption) => {
      cy.get('select#distance').should('contain.text', distanceOption);
    });
  });

  it('새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다', () => {
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
      .should('have.length', restaurantItems.length + 1);

    cy.reload();
    cy.get('.restaurant-list').children().should('have.length', restaurantItems.length);
  });
});
