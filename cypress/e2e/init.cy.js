import { TEST_CONSTANT } from './constants/testConstant';
import { VISIT_URL_CONSTANT } from './constants/visitUrl';

describe('초기 음식점 목록 페이지를 디자인 화면과 같이 구성한다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
  });

  it('헤더가 있어야 한다.', () => {
    cy.get('header').should('be.visible');
  });

  it('리스트가 있어야 한다', () => {
    cy.get('.restaurant-list').should('be.visible');
  });

  it('리스트 안에 아이템이 있어야 한다.', () => {
    cy.get('.restaurant').should('be.visible');
  });
});

describe('새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.', () => {
  it('새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.', () => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
    cy.get('.gnb__button').click();
    cy.get('#category').select(TEST_CONSTANT.CATEGORY);
    cy.get('#name').type(TEST_CONSTANT.NAME);
    cy.get('#distance').select(TEST_CONSTANT.DISTANCE);

    cy.get('button').contains('추가하기').click();
    cy.get('li').contains(TEST_CONSTANT.NAME);
    cy.reload();
    cy.get('li').should('not.contain', TEST_CONSTANT.NAME);
  });
});
