import { DISTANCE_FROM_CAMPUS } from '@/constants/Condition';
import { ERROR_ID, ERROR_MESSAGE } from '@/constants/Message';

describe('새 음식점 추가 모달 테스트', () => {
  const NEW_RESTAURANT = {
    name: '아웃백',
    category: '양식',
    distance: '20',
    description: '호주 컨셉의 미국의 외식업체이다.',
    link: 'https://www.naver.com',
  };

  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('처음 홈페이지를 음식점 모달이 보이지 않는다.', () => {
    cy.get('#add-modal').should('not.be.visible');
  });

  it('헤더의 추가 버튼을 누르면 음식점 모달이 보인다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    $addModalButton.click();
    cy.get('#add-modal').should('have.class', 'modal--open');
  });

  it('음식점 추가 모달에는 카테고리, 이름, 거리, 설명, 링크 인풋이 있다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');

    $addModalButton.click();
    $addModal.then((modal) => {
      cy.wrap(modal).find('#category');
      cy.wrap(modal).find('#name');
      cy.wrap(modal).find('#distance');
      cy.wrap(modal).find('#description');
      cy.wrap(modal).find('#link');
    });
  });

  it('음식점 추가 모달의 취소하기 버튼을 누르면 모달이 보이지 않는다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');

    $addModalButton.click();

    const $cancelButton = $addModal.get('button').contains('취소하기');
    $cancelButton.click();
    cy.get('#add-modal').should('have.not.class', 'modal--open');
  });

  it('선택 속성이 아닌 필수 속성을 모두 입력하고 음식점 추가 모달의 추가하기 버튼을 누르면 음식점이 추가된다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);

    $addButton.click();

    cy.get('#add-modal').should('have.not.class', 'modal--open');
    const target = cy.get('.restaurant').contains(NEW_RESTAURANT.name);
    target.parent().find('.restaurant__name').should('text', NEW_RESTAURANT.name);
    target
      .parent()
      .parent()
      .find('.restaurant__distance')
      .should('text', DISTANCE_FROM_CAMPUS(Number(NEW_RESTAURANT.distance)));
  });

  it('필수 속성을 빠트리면 에러 메세지가 생성되고, 모달이 닫히지 않고, 음식점 추가가 되지 않는다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addButton.click();

    cy.get('#add-modal').should('have.class', 'modal--open');
    cy.get('#category-error').should('text', ERROR_MESSAGE.NOT_VALID_CATEGORY);
    cy.get('#distance-error').should('text', ERROR_MESSAGE.NOT_VALID_DISTANCE);

    cy.get('.restaurant-list').contains(NEW_RESTAURANT.name).should('not.exist');
  });

  it('유효하지 않은 링크를 입력하면 추가가 되지 않는다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    const description =
      '호주식 영어로 오지를 뜻하는 Outback이란 명칭을 쓰는데다가 식당 내부를 호주식으로 꾸며 놓는 경우가 많기 때문에 호주에 본거지를 둔 식당으로 보이기도 하나, 미국의 외식업체이다.';

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);
    $addModal.get('#description').type(description);
    $addModal.get('#link').type('bad-link-input');

    $addButton.click();

    cy.get('#add-modal').should('have.class', 'modal--open');
    cy.get('#link-error').should('text', ERROR_MESSAGE.NOT_VALID_LINK);

    cy.get('.restaurant-list').contains(NEW_RESTAURANT.name).should('not.exist');
  });

  it('모든 속성을 입력하고, 음식점 추가 모달의 추가하기 버튼을 누르면 음식점이 추가된다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);
    $addModal.get('#description').type(NEW_RESTAURANT.description);
    $addModal.get('#link').type(NEW_RESTAURANT.link);

    $addButton.click();

    cy.get('#add-modal').should('have.not.class', 'modal--open');
    const target = cy.get('.restaurant').contains(NEW_RESTAURANT.name);
    target.parent().find('.restaurant__name').should('text', NEW_RESTAURANT.name);
    target
      .parent()
      .parent()
      .find('.restaurant__distance')
      .should('text', DISTANCE_FROM_CAMPUS(Number(NEW_RESTAURANT.distance)));
    target
      .parent()
      .parent()
      .find('.restaurant__description')
      .should('text', NEW_RESTAURANT.description);
  });

  it('모달의 배경을 누르면 추가 모달이 닫힌다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    $addModalButton.click();

    cy.get('#add-modal').should('have.class', 'modal--open');

    const $backdrop = cy.get('#add-modal').find('.modal-backdrop').first();
    $backdrop.click({ force: true });

    cy.get('#add-modal').should('have.not.class', 'modal--open');
  });

  it('모달에서 폼을 작성하고 취소하기를 누른 뒤 모달을 다시 열면 인풋이 초기화 되어있다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);

    const $cancelButton = $addModal.get('button').contains('취소하기');
    $cancelButton.click();

    $addModalButton.click();
    cy.get('#category').should('have.value', '선택해주세요');
    cy.get('#name').should('have.value', '');
    cy.get('#distance').should('have.value', '선택해주세요');
  });

  it('모달에서 폼을 작성하고 배경을 눌러서 모달을 끈다음 모달을 다시 열면 인풋이 유지된다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);

    const $backdrop = cy.get('#add-modal').find('.modal-backdrop').first();
    $backdrop.click({ force: true });

    $addModalButton.click();
    cy.get('#category').should('have.value', NEW_RESTAURANT.category);
    cy.get('#name').should('have.value', NEW_RESTAURANT.name);
    cy.get('#distance').should('have.value', NEW_RESTAURANT.distance);
  });

  it('이름을 10자 이상 넘기지 못한다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    cy.get('#name').type('a'.repeat(20));
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);

    $addButton.click();
    cy.get('.restaurant__name').should('text', 'a'.repeat(10));
  });

  it('설명을 300자 이상 넘기지 못한다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);
    $addModal.get('#description').type('a'.repeat(400));

    $addButton.click();
    cy.get('.restaurant__description').should('text', 'a'.repeat(300));
  });

  it('중복되는 이름의 음식점을 입력하면 에러메세지가 뜨고 추가되지 않는다.', () => {
    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');
    const $addButton = cy.get('#add-button');

    $addModalButton.click();

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);

    $addButton.click();

    $addModalButton.click();

    $addModal.get('#category').select(NEW_RESTAURANT.category);
    $addModal.get('#name').type(NEW_RESTAURANT.name);
    $addModal.get('#distance').select(NEW_RESTAURANT.distance);
    $addButton.click();

    cy.get('.restaurant__name').should('length', 1);
    cy.get('.modal-container').should('be.visible');
    cy.get(`#${ERROR_ID('name')}`).should('have.text', ERROR_MESSAGE.DUPLICATE_NAME);
  });
});
