import { defaultRestaurantData, newRestaurantData } from '../fixtures/testRestaurantData';

const SELECTORS = require('../constants/selectors');

describe('음식점 추가하기 모달 테스트', () => {
  beforeEach(() => {
    cy.saveRestaurants(defaultRestaurantData).then(() => cy.visitHome());
    cy.openRestaurantAddModal();
  });

  it('앱 상단 네비게이션 우측의 버튼을 누르면 음식점 추가하기 모달이 나타난다.', () => {
    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.modal).should('have.attr', 'open');
  });

  it('음식점 추가하기 모달에는 이름, 카테고리, 거리, 설명, 참고URL을 입력할 수 있는 영역이 있다.', () => {
    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.modal).then((addRestaurantModal) => {
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.nameInput).should('exist');
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.categoryInput).should('exist');
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.distanceByWalkInput).should('exist');
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.descriptionInput).should('exist');
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.referenceUrlInput).should('exist');
    });
  });

  it('전체 입력값이 입력된 상태에서 "추가하기" 버튼을 누르면 새 음식점이 추가되고 모달이 닫힌다.', () => {
    cy.fillRestaurantAddForm(newRestaurantData);
    cy.submitRestaurantAddForm();

    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.modal).should('not.have.attr', 'open');

    cy.selectTab('all');
    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.restaurantList).should('contain', newRestaurantData.name);
  });

  it('필수 입력값만 입력된 상태에서 "추가하기" 버튼을 누르면 새 음식점이 추가되고 모달이 닫힌다.', () => {
    cy.fillRestaurantAddFormRequiredOnly(newRestaurantData);
    cy.submitRestaurantAddForm();

    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.modal).should('not.have.attr', 'open');

    cy.selectTab('all');
    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.restaurantList).should('contain', newRestaurantData.name);
  });

  it('음식점 추가 모달의 하단 좌측에 있는 "취소하기" 버튼을 누르면 모달이 닫힌다.', () => {
    cy.cancelRestaurantAddForm();
    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.modal).should('not.have.attr', 'open');
  });

  it('모달의 배경 영역, 즉 모달의 바깥 영역을 누르면 모달이 닫힌다.', () => {
    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.modal).click({ force: true });
    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.modal).should('have.not.attr', 'open');
  });

  it('"취소하기" 버튼을 눌러 닫은 모달을 다시 열면 입력값이 초기화되어 있어야 한다.', () => {
    cy.fillRestaurantAddForm(newRestaurantData);
    cy.cancelRestaurantAddForm();

    cy.openRestaurantAddModal();

    cy.get(SELECTORS.RESTAURANT_ADD_MODAL.modal).then((addRestaurantModal) => {
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.nameInput).should('have.value', '');
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.categoryInput).should('have.value', '');
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.distanceByWalkInput).should('have.value', '');
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.descriptionInput).should('have.value', '');
      cy.wrap(addRestaurantModal).find(SELECTORS.RESTAURANT_ADD_MODAL.referenceUrlInput).should('have.value', '');
    });
  });
});
