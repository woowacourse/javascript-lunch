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
