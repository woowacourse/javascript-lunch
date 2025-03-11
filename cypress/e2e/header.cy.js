import { VISIT_URL_CONSTANT } from './constants/visitUrl';

describe('음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄운다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
    cy.get('.gnb__button').click();
  });

  it('모달창이 있어야 한다.', () => {
    cy.get('.modal--open').should('exist');
  });
});
