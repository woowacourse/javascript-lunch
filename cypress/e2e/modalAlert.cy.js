import { VISIT_URL_CONSTANT } from './constants/visitUrl.js';
import { ERROR_MESSAGES } from '../../src/validation/validations.js';
import { TEST_CONSTANT } from './constants/testConstant.js';

describe('필수 입력 조건이 만족되지 않았을때, 모달창에서 추가하기 버튼을 클릭하면 Alert창을 띄운다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
    cy.get('.gnb__button').click();
  });

  describe('카테고리 필드 값이 올바르지 않으면 alert창을 띄운다.', () => {
    it('카테고리 필드가 선택되지 않으면 alert창을 띄운다.', () => {
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
  });

  describe('이름 필드 값이 올바르지 않으면 alert창을 띄운다.', () => {
    it('이름 필드 값이 없으면 alert창을 띄운다.', () => {
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
    it('이름 필드 값이 20자 이상이면 alert창을 띄운다.', () => {
      cy.get('#name').type(TEST_CONSTANT.WRONG_NAME);
      cy.get('#category').select(TEST_CONSTANT.CATEGORY);
      cy.get('#distance').select(TEST_CONSTANT.DISTANCE);

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('button')
        .contains('추가하기')
        .click()
        .then(() => {
          expect(alertStub).to.have.been.calledWith(ERROR_MESSAGES.INVALID_NAME_LENGTH);
        });
    });
  });

  describe('거리 필드 값이 올바르지 않으면 alert창을 띄운다.', () => {
    it('거리 필드가 선택되지 않으면 alert창을 띄운다.', () => {
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

  describe('설명 필드 값이 올바르지 않으면 alert창을 띄운다.', () => {
    it('설명 필드 값이 200자 이상이면 alert창을 띄운다.', () => {
      cy.get('#name').type(TEST_CONSTANT.NAME);
      cy.get('#category').select(TEST_CONSTANT.CATEGORY);
      cy.get('#distance').select(TEST_CONSTANT.DISTANCE);
      cy.get('#description').type(TEST_CONSTANT.WRONG_DESCRIPTION);

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('button')
        .contains('추가하기')
        .click()
        .then(() => {
          expect(alertStub).to.have.been.calledWith(ERROR_MESSAGES.INVALID_DESCRIPTION_LENGTH);
        });
    });
  });

  describe('링크 필드 값이 올바르지 않으면 alert창을 띄운다.', () => {
    it('링크 필드 값이 접두사로 http://나 https://를 갖지 않으면 alert창을 띄운다.', () => {
      cy.get('#name').type(TEST_CONSTANT.NAME);
      cy.get('#category').select(TEST_CONSTANT.CATEGORY);
      cy.get('#distance').select(TEST_CONSTANT.DISTANCE);
      cy.get('#link').type('dfsffsdfsaf');

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('button')
        .contains('추가하기')
        .click()
        .then(() => {
          expect(alertStub).to.have.been.calledWith(ERROR_MESSAGES.INVALID_LINK_FORMAT);
        });
    });
  });
});
