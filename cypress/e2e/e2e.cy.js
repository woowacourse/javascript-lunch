import { TEST_CONSTANT } from './constants/testConstant';
import { VISIT_URL_CONSTANT } from './constants/visitUrl';
import { ERROR_MESSAGES } from '../../src/Domain/validation/validations';

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

  describe('사용자가 모달창의 필수 입력 항목을 입력하지 않고 추가 버튼을 누르면 오류 메시지를 확인할 수 있다.', () => {
    beforeEach(() => {
      cy.get('.gnb__button').click();
      cy.get('.modal--open').should('exist');
    });

    it('사용자가 카테고리를 입력하지 않고 추가 버튼을 누르면 오류 메시지를 확인할 수 있다.', () => {
      cy.get('#name').type(TEST_CONSTANT.NAME);
      cy.get('#distance').select(TEST_CONSTANT.DISTANCE);

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('button')
        .contains('추가하기')
        .click()
        .then(() => {
          expect(alertStub).to.have.been.calledWith(ERROR_MESSAGES.NOT_SELECTED('카테고리'));
        });
    });

    it('사용자가 이름을 입력하지 않고 추가 버튼을 누르면 오류 메시지를 확인할 수 있다.', () => {
      cy.get('#category').select(TEST_CONSTANT.CATEGORY);
      cy.get('#distance').select(TEST_CONSTANT.DISTANCE);

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('button')
        .contains('추가하기')
        .click()
        .then(() => {
          expect(alertStub).to.have.been.calledWith(ERROR_MESSAGES.IS_BLANK);
        });
    });

    it('사용자가 거리를 입력하지 않고 추가 버튼을 누르면 오류 메시지를 확인할 수 있다.', () => {
      cy.get('#name').type(TEST_CONSTANT.NAME);
      cy.get('#category').select(TEST_CONSTANT.CATEGORY);
      cy.get('#link').type(TEST_CONSTANT.LINK);

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('button')
        .contains('추가하기')
        .click()
        .then(() => {
          expect(alertStub).to.have.been.calledWith(ERROR_MESSAGES.NOT_SELECTED('거리'));
        });
    });
  });
});
