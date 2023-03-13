import { mockData } from '../../src/data/mockData';

describe('캠퍼스 주변의 점심 식사 스팟 목록을 관리하는 앱(점심뭐먹지)을 E2E 테스트한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/', {
      onBeforeLoad(win) {
        win.localStorage.clear();
        win.localStorage.setItem('mock', JSON.stringify(mockData));
      },
    });
    cy.viewport('iphone-xr');
  });

  it('음식점 목록을 카테고리별로 필터링해서 확인할 수 있다.', () => {
    cy.get('#category-filter').select('중식');
    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .children('.restaurant')
      .should('have.length', 2);

    cy.get('#category-filter').select('한식');
    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .children('.restaurant')
      .should('have.length', 3);
  });

  it('음식점 목록을 이름순/거리순으로 정렬해서 확인할 수 있다.', () => {
    cy.get('#sorting-filter').select('이름순');
    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .first()
      .should('contain', '국밥');

    cy.get('#sorting-filter').select('거리순');
    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .last()
      .should('contain', '30분');
  });

  it('음식점 목록에 새로운 음식점을 추가할 수 있다.', () => {
    cy.get('.gnb__button').click();

    cy.get('#category').select('한식');
    cy.get('#name').type('*얌샘김밥*');
    cy.get('#distance').select('10분 내');
    cy.get('#description').type('다양한 메뉴로 즐기는 분식집');
    cy.get('#link').type('https://ww');

    cy.get("button[type='submit']").click();

    cy.get('#link').type('w.yumsem.com');
    cy.get("button[type='submit']").click();

    cy.get('#name').clear().type('얌샘김밥');
    cy.get("button[type='submit']").click();

    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .children()
      .should('have.length', mockData.length + 1)
      .last()
      .should('contain', '얌샘김밥');
  });

  it('새로고침해도 추가한 음식점 정보들이 유지되어야 한다.', () => {
    cy.reload();

    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .children()
      .should('have.length', mockData.length);
  });

  it('음식점 상세 정보를 확인하고, 음식점을 삭제할 수 있다.', () => {
    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .children()
      .first()
      .get('#0')
      .click();

    cy.get('.modal-container')
      .find('.restaurant__category > img')
      .should('have.attr', 'alt', '한식');

    cy.get('.modal-container').find('.restaurant__name').should('have.text', '피양콩할머니');

    cy.get('.modal-container')
      .find('.restaurant__distance')
      .should('have.text', '캠퍼스부터 10분 내');

    cy.get('.modal-container').find('#delete').click();

    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .each((ele) => {
        cy.wrap(ele).find('.restaurant__name').should('not.contain.text', '피양콩할마니');
      });
  });

  it.only('음식점 목록에서 자주 가는 음식점을 추가하면, 자주 가는 음식점 탭에서 추가한 음식점 목록을 확인할 수 있다.', () => {
    cy.get('#all>.restaurant-list-container')
      .children('.restaurant-list')
      .children()
      .first()
      .find('.favorite-icon')
      .click();

    cy.get('.restaurant-tab>.tab-button').contains('자주 가는 음식점').click();

    cy.get('#often>.restaurant-list-container')
      .children('.restaurant-list')
      .children('.restaurant')
      .should('have.length', 1);
    //cy.reload();
  });
});
