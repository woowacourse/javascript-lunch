import { CATEGORY_TEST_CASE, SORTING_TEST_CASE } from '../data';

const TEST_URL = 'http://localhost:8080/';

describe('음식점 추가 창', () => {
  it('음식점 추가버튼(우측 상단)을 클릭하면 음식점 추가창을 볼 수 있다.', () => {
    cy.visit(TEST_URL);
    cy.get('.gnb__button').click();
    cy.contains('새로운 음식점');
  });

  it('음식점 추가 창에서 취소하기 버튼을 클릭하면 이전 화면으로 돌아간다.', () => {
    cy.visit(TEST_URL);
    cy.get('.gnb__button').click();
    cy.contains('새로운 음식점');
    cy.get('#modal-cancel').click();
    cy.get('.modal').should('not.exist');
  });

  it('카테고리, 이름, 거리, 설명, 링크 `입력창`을 작성하고 `추가하기 버튼`을 `클릭`하면 음식점이 목록에 추가된다. (음식점 목록 추가)', () => {
    cy.visit(TEST_URL);
    cy.get('.gnb__button').click();
    cy.contains('새로운 음식점');
    cy.get('#category').select('한식');
    cy.get('#name').type('얌샘김밥');
    cy.get('#distance').select('5');
    cy.get('#description').type('아직 한번도 안가봄');
    cy.get('#link').type('http://www.naver.com');
    cy.get('.button-container').contains('추가하기').click();
    cy.get('.app').contains('5분 내');
  });
});

describe('음식점 목록, 드롭다운 메뉴/탭바', () => {
  it('드롭다운 메뉴를 통해 음식점 목록을 음식 종류 별로 정렬할 수 있다.', () => {
    cy.visit(TEST_URL, {
      onBeforeLoad(win) {
        win.localStorage.setItem('restaurants', JSON.stringify(CATEGORY_TEST_CASE));
      },
    });
    cy.get('#category-filter').select('한식');
    cy.get('.app').contains('가_한식');
    cy.get('.app').contains('나_한식');
    cy.get('.app').contains('다_중식').should('not.exist');
    cy.get('.app').contains('라_일식').should('not.exist');
    cy.get('.app').contains('하_오분거리 양식').should('not.exist');
    cy.get('.app').contains('하_오분거리 아시안').should('not.exist');
  });

  it('드롭다운 메뉴를 통해 음식점 목록을 이름/거리 순으로 정렬할 수 있다.', () => {
    cy.visit(TEST_URL, {
      onBeforeLoad(win) {
        win.localStorage.setItem('restaurants', JSON.stringify(SORTING_TEST_CASE));
      },
    });
    cy.get('#sorting-filter').select('distance');
    cy.get('.restaurant-list li.restaurant')
      .first()
      .should('contain', '첫번째 거리')
      .next()
      .should('contain', '두번째 거리')
      .next()
      .should('contain', '세번째 거리')
      .next()
      .should('contain', '네번째 거리')
      .next()
      .should('contain', '다섯번째 거리');

    cy.get('#sorting-filter').select('name');
    cy.get('.restaurant-list li.restaurant')
      .first()
      .should('contain', '네번째 거리')
      .next()
      .should('contain', '다섯번째 거리')
      .next()
      .should('contain', '두번째 거리')
      .next()
      .should('contain', '세번째 거리')
      .next()
      .should('contain', '첫번째 거리');
  });

  it('탭바를 통해 음식점 목록을 모든 음식점/자주 가는 음식점 으로 분류하여 볼 수 있다.', () => {});

  it('음식점 목록에서 `별표 버튼`을 `클릭`해 자주 가는 음식점으로 `등록/해제` 할 수 있다.', () => {});
});

describe('음식점 상세 정보 창', () => {
  it('음식점 목록을 클릭해 음식점 상세 정보창을 열 수 있다.', () => {});

  it('음식점 상세 정보창에서 `별표 버튼`을 `클릭`해 자주 가는 음식점으로 `등록/해제` 할 수 있다.', () => {});

  it('음식점 상세 정보창에서 `닫기 버튼`을 `클릭`해 음식점 상세 정보 창을 닫을 수 있다.', () => {});

  it('음식점 상세 정보창에서 `삭제 버튼`을 `클릭`해 음식점을 목록에서 삭제할 수 있다.', () => {});
});
