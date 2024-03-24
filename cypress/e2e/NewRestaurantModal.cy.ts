describe('새 레스토랑 추가 모달 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport('macbook-13');
  });

  it('음식점 추가 버튼을 눌렀을 때, 모달이 표시된다.', () => {
    const ADD_BUTTON_SELECTOR = 'body > div.gnb > button';
    const MODAL_SELECTOR = '.new-restaurant-modal-item';

    cy.get(ADD_BUTTON_SELECTOR).click();

    cy.get(MODAL_SELECTOR).should('be.visible');
  });

  describe('필수 입력항목을 입력하지않고 제출했을때', () => {
    const REQUIRED_INPUTS = [
      { name: '카테고리', boxSelector: '.new-restaurant-modal-item .category-select' },
      { name: '이름', boxSelector: '.new-restaurant-modal-item .name-input-box' },
      { name: '거리', boxSelector: '.new-restaurant-modal-item .distance-select' },
    ];

    REQUIRED_INPUTS.forEach(({ name, boxSelector }) => {
      it(`${name}를 입력하지 않고 제출했을 때, 에러문구를 표시한다.`, () => {
        cy.get('body > div.gnb > button').click();

        cy.get('.new-restaurant-form .button-container button[type="submit"]').click();

        cy.get(`${boxSelector} .error`).should('be.visible');
      });
    });
  });

  it('음식점을 추가하였을 때, 새 음식점이 추가된다.', () => {
    cy.get('.gnb > button').click();

    cy.get('.new-restaurant-modal-item .category-input').select('중식');
    cy.get('.new-restaurant-form__name-input').type('테스트용 맛있는 음식점');
    cy.get('.new-restaurant-modal-item .distance-input').select('5');
    cy.get('.new-restaurant-form__submit-button').click();

    cy.get('.restaurant__name').contains('테스트용 맛있는 음식점');
  });
});
