describe('음식점 추가 테스트', () => {
  it('음식점 추가 모달과 관련된 e2e 테스트', () => {
    cy.visit('http://localhost:8080/');

    cy.get('.gnb__button').click();
    cy.get('.modal-container').should('be.visible');

    cy.contains('취소하기').click();
    cy.get('.restaurant-list-container').should('be.visible');

    cy.get('.gnb__button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('꺼벙이분식');
    cy.get('#distance').select('5');
    cy.get('#description').type('돈까스 김밥과 묵은지 참치 김밥이 미쳤어요.');
    cy.get('#link').type(
      'https://map.naver.com/p/search/%EA%BA%BC%EB%B2%99%EC%9D%B4%EB%B6%84%EC%8B%9D/place/166513463?placePath=?entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh',
    );
    cy.contains('추가하기').click();
    cy.contains('꺼벙이분식').should('exist');
  });
});
