import Restaurants from '../fixtures/testcase.json';
import SortingResult from '../fixtures/result.json';
describe('점심 뭐 먹지 E2E 테스트', () => {
  beforeEach(() => {
    cy.setRsetaurants(Restaurants).then(() => cy.visitMain());
  });

  it('처음 메인 페이지로 진입하면 레스토랑 리스트가 보여야 한다.', () => {
    cy.get('.restaurant').should('have.length', Restaurants.length);
  });

  it('자주 가는 음식점 추가 버튼 클릭 시, 자주 가는 음식 점에 1개의 항목이 추가된다.', () => {
    cy.get('.restaurant').first().find('.star').click();
    cy.get('.tab__bar__item').last().click();
    cy.get('.restaurant').should('have.length', 1);
  });
  context('레스토랑 추가 기능 검증', () => {
    it('헤더의 레스토랑 추가 버튼을 클릭시, 레스토랑 추가 모달이 나타난다.', () => {
      cy.openAddModal();
      cy.get('.modal-container').should('be.visible');
    });

    it('레스토랑 추가 버튼을 클릭 후, 닫기 버튼 클릭 시 모달 닫기 확인', () => {
      cy.openAddModal();
      cy.get('.button.button--secondary.text-caption').click();
      cy.get('body').find('.modal-container').should('not.exist');
    });

    it('레스토랑 추가 버튼을 클릭 후, 레스토랑 정보 입력 후 추가하기 버튼 클릭 시, 정상 추가', () => {
      cy.openAddModal();
      cy.get('#category').select('한식', { force: true });
      cy.get('#name').type('한식레스토랑10');
      cy.get('#walkingTime').select('30');
      cy.get('#description').type('한식은 언제나 옳다.');
      cy.get('#link').type('https://????');
      cy.get('.button.button--primary.text-caption').click();

      cy.get('.restaurant__name.text-subtitle')
        .contains('한식레스토랑10')
        .should('exist');
    });
  });

  context('레스토랑 카테고리 필터링, 정렬 기능 검증', () => {
    context(
      '음식점 필터링 검증 dropdown에서 각가의 카테고리를 선택한 경우',
      () => {
        const categories = ['한식', '중식', '일식', '양식', '아시안', '기타'];

        categories.forEach((category) => {
          it(`${category}으로 필터링할 경우 모든 음식점 정보의 카테고리는 ${category}이다.`, () => {
            cy.get('#category-filter').select(category);

            cy.get('.restaurant').each(($item) => {
              cy.wrap($item)
                .find('.restaurant__name.text-subtitle')
                .contains(category);
            });
          });
        });
        it('다른 카테고리 선택 후 전체 카테고리 선택 시, 전체 레스토랑을 보여준다', () => {
          cy.get('#category-filter').select('한식');
          cy.get('#category-filter').select('전체');

          cy.get('.restaurant').should('have.length', Restaurants.length);
        });
      }
    );

    context(
      '음식정 정렬 검증. dropdown에서 각각의 정렬 기준을 선택한경우',
      () => {
        const sortingStandards = ['이름순', '거리순'];
        sortingStandards.forEach((sorting) => {
          it(`${sorting}으로 필터링할 경우 해당 정렬 기준로 보여준다.`, () => {
            cy.get('#sorting-filter').select(sorting);
            cy.get('.restaurant').each(($item, index) => {
              cy.wrap($item)
                .find('.restaurant__name.text-subtitle')
                .contains(SortingResult[sorting][index]);
            });
          });
        });
      }
    );
  });

  context('레스토랑 상세보기 기능 검증', () => {
    it('레스토랑 카드 클릭시, 레스토랑 상세보기 모달창을 보여준다.', () => {
      cy.get('.restaurant').first().click();
      cy.get('.restaurant__name.text-subtitle').contains('아시안레스토랑');
    });

    it('레스토랑 카드 클릭 후,닫기 버튼 클릭 시 모달이 사라졌는지 확인한다.', () => {
      cy.get('.restaurant').first().click();
      cy.get('.button.button--primary.text-caption').click();
      cy.get('body').find('.modal-container').should('not.exist');
    });

    it('레스토랑 카드 클릭 후, 삭제 버튼 클릭 시, 레스토랑 카드에서 삭제한다.', () => {
      cy.get('.restaurant').first().click();
      cy.get('.button.button--secondary.text-caption').click();
      cy.get('body').find('.modal-container').should('not.exist');
      cy.get('.restaurant').should('have.length', Restaurants.length - 1);
    });

    it('레스토랑 카드 클릭 후, 자주 가는 음식점 추가 버튼 클릭 시, 자주 가는 음식 점에 1개의 항목이 추가된다.', () => {
      cy.get('.restaurant').first().click();
      cy.get('.modal--open .star').click();
      cy.get('.button.button--primary.text-caption').click();
      cy.get('.tab__bar__item').last().click();
      cy.get('.restaurant').should('have.length', 1);
    });
  });
});
