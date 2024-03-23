describe('음식점 등록 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('음식점 추가 아이콘을 클릭하면 음식점 등록 모달이 보여진다.', () => {
    cy.get('#gnb__button').click();
    cy.get('#restaurant-creation-modal').should('have.class', 'modal--open');
  });

  it('새로운 음식점 정보를 추가하면 음식점 목록이 6개에서 7개가 된다.', () => {
    cy.get('#gnb__button').click();

    cy.get('#category').select('한식').should('have.value', '한식');
    cy.get('#name').type('농민백암순대 본점순대');
    cy.get('#distance').select('10').should('have.value', '10');
    cy.get('#description').type('선릉 수요미식회 맛집 순대국밥이 맛있는 농민 백암순대');
    cy.get('#link').type('https://naver.me/xGOiXFfS');

    cy.get('#add-button').click();
    cy.get('#restaurant-list').find('li').should('have.length', 7); // initial data가 6개
  });

  it('취소 버튼을 클릭하면 입력한 데이터가 남아있는 채로 모달이 닫힌다.', () => {
    cy.get('#gnb__button').click();

    cy.get('#category').select('일식').should('have.value', '일식');
    cy.get('#name').type('나이스샤워 선릉점');
    cy.get('#distance').select('15').should('have.value', '15');
    cy.get('#description').type('텐동 맛집');
    cy.get('#link').type('https://naver.me/xhnFFxSR');

    cy.get('#cancel-button').click();

    cy.get('#restaurant-creation-modal').should('not.be.visible');

    cy.get('#gnb__button').click();
    cy.get('#category').should('have.value', '일식');
    cy.get('#name').should('have.value', '나이스샤워 선릉점');
    cy.get('#distance').should('have.value', '15');
    cy.get('#description').should('have.value', '텐동 맛집');
    cy.get('#link').should('have.value', 'https://naver.me/xhnFFxSR');
  });

  it('필수 입력 필드(category)를 채우지 못하고 focusout 되었을 때 필드 하단에 에러 메시지를 표시한다.', () => {
    cy.get('#gnb__button').click();

    cy.get('#category').select('선택해 주세요').should('have.value', '');

    cy.get('#name').click();
    cy.get('#category-error').should('have.text', '카테고리: 필수 입력 값입니다.');
  });
});
