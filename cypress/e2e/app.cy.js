describe('점심 뭐 먹지 앱 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('첫 페이지 접속 시 localStorage에 저장된 데이터가 없으면 샘플 음식점 데이터 6개를 보여준다.', () => {
    cy.clearLocalStorage();
    cy.get('.restaurant-list').children().should('have.length', 6);
  });

  describe('새로운 음식점 추가', () => {
    context('모든 음식점 탭에서 `김돈이` 음식점을 추가하면', () => {
      it('`김돈이` 음식점이 화면에 보여야 한다.', () => {
        cy.get('.restaurant-list').children().should('have.length', 6);

        cy.addSampleRestaurant();

        cy.get('.restaurant-list').children().should('have.length', 7);
        cy.contains('김돈이').should('exist');
      });
    });

    context('자주 가는 음식점 탭에서 `김돈이` 음식점을 추가하면', () => {
      it('모든 음식점 탭으로 이동하고, `김돈이` 음식점이 화면에 보여야 한다.', () => {
        cy.contains('자주 가는 음식점').click();

        cy.addSampleRestaurant();

        cy.get('.restaurant-list').children().should('have.length', 7);
        cy.contains('김돈이').should('exist');
      });
    });
  });

  describe('음식점 삭제', () => {
    context('`피양콩할마니` 음식점을 삭제하면', () => {
      it('`피양콩할마니` 음식점이 화면에 보이지 않아야 한다.', () => {
        cy.get('.restaurant-list').children().should('have.length', 6);
        cy.get('restaurant-list-item').contains('피양콩할마니').should('exist');

        cy.contains('피양콩할마니').click();
        cy.get('button.delete-button').click();

        cy.get('.restaurant-list').children().should('have.length', 5);
        cy.get('restaurant-list-item').contains('피양콩할마니').should('not.exist');
      });
    });
  });

  describe('자주 가는 음식점 등록', () => {
    context('음식점 목록에서 `잇쇼우` 음식점을 자주 가는 음식점에 추가하면', () => {
      it('`잇쇼우` 음식점이 자주 가는 음식점 탭에서 보여야 한다.', () => {
        cy.get('restaurant-list-item').contains('잇쇼우').should('exist');

        cy.get('button.favorite').eq(2).click();
        cy.contains('자주 가는 음식점').click();

        cy.get('restaurant-list-item').contains('잇쇼우').should('exist');
      });
    });

    context('`잇쇼우` 음식점의 상세 정보 모달에서 자주 가는 음식점에 추가하면', () => {
      it('`잇쇼우` 음식점이 자주 가는 음식점 탭에서 보여야 한다.', () => {
        cy.contains('잇쇼우').click();
        cy.get('.icon-container').children('.favorite').click();
        cy.get('.cancel-button').click();
        cy.contains('자주 가는 음식점').click();

        cy.get('restaurant-list-item').contains('잇쇼우').should('exist');
      });
    });
  });

  describe('자주 가는 음식점 해제', () => {
    context(
      '자주 가는 음식점 목록에서 `피양콩할마니` 음식점을 자주 가는 음식점에서 해제하면',
      () => {
        it('`피양콩할마니` 음식점이 자주 가는 음식점 탭에서 보이지 않아야 한다.', () => {
          cy.contains('자주 가는 음식점').click();
          cy.get('restaurant-list-item').contains('피양콩할마니').should('exist');

          cy.get('button.favorite').eq(0).click();

          cy.get('restaurant-list-item').contains('피양콩할마니').should('not.exist');
        });
      }
    );

    context('`피양콩할마니` 음식점의 상세 정보 모달에서 자주 가는 음식점에서 해제하면', () => {
      it('`피양콩할마니` 음식점이 자주 가는 음식점 탭에서 보이지 않아야 한다.', () => {
        cy.contains('자주 가는 음식점').click();
        cy.get('restaurant-list-item').contains('피양콩할마니').should('exist');

        cy.contains('피양콩할마니').click();
        cy.get('.icon-container').children('.favorite').click();
        cy.get('.cancel-button').click();

        cy.get('restaurant-list-item').contains('피양콩할마니').should('not.exist');
      });
    });
  });

  describe('카테고리별 필터링 기능', () => {
    context('한식 카테고리를 선택하면', () => {
      it('한식 카테고리의 음식점만 보여야 한다.', () => {
        cy.get('select#category-filter').select('한식');

        cy.get('.restaurant-list').children().should('have.length', 1);
        cy.get('restaurant-list-item').contains('피양콩할마니').should('exist');
      });
    });
  });

  describe('정렬 기능', () => {
    context('이름순으로 정렬하면', () => {
      it('음식점 이름 오름차순으로 목록이 보여야 한다.', () => {
        cy.get('select#sorting-filter').select('이름순');

        cy.get('.restaurant-list').children().should('have.length', 6);
        cy.get('restaurant-list-item').eq(0).contains('도스타코스 선릉점');
        cy.get('restaurant-list-item').eq(1).contains('이태리키친');
        cy.get('restaurant-list-item').eq(2).contains('잇쇼우');
        cy.get('restaurant-list-item').eq(3).contains('친친');
        cy.get('restaurant-list-item').eq(4).contains('피양콩할마니');
        cy.get('restaurant-list-item').eq(5).contains('호아빈 삼성점');
      });
    });

    context('거리순으로 정렬하면', () => {
      it('거리가 가까운 순서대로 음식점이 보여야 한다.', () => {
        cy.get('select#sorting-filter').select('거리순');

        cy.get('.restaurant-list').children().should('have.length', 6);
        cy.get('restaurant-list-item').eq(0).contains('도스타코스 선릉점');
        cy.get('restaurant-list-item').eq(1).contains('친친');
        cy.get('restaurant-list-item').eq(2).contains('잇쇼우');
        cy.get('restaurant-list-item').eq(3).contains('피양콩할마니');
        cy.get('restaurant-list-item').eq(4).contains('호아빈 삼성점');
        cy.get('restaurant-list-item').eq(5).contains('이태리키친');
      });
    });
  });

  describe('탭 이동 시 필터링, 정렬 기능 유지', () => {
    context('한식 카테고리를 선택하고, 거리순으로 정렬하면', () => {
      it('탭 이동 후에도 한식 카테고리, 거리순 정렬이 유지되어야 한다.', () => {
        cy.get('select#category-filter').select('한식');
        cy.get('select#sorting-filter').select('거리순');

        cy.get('.restaurant-list').children().should('have.length', 1);
        cy.get('restaurant-list-item').contains('피양콩할마니').should('exist');

        cy.contains('자주 가는 음식점').click();
        cy.contains('모든 음식점').click();

        cy.get('select#category-filter').contains('한식');
        cy.get('select#sorting-filter').contains('거리순');
        cy.get('.restaurant-list').children().should('have.length', 1);
        cy.get('restaurant-list-item').contains('피양콩할마니').should('exist');
      });
    });
  });

  describe('새로고침 시 데이터 유지', () => {
    context('`김돈이` 음식점을 추가하면', () => {
      it('`김돈이` 음식점이 화면에 보이고, 새로고침해도 데이터가 유지되어야 한다.', () => {
        cy.get('.restaurant-list').children().should('have.length', 6);

        cy.addSampleRestaurant();

        cy.get('.restaurant-list').children().should('have.length', 7);
        cy.contains('김돈이').should('exist');

        cy.reload();

        cy.get('.restaurant-list').children().should('have.length', 7);
        cy.get('restaurant-list-item').contains('김돈이').should('exist');
      });
    });
  });
});
