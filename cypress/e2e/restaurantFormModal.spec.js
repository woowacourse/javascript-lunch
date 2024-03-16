describe('restaurantFormModalInner 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
    cy.get('add-btn').click();
    cy.get('restaurant-form-inner').should('exist');
  });

  it(' 필수 입력값을 넣지 않으면 브라우저 유효성 검사 메세지가 띄워진다.', () => {
    cy.get('button[type=submit]').as('submitBtn');
    cy.get('@submitBtn').click();
    cy.get('input:invalid').each(($input) => {
      const validationMessage = $input[0].validationMessage;
      expect(validationMessage).to.not.be.empty;
    });
  });

  it('유효하지 않는 값을 넣으면 에러 메세지가 출력된다.', () => {
    cy.get('#restaurant-link').as('inputLink');
    cy.get('@inputLink').type('www.woowacourse.io/');
    cy.get('button[type=submit]').click();
    cy.get('form-text-field')
      .shadow()
      .find('error-message-box')
      .should('have.text', 'http/https로 시작되어야 합니다.');
  });

  it('유효한 값을 넣으면 에러 메세지가 출력되지 않는다.', () => {
    cy.get('#restaurant-link').as('inputLink');
    cy.get('@inputLink').type('https://www.woowacourse.io/');
    cy.get('button[type=submit]').click();
    cy.get('form-text-field')
      .shadow()
      .find('error-message-box')
      .should('have.text', '');
  });

  it('추가하기 버튼을 누르면 가게 정보가 홈에 추가된다.', () => {
    cy.get('#category-filter').select('chinese');
    cy.get('#restaurant-name').type('강성환 차이나');
    cy.get('#distance-filter').select('5');
    cy.get('button[type=submit]').click();

    cy.get('.restaurant__info__title').should('contain', '강성환 차이나');
  });

  it('취소하기 버튼을 누르면 모달이 닫힌다.', () => {
    cy.get('button[type=reset]').click();
    cy.get('restaurant-form-inner').should('not.exist');
  });
});
