const TEST_URL = 'http://localhost:8081/';

describe('새로운 음식점 추가 모달', () => {
  context('1280*720 viewport', () => {
    beforeEach('beforeEach', () => {
      cy.visit(TEST_URL);
      cy.viewport(1280, 720);
    });

    it('음식점 추가 버튼을 클릭하면 새로운 음식점 모달창이 보인다.', () => {
      cy.get('.gnb__button').click();
      cy.contains('새로운 음식점');
    });

    it('음식점 추가 모달의 취소하기 버튼을 누르면 모달창이 닫힌다.', () => {
      cy.get('.gnb__button').click();
      cy.get('#cancel-modal-button').click();
      cy.get('.modal').should('not.be.visible');
    });

    it('음식점 추가 모달을 통해 새로운 음식점을 추가하면 음식점 리스트에 보인다.', () => {
      cy.get('.gnb__button').click();
      cy.get('#category').select('한식');
      cy.get('#name').type('가정식 한상');
      cy.get('#distance').select('10');
      cy.get('#description').type('가정에서 먹던 한식');
      cy.get('#link').type('https://naver.com');
      cy.get('#submit-modal-button').click();
      cy.get('#app').contains('가정식 한상');
    });
  });
});
