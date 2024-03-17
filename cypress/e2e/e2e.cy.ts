describe('점심 뭐먹지 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport('macbook-13');
  });

  it('음식점 등록 시 음식점 목록에 추가되어 길이가 6개에서 7개가 된다.', () => {
    cy.get('.gnb__button').click();

    cy.get('#category').select('한식').should('have.value', '한식');
    cy.get('#name').type('e2e 테스트!!!!!!');
    cy.get('#distance').select('10분 내').should('have.value', '10');
    cy.get('#description').type('안녕하세요 리뷰어님! 잘부탁드립니다!!!');
    cy.get('#link').type('https://github.com/rbgksqkr');
    cy.get('#button-add').click();

    cy.get('.restaurant-list').find('li').should('have.length', 7);
  });
});
