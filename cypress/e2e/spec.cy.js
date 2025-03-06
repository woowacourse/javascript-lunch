describe('음식점 목록 페이지를 화면과 같이 구성한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/');
  });

  it('헤더가 있어야 한다.', () => {
    cy.get('header').should('be.visible');
  });

  it('리스트가 있어야 한다', () => {
    cy.get('.restaurant-list').should('be.visible');
  });

  it('리스트 안에 아이템이 있어야 한다.', () => {
    cy.get('.restaurant').should('be.visible');
  });
});

describe('음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄운다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/');
    cy.get('.gnb__button').click();
  });

  it('모달창이 있어야 한다.', () => {
    cy.get('.modal') // 실제 클래스명 확인 필요
      .should('exist');
  });
});

describe('모달창이 뜨면 입력 내용들이 뜬다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/');
    cy.get('.gnb__button').click();
  });

  it('음식점의 카테고리 선택창이 있어야 한다.', () => {
    cy.get('#category').should('exist');
  });

  it('음식점의 이름 입력창이 있어야 한다', () => {
    cy.get('#name').should('exist');
  });

  it('음식점의 거리 선택창이 있어야 한다.', () => {
    cy.get('#distance').should('exist');
  });

  it('음식점의 설명 입력창이 있어야 한다.', () => {
    cy.get('#description').should('exist');
  });

  it('음식점의 참고 링크 입력창이 있어야 한다.', () => {
    cy.get('#link').should('exist');
  });
});

describe('모달창에 입력을 할 수 있다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/');
    cy.get('.gnb__button').click();
  });

  // it('카테고리를 선택할 수 있다.', () => {
  //   cy.get('#category').select('한식').should('have.value', '한식');
  // });

  it('이름을 작성할 수 있다.', () => {
    cy.get('#name').type('테스트 음식점');
    cy.get('#name').should('have.value', '테스트 음식점');
  });

  it('거리를 선택할 수 있다.', () => {
    cy.get('#distance').select('5분 내').should('have.value', '5');
  });

  it('설명을 작성할 수 있다.', () => {
    cy.get('#description').type('테스트 설명문입니다.');
    cy.get('#description').should('have.value', '테스트 설명문입니다.');
  });

  it('참고 링크를 작성할 수 있다.', () => {
    cy.get('#link').type('https://github.com');
    cy.get('#link').should('have.value', 'https://github.com');
  });
});
