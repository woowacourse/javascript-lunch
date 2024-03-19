describe('새로운 식당 등록 테스트', () => {
  const category = '일식';
  const name = '장정정';
  const distance = '10';
  const description = '일식 맛집입니다.';
  const link = 'https://naver.me/x6PU1WUM';

  beforeEach(() => {
    cy.viewport('iphone-xr'); // 모바일 화면으로 설정
    cy.visit('/');
  });

  it('식당 등록 버튼 클릭 시 식당 등록 모달이 열려야 한다.', () => {
    // when
    cy.get('.gnb__button').click();

    // then
    cy.get('.register-modal--open').should('exist');
  });

  it('식당 등록 모달에서 새로운 식당을 등록한다.', () => {
    // given
    cy.get('.gnb__button').click();

    // when
    cy.get('#category').select(category);
    cy.get('#name').type(name);
    cy.get('#distance').select(distance);
    cy.get('#description').type(description);
    cy.get('#link').type(link);

    cy.get('.register-button--submit').click();

    // then
    cy.get('lunch-items')
      .find('lunch-item')
      .first()
      .within(() => {
        cy.contains(name).should('exist');
        cy.contains(category).should('exist');
        cy.contains(distance).should('exist');
        cy.contains(description).should('exist');
      });
  });

  it('식당 등록 모달에서 필수값을 하나라도 입력하지 않으면 새로운 식당이 등록되지 않는다.', () => {
    // given
    cy.get('lunch-items[liked=false]')
      .find('lunch-item')
      .its('length')
      .should('be.a', 'number')
      .then((length) => {
        const expectedItemsCount = length;

        cy.get('.gnb__button').click();

        // when
        cy.get('#category').select(category);
        cy.get('#name').type(name);

        cy.get('.register-button--submit').click();

        // then
        cy.get('lunch-items[liked=false]')
          .find('lunch-item')
          .its('length')
          .should('equal', expectedItemsCount);
      });
  });
});
