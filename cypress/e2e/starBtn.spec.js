describe('starBtn 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('like 값이 false일 경우, 좋아요 버튼을 클릭하면 like의 값이 true가 된다.', () => {
    cy.get('star-btn').as('likeBtn');
    cy.get('@likeBtn').click({ multiple: true });
    cy.get('@likeBtn').should('have.attr', 'islike', 'true');
  });

  it('like 값이 true일 경우, 좋아요 버튼을 클릭하면 like의 값이 false가 된다.', () => {
    cy.get('star-btn').as('likeBtn');
    cy.get('@likeBtn').click({ multiple: true });
    cy.get('@likeBtn').click({ multiple: true });
    cy.get('@likeBtn').should('have.attr', 'islike', 'false');
  });
});
