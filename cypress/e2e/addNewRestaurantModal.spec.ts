describe('모달에서 새로운 레스토랑을 등록할때의 테스트', () => {
  it('헤더의 모달 아이콘 버튼을 누르면 모달창이 열린다.', () => {
    cy.visitMainPage();

    cy.get('.gnb__button').click();

    cy.get('.modal').should('have.class', 'modal--open');
  });

  it('유효한 음식점을 추가하면 모달이 제거 된다.', () => {
    cy.openModal();

    cy.get('#category').select('양식', { force: true });
    cy.get('#name').type('스테이크집');
    cy.get('#distance').select(5);
    cy.get('#description').type('음식점에 대한 설명');
    cy.get('#link').type('http://example.com');

    cy.get('.button--primary').click();
    cy.get('.modal').should('not.have.class', 'modal--open');
  });

  it('거리 값이 유효하지 않은 음식점을 추가하면, 유효하지 않은 거리 값에 대한 에러메세지를 띄워준다.', () => {
    cy.openModal();

    cy.get('#category').select('', { force: true });
    cy.get('#name').type('이름');
    cy.get('#distance').select('');
    cy.get('#description').type('음식점에 대한 설명');
    cy.get('#link').type('http://example.com');

    cy.get('.button--primary').click();
    cy.get('.modal').should('have.class', 'modal--open');
    cy.get('.form-item').should('contain', '거리를 필수적으로 선택해주세요.');
  });

  it('음식점 이름이 유효하지 않은 음식점을 추가하면, 유효하지 않은 음식점 이름에 대한 에러메세지를 띄워준다.', () => {
    cy.openModal();

    cy.get('#category').select('', { force: true });
    cy.get('#name').type();
    cy.get('#distance').select(5);
    cy.get('#description').type('음식점에 대한 설명');
    cy.get('#link').type('http://example.com');

    cy.get('.button--primary').click();
    cy.get('.modal').should('have.class', 'modal--open');
    cy.get('.form-item').should('contain', '이름을 필수적으로 선택해주세요.');
  });
});
