import { VALIDATOR_CONSTANTS } from '../../src/constants';

describe('음식점 추가 모달 테스트', () => {
  beforeEach(() => {
    cy.lunchWebVisit();
    cy.get('.gnb__button').click();
  });

  it('헤더에 추가하기 아이콘을 누르면 음식점 추가하는 모달창이 떠야한다.', () => {
    cy.get('.modal').should('have.class', 'modal--open');
  });

  it('필수 입력값들이 다 채워지지 않으면 등록하기 버튼은 비활성화된다.', () => {
    cy.get('#submitButton').should('be.disabled');

    cy.get('#category').select('한식');
    cy.get('#distance').select('5분 내');

    cy.get('#submitButton').should('be.disabled');
  });

  it('이름 길이가 15자를 초과하면 등록하기 버튼은 비활성화된다.', () => {
    cy.get('#name').type('긴 이름을 가진 새로운 음식점'); // NOTE: 16자 이름
    cy.get('#category').select('한식');
    cy.get('#distance').select('5분 내');

    cy.get('#submitButton').should('be.disabled');
  });

  it('이름 길이가 15자를 초과하면 이름폼 밑에 툴팁이 보여진다.', () => {
    cy.get('#name').type('긴 이름을 가진 새로운 음식점'); // NOTE: 16자 이름
    cy.get('#name-tooltip').should('have.class', 'tooltip--show');
  });

  it('이름 길이가 15자를 초과하지 않으면 이름폼 밑에 툴팁이 사라진다.', () => {
    cy.get('#name').type('김밥천국'); // NOTE: 4자 이름
    cy.get('#name-tooltip').should('not.have.class', 'tooltip--show');
  });

  it('설명 길이가 150자를 초과하면 등록하기 버튼은 비활성화된다.', () => {
    const longDescription = 'a'.repeat(VALIDATOR_CONSTANTS.DESCRIPTION_MAX_LENGTH + 1);
    cy.get('#description').type(longDescription);
    cy.get('#name').type('음식점');
    cy.get('#category').select('한식');
    cy.get('#distance').select('5분 내');

    cy.get('#submitButton').should('be.disabled');
  });

  it('참고 링크가 url형식이 아니면 브라우저 유효성 검사 메세지가 띄워진다.', () => {
    cy.get('#link').type('이것은url이아님');
    cy.get('#link').then((elements) => {
      const element = elements[0];
      expect(element.validationMessage).to.contain('URL을 입력하세요.');
    });
  });

  it('닫기 버튼을 누르면 모달창이 닫힌다.', () => {
    cy.get('#cancelButton').click();
    cy.get('.modal').should('not.have.class', 'modal--open');
  });

  it('모달딤을 누르면 모달창이 닫힌다.', () => {
    cy.get('.modal-backdrop').click({ force: true });
    cy.get('.modal').should('not.have.class', 'modal--open');
  });
});
