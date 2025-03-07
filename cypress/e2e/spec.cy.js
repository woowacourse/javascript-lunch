describe('식당 목록', () => {
  it('첫 화면에서 식당 리스트가 보인다.', () => {
    cy.visit('http://localhost:5173');
    cy.get('.restaurant-list');
  });
});

describe('식당 추가', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    cy.get('.gnb__button').click();
  });

  it('추가 버튼을 누르면 모달이 보인다.', () => {
    cy.contains('새로운 음식점');
  });

  it('모달을 열어 각 값을 입력하여 ‘추가하기’ 버튼을 누르면 식당 리스트가 추가된다.', () => {
    cy.get('#category').select('일식');
    cy.get('#name').type('이름입니다');
    cy.get('#distance').select('10');
    cy.get('#modal-add').click();

    cy.contains('이름입니다');
    cy.contains('10분 내');
  });
});
