import { TEST_CONSTANT } from './constants/testConstant';
import { VISIT_URL_CONSTANT } from './constants/visitUrl';
describe('모달창이 뜨면 입력 내용들이 뜬다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
    cy.get('.gnb__button').click();
  });

  it('음식점의 카테고리 선택창이 있어야 한다.', () => {
    cy.get('#category').should('exist');
  });

  it('음식점의 이름 입력창이 있어야 한다', () => {
    cy.get('#name').should('exist');
  });

  it('음식점의 거리 선택창이 있어야 한다.', () => {
    cy.get('#distance').should('exist');
  });

  it('음식점의 설명 입력창이 있어야 한다.', () => {
    cy.get('#description').should('exist');
  });

  it('음식점의 참고 링크 입력창이 있어야 한다.', () => {
    cy.get('#link').should('exist');
  });
});

describe('모달창을 닫을 수 있다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
    cy.get('.gnb__button').click();
  });

  it('모달창에서 취소하기 버튼을 클릭하면 모달창을 닫을 수 있다.', () => {
    cy.contains('취소하기').click();
    cy.get('.modal').should('not.have.class', '.modal--open');
  });

  it('모달창에서 esc 키를 누르면 모달창을 닫을 수 있다.', () => {
    cy.get('body').type('{esc}');
    cy.get('.modal').should('not.have.class', '.modal--open');
  });

  it('모달창에서 modal-backdrop을 클릭하면 모달창을 닫을 수 있다.', () => {
    cy.get('.modal-backdrop').click({ force: true });
    cy.get('.modal').should('not.have.class', '.modal--open');
  });
});

describe('필수 입력 조건이 만족됐을 때, 모달창에서 추가하기 버튼을 클릭하면 새로운 음식점을 추가할 수 있다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
    cy.get('.gnb__button').click();
  });

  it('카테고리, 이름, 거리를 작성하면 새로운 아이템이 추가된다.', () => {
    cy.get('#category').select(TEST_CONSTANT.CATEGORY);
    cy.get('#name').type(TEST_CONSTANT.NAME);
    cy.get('#distance').select(TEST_CONSTANT.DISTANCE);

    cy.get('button').contains('추가하기').click();
    const restaurantDiv = cy.get('li').contains(TEST_CONSTANT.NAME);
    restaurantDiv.get('div').contains(TEST_CONSTANT.CATEGORY);
    restaurantDiv.get('div').contains(TEST_CONSTANT.NAME);
    restaurantDiv.get('div').contains(TEST_CONSTANT.DISTANCE);
  });

  it('카테고리, 이름, 거리, 설명을 작성하면 새로운 아이템이 추가된다.', () => {
    cy.get('#category').select(TEST_CONSTANT.CATEGORY);
    cy.get('#name').type(TEST_CONSTANT.NAME);
    cy.get('#distance').select(TEST_CONSTANT.DISTANCE);
    cy.get('#description').type(TEST_CONSTANT.DESCRIPTION);

    cy.get('button').contains('추가하기').click();
    const restaurantDiv = cy.get('li').contains(TEST_CONSTANT.NAME);
    restaurantDiv.get('div').contains(TEST_CONSTANT.CATEGORY);
    restaurantDiv.get('div').contains(TEST_CONSTANT.NAME);
    restaurantDiv.get('div').contains(TEST_CONSTANT.DISTANCE);
    restaurantDiv.get('div').contains(TEST_CONSTANT.DESCRIPTION);
  });

  it('카테고리, 이름, 거리, 참고 링크를 작성하면 새로운 아이템이 추가된다.', () => {
    cy.get('#category').select(TEST_CONSTANT.CATEGORY);
    cy.get('#name').type(TEST_CONSTANT.NAME);
    cy.get('#distance').select(TEST_CONSTANT.DISTANCE);
    cy.get('#link').type(TEST_CONSTANT.LINK);

    cy.get('button').contains('추가하기').click();
    const restaurantDiv = cy.get('li').contains(TEST_CONSTANT.NAME);
    restaurantDiv.get('div').contains(TEST_CONSTANT.CATEGORY);
    restaurantDiv.get('div').contains(TEST_CONSTANT.NAME);
    restaurantDiv.get('div').contains(TEST_CONSTANT.DISTANCE);
  });

  it('카테고리, 이름, 거리, 설명, 참고 링크를 작성하면 새로운 아이템이 추가된다', () => {
    cy.get('#category').select(TEST_CONSTANT.CATEGORY);
    cy.get('#name').type(TEST_CONSTANT.NAME);
    cy.get('#distance').select(TEST_CONSTANT.DISTANCE);
    cy.get('#description').type(TEST_CONSTANT.DESCRIPTION);
    cy.get('#link').type(TEST_CONSTANT.LINK);

    cy.get('button').contains('추가하기').click();
    const restaurantDiv = cy.get('li').contains(TEST_CONSTANT.NAME);
    restaurantDiv.get('div').contains(TEST_CONSTANT.CATEGORY);
    restaurantDiv.get('div').contains(TEST_CONSTANT.NAME);
    restaurantDiv.get('div').contains(TEST_CONSTANT.DISTANCE);
    restaurantDiv.get('div').contains(TEST_CONSTANT.DESCRIPTION);
  });
});
