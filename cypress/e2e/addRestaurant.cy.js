describe('레스토랑 추가 테스트 ㅎ ㅎ', () => {
  it('필수 입력값을 채우고, 추가하기 버튼을 누르면 음식점이 추가된다.', () => {
    cy.visit('http://localhost:5173');
    cy.get('.gnb__button').click();

    cy.get('#category').select(1);
    cy.get('#name').type('재영이');
    cy.get('#distance').select(1);
    cy.get('#description').type('재영이가 좋아하는 재영이 맛집');
    cy.get('#link').type('https://naver.com');

    cy.get('form').submit();
    cy.get('.restaurant-list > li:last-child .restaurant__name').should('have.text', '재영이');
  });
});
