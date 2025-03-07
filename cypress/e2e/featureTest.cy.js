describe('기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('사용자가 음식점 추가 모달을 열어, 모든 필드를 입력 후 음식점을 추가하는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').select('한식', { force: true });
    cy.get('#name').type('꺼벙이');
    cy.get('#distance').select('15분 내', { force: true });
    cy.get('#description').type('꺼벙이 분식');
    cy.get('#link').type('https://naver.com');

    cy.get('.button--primary').click();
    cy.get('.restaurant-list').should('contain', '꺼벙이');
  });

  it('사용자가 음식점 추가 모달을 열어, 필수 입력값만 입력 후 추가하기 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').select('한식', { force: true });
    cy.get('#name').type('꺼벙이');
    cy.get('#distance').select('15분 내', { force: true });

    cy.get('.button--primary').click();
    cy.get('.restaurant-list').should('contain', '꺼벙이');
  });

  it('사용자가 음식점 추가 모달을 연 후, 음식점 추가 중 취소하기 버튼을 클릭하여 음식점 추가를 취소하는 시나리오 테스트', () => {
    cy.get('.gnb__button').click();
    cy.get('.modal--open').should('exist');

    cy.get('#category').select('한식', { force: true });
    cy.get('#name').type('꺼벙이');
    cy.get('#distance').select('15분 내', { force: true });
    cy.get('#description').type('꺼벙이 분식');
    cy.get('#link').type('https://naver.com');

    cy.get('.button--secondary').click();
    cy.get('.modal--open').should('not.exist');
    cy.get('.restaurant-list').should('not.contain', '꺼벙이');
  });
});
