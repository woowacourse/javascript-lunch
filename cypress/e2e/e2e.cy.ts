describe('음식점 등록 테스트', () => {
  before(() => {
    cy.visit('/');
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

  it('음식점 등록하다가 취소하기 클릭 시 작성하던 form은 리셋된다.', () => {
    cy.get('.gnb__button').click();
    cy.get('#category').select('한식').should('have.value', '한식');
    cy.get('#name').type('e2e 테스트!!!!!!');
    cy.get('#distance').select('10분 내').should('have.value', '10');
    cy.get('#button-close').click();

    cy.get('.gnb__button').click();
    cy.get('#category').should('have.value', '');
  });
});

describe('필터링 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('macbook-13');
  });

  it('카테고리를 일식을 클릭하면 일식만 나오고, 다시 전체를 클릭하면 전체 음식점 목록이 출력된다.', () => {
    cy.get('#category-filter').select('일식').should('have.value', '일식');
    cy.get('.restaurant-list').get('[alt="일식"]');

    cy.get('#category-filter').select('전체').should('have.value', '전체');
    cy.get('.restaurant-list').find('li').should('have.length', 6);
  });

  it('일식으로 필터링 후 일식 음식점을 등록하면, 일식 카테고리에 추가된 상태로 음식점 목록이 출력된다.', () => {
    cy.get('#category-filter').select('일식').should('have.value', '일식');
    cy.get('.restaurant-list').get('[alt="일식"]');

    cy.get('.gnb__button').click();
    cy.get('#category').select('일식').should('have.value', '일식');
    cy.get('#name').type('e2e 테스트!!!!!!');
    cy.get('#distance').select('10분 내').should('have.value', '10');
    cy.get('#description').type('안녕하세요 리뷰어님! 잘부탁드립니다!!!');
    cy.get('#link').type('https://github.com/rbgksqkr');
    cy.get('#button-add').click();

    cy.get('.restaurant-list').find('li').should('have.length', 2);
  });
});

describe('상세보기 모달 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('macbook-13');
  });

  it('음식점을 클릭하면 음식점 상세보기 모달이 나오고, 닫기버튼 또는 외부 영역을 클릭하면 모달이 닫힌다.', () => {
    cy.get('#restaurant-info').click();
    cy.get('#detail-modal').should('have.class', 'modal--open');

    cy.get('#button-modal-close').click();
    cy.get('#restaurant-info').click();
    cy.get('#detail-modal-backdrop').click();
    cy.get('#detail-modal').should('not.have.class', 'modal--open');
  });

  it('음식점을 클릭하면 음식점 상세보기 모달이 나오고, 삭제버튼 클릭 시 해당 음식점이 삭제되고 모달이 닫힌다.', () => {
    cy.get('#restaurant-info').click();

    cy.get('#button-modal-delete').click();

    cy.get('.restaurant-list').find('li').should('have.length', 5);
  });

  it('음식점 상세 정보에서 자주 가는 음식점으로 추가할 수 있다.', () => {
    cy.get('#restaurant-info').click();

    cy.get('#detail-favorite-container').find('[type="button"]').click();
    cy.get('#button-modal-close').click();
    cy.get('#favorite-tab').click();

    cy.get('.restaurant-list').find('li').should('have.length', 1);
  });
});
