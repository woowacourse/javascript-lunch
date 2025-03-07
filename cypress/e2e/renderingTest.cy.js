import { IMAGE, RESTAURANTS } from '../../src/constants.js';

describe('Header 렌더링 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('헤더에서 점심 뭐먹지가 잘 렌더링 되는지 확인', () => {
    cy.get('.gnb').should('exist');
    cy.get('.gnb').contains('점심 뭐 먹지');
  });

  it('헤더에서 새로운 음식점 추가하기 버튼이 잘 렌더링 되는지 확인', () => {
    cy.get('.gnb__button').should('exist').and('be.visible');
    cy.get('.gnb__button img')
      .should('exist')
      .and('have.attr', 'src', './add-button.png')
      .and('have.attr', 'alt', '음식점 추가');
  });
});

describe('음식점 아이템 렌더링 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('아이템의 카테고리가 잘 렌더링 되는지 확인', () => {
    cy.get('.restaurant')
      .should('have.length', 6)
      .each(($li, index) => {
        cy.wrap($li).should('exist');
        cy.wrap($li).find('.restaurant__category').should('exist');
        cy.wrap($li)
          .find('.restaurant__category img')
          .should('exist')
          .and('have.attr', 'src', `${IMAGE.get(RESTAURANTS[index].category)}`)
          .and('have.attr', 'alt', `${RESTAURANTS[index].category}`);
      });
  });

  it('아이템의 정보가 잘 렌더링 되는지 확인', () => {
    cy.get('.restaurant')
      .should('have.length', 6)
      .each(($li, index) => {
        cy.wrap($li).find('.restaurant__info').should('exist');
        cy.wrap($li).find('.restaurant__name').should('exist').contains(`${RESTAURANTS[index].name}`);
        cy.wrap($li)
          .find('.restaurant__distance')
          .should('exist')
          .contains(`캠퍼스부터 ${RESTAURANTS[index].distance}`);
        cy.wrap($li).find('.restaurant__description').should('exist').contains(`${RESTAURANTS[index].description}`);
        cy.wrap($li).find('.restaurant__info a').should('exist').and('have.attr', 'href', `${RESTAURANTS[index].link}`);
      });
  });
});

describe('모달 렌더링 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('모달이 잘 렌더링 되는지 확인', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal').should('exist');
  });
});
