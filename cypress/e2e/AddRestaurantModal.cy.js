describe('새로운 레스토랑을 등록하는 상황 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(1920, 1080);
    cy.get('.gnb__button').click();
  });

  it('헤더의 추가 버튼을 클릭하면 레스토랑 추가 모달창이 열린다.', () => {
    cy.get('.modal').eq(0).should('have.class', 'modal--open');
  });

  it('유효한 레스토랑 정보를 입력하면 창이 닫히고 새 아이템이 추가된다.', () => {
    cy.get('#category').select('한식');
    cy.get('#name').type('e2e테스트');
    cy.get('#distance').select('5');
    cy.get('#description').type('새로운 레스토랑을 등록하는 e2e 테스트입니다.');
    cy.get('#link').type('https://www.naver.com');
    cy.get('#add').click();

    cy.get('.modal').eq(0).should('have.not.class', 'modal--open');
    cy.get('.restaurant-list-container').find('li').should('have.length', 1);
  });

  it('취소하기 버튼을 누르면 모달이 정상적으로 닫힌다.', () => {
    cy.get('#cancel').click();
    cy.get('.modal').eq(0).should('have.not.class', 'modal--open');
  });

  it('필수 정보를 다 입력하지 않은 상태에서 추가하기 버튼을 누르면 작동하지 않는다.', () => {
    cy.get('#add').click();
    cy.get('.modal').eq(0).should('have.class', 'modal--open');
    cy.get('.restaurant-list-container').find('li').should('have.length', 0);
  });
});
