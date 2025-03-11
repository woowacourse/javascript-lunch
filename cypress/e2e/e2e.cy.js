import { TEST_CONSTANT } from './constants/testConstant';
import { VISIT_URL_CONSTANT } from './constants/visitUrl';

describe('사용자가 음식점 목록 페이지에서 음식점 추가 기능을 사용할 수 있다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
  });

  it('사용자가 음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄운다.', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');
  });
  
  it('사용자가 모달 창을 닫을 수 있다.', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');
    cy.get('button').contains('취소하기').click();
    cy.get('.modal--open').should('not.exist');
  });

  it('사용자가 모달창의 필수 입력 항목을 입력한 후 추가 버튼을 누르면 음식점 목록에 추가된다.', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').select(TEST_CONSTANT.CATEGORY);
    cy.get('#name').type(TEST_CONSTANT.NAME);
    cy.get('#distance').select(TEST_CONSTANT.DISTANCE);

    cy.get('button').contains('추가하기').click();
    cy.get('li').contains(TEST_CONSTANT.NAME);
  });
});