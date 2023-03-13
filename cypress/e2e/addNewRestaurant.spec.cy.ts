import LOCALSTORAGE_SAMPLE_DATA from "../utils/localStorageSampleData";

const fillForm = ({ category, name, estimatedTime, description, link }) => {
  cy.get('#category')
    .select(category);

  cy.get('#name')
    .type(name);

  cy.get('#distance')
    .select(estimatedTime);

  cy.get('#description')
    .type(description);

  cy.get('#link')
    .type(link);
};

describe('새로운 음식점 추가 테스트', () => {
  it('음식점 추가 버튼 클릭 시 모달이 열려야 한다.', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');
    
    cy.get('.gnb__button')
      .click();

    cy.get('#new-restaurant-input .modal-container')
      .should('be.visible');
  });

  it('음식점 추가 성공', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');
    
    cy.get('.gnb__button')
      .click();

    fillForm({
      category: '양식',
      name: '파리바게트',
      estimatedTime: '15',
      description: '파리바게트 vs 서울김치',
      link: ' ',
    });

    cy.get('#new-restaurant-input .button--primary')
      .click();

    cy.get('.restaurant-list-container')
      .should('contain', '파리바게트');
  });

  it('음식점 이름 입력을 공백으로 할 시 알림 출력', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');
    
    cy.get('.gnb__button')
      .click();

    fillForm({
      category: '양식',
      name: ' ',
      estimatedTime: '15',
      description: '파리바게트 vs 서울김치',
      link: ' ',
    });

    cy.get('#new-restaurant-input')
      .should('contain', '이름을 입력해 주세요');
  });

  it('음식점 이름 입력을 공백으로 하고 다시 제대로 채우면 알림 숨김', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');
    
    cy.get('.gnb__button')
      .click();

    fillForm({
      category: '양식',
      name: ' ',
      estimatedTime: '15',
      description: '파리바게트 vs 서울김치',
      link: ' ',
    });

    cy.get('#name')
      .type('파리바게트')
      .blur();
    
    cy.get('#new-restaurant-input')
      .should("not.contain", "이름을 입력해 주세요");
  });

  it('양식에서 아시안 입력 성공 시 카테고리 전환 모달로 전체 카테고리로 변환', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');

    cy.get('#category-filter')
      .select('양식');

    cy.get('.gnb__button')
      .click();

    fillForm({
      category: '아시안',
      name: '쌀국수',
      estimatedTime: '20',
      description: '뚝배기',
      link: 'https://www.naver.com',
    });

    cy.get('#new-restaurant-input .button--primary')
      .click();

    cy.get('#input-success-modal .button--primary')
      .should('be.visible')
      .click();

    cy.get('.restaurant-list-container')
      .should('contain', '쌀국수');
  });
})
