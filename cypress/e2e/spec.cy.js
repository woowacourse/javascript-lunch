import { RESTAURANT_ITEMS } from '../../public/restaurantData.js';

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
    cy.get('#distance').select('5').should('have.value', '5');
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
    cy.get('#distance').select('5');
    cy.get('#description').type('50년 전통을 자랑하는 수육 맛집');
    cy.get('#link').type('https://techcourse.woowahan.com/');

    cy.get('button.button--primary').click();
    cy.get('.modal-container').should('not.be.visible');

    cy.get('.restaurant-list')
      .children()
      .should('have.length', RESTAURANT_ITEMS.length + 1);
    cy.get('.restaurant-list').children().last().should('contain.text', '기와집');
  });

  it('새로고침 후에도 이전에 추가한 새로운 음식점 정보는 남아있다', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal-container').should('be.visible');

    cy.get('select#category').select('한식');
    cy.get('#name').type('기와집');
    cy.get('#distance').select('5');
    cy.get('#description').type('50년 전통을 자랑하는 수육 맛집');
    cy.get('#link').type('https://techcourse.woowahan.com/');

    cy.get('button.button--primary').click();

    cy.get('.restaurant-list')
      .children()
      .should('have.length', RESTAURANT_ITEMS.length + 1);

    cy.reload();
    cy.get('.restaurant-list')
      .children()
      .should('have.length', RESTAURANT_ITEMS.length + 1);
    cy.get('.restaurant-list').children().last().should('contain.text', '기와집');
  });

  it('카테고리 기반 필터링이 작동한다', () => {
    cy.get('select#category-filter').select('한식');
    cy.get('.restaurant-list')
      .children()
      .each((item) => {
        cy.wrap(item).should('contain.text', '피양콩');
      });

    cy.get('select#category-filter').select('중식');
    cy.get('.restaurant-list')
      .children()
      .each((item) => {
        cy.wrap(item).should('contain.text', '친친');
      });
  });

  it('정렬 필터링이 작동한다', () => {
    cy.get('select#sorting-filter').select('distance');
    cy.get('.restaurant-list').children().first().should('contain.text', '5');

    cy.get('select#sorting-filter').select('name');
    cy.get('.restaurant-list').children().first().should('contain.text', '도스타코스');
  });

  it('탭 전환에 따른 음식점 목록 갱신', () => {
    cy.get('.restaurant-list').children().first().find('.restaurant__star').click();

    cy.get('.tab-item').contains('자주 가는 음식점').click();

    cy.get('.restaurant-list').should('exist');

    cy.get('.tab-item').contains('모든 음식점').click();

    cy.get('.restaurant-list').should('exist');
  });

  it('새로 고침 후에도 자주 가는 음식점 존재', () => {
    cy.get('.restaurant-list').children().first().find('.restaurant__star').click();

    cy.get('.tab-item').contains('자주 가는 음식점').click();

    cy.get('.restaurant-list').should('exist');

    cy.get('.tab-item').contains('모든 음식점').click();

    cy.get('.restaurant-list').should('exist');

    cy.reload();
    cy.get('.tab-item').contains('자주 가는 음식점').click();

    cy.get('.restaurant-list').should('exist');
  });
});
