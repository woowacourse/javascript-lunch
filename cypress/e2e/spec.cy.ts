import { DEFAULT_RESTAURANT_LIST, LOCAL_STORAGE_KEY_MAP } from '../../src/lib/constants';
import { ERROR_MESSAGES } from './constants';
import { LanguageType } from './types';
import { LocalStorage } from '../../src/lib/modules/index';

let language: LanguageType = 'en';
describe('애플리케이션 테스트 케이스', () => {
  beforeEach(() => {
    cy.visit('/');
    LocalStorage.set(LOCAL_STORAGE_KEY_MAP.restaurants, JSON.stringify(DEFAULT_RESTAURANT_LIST));

    language = navigator.language === 'ko' ? 'ko' : 'en';
  });

  describe('정상적인 경우', () => {
    describe('카테고리별로 필터링해서 확인할 수 있다.', () => {
      it('카테고리에서 한식을 필터링하면 한식만 확인할 수 있다.', () => {
        cy.get('.restaurant-filter-sort > :nth-child(1) > select').select('한식');

        cy.contains('피양콩할마니').should('exist');
        cy.contains('친친').should('not.exist');
      });
      it('카테고리에서 일식을 필터링하면 일식만 확인할 수 있다.', () => {
        cy.get('.restaurant-filter-sort > :nth-child(1) > select').select('일식');

        cy.contains('잇쇼우').should('exist');
        cy.contains('피양콩할마니').should('not.exist');
      });
      it('카테고리에서 중식을 필터링하면 중식만 확인할 수 있다.', () => {
        cy.get('.restaurant-filter-sort > :nth-child(1) > select').select('중식');

        cy.contains('친친').should('exist');
        cy.contains('피양콩할마니').should('not.exist');
      });
      it('카테고리에서 양식을 필터링하면 양식만 확인할 수 있다.', () => {
        cy.get('.restaurant-filter-sort > :nth-child(1) > select').select('양식');

        cy.contains('이태리키친').should('exist');
        cy.contains('피양콩할마니').should('not.exist');
      });
    });

    describe('이름순/거리순으로 정렬해서 확인할 수 있다.', () => {
      it('거리순으로 정렬하면 친친 식당이 첫 번째에 위치한다.', () => {
        cy.get(':nth-child(2) > select').select('거리순');

        cy.get(':first-child > .restaurant').contains('친친');
      });
      it('이름순으로 정렬하면 "각" 식당이 첫 번째에, "힣" 식당이 마지막에 위치한다.', () => {
        cy.get(':nth-child(2) > select').select('이름순');

        cy.addRestaurant({ name: '각', category: '일식', distance: 20 });
        cy.addRestaurant({ name: '힣', category: '일식', distance: 10 });

        cy.get(':first-child > .restaurant').contains('각');
        cy.get(':last-child > .restaurant').contains('힣');
      });
    });
  });

  describe('음식점 상세 정보를 확인할 수 있다.', () => {
    it('카테고리, 이름, 거리, 설명, 참고 링크를 확인할 수 있다.', () => {
      cy.get(':first-child > .restaurant').click();

      cy.get('.restaurant-detail-modal img[alt="기타"]').should('exist');
      cy.get('.restaurant-detail-modal').contains('도스타코스 선릉점').should('exist');
      cy.get('.restaurant-detail-modal').contains('캠퍼스부터 5분 내').should('exist');
      cy.get('.restaurant-detail-modal').contains('멕시칸 캐주얼 그릴').should('exist');
      cy.get('.restaurant-detail-modal').contains('https://naver.me/G6DyD9tg').should('exist');
    });
    it('음식점을 삭제할 수 있다.', () => {
      cy.get(':first-child > .restaurant').click();
      cy.get('.restaurant-detail-modal').contains('삭제하기').click();

      cy.get('.restaurant-list').contains('도스타코스 선릉점').should('not.exist');
    });
  });
  describe('자주 가는 음식점을 추가하고 목록으로 확인할 수 있다.', () => {
    it('음식점 목록에서 자주 가는 음식점을 추가할 수 있다.', () => {
      cy.get(':first-child > .restaurant [data-action="restaurant-like"]').click();
      cy.get('[data-tab="like"]').click();
      cy.get(':first-child > .restaurant > .restaurant__info > .restaurant__info--inner').click();

      cy.get('.restaurant-list').contains('도스타코스 선릉점').should('exist');
    });
    it('음식점 상세 정보에서 자주 가는 음식점으로 추가할 수 있다.', () => {
      cy.get(':first-child > .restaurant').click();
      cy.get('.restaurant-detail-modal [data-action="restaurant-like"]').click();
      cy.get('.modal-backdrop').click();
      cy.get('[data-tab="like"]').click();

      cy.get('.restaurant-list').contains('도스타코스 선릉점').should('exist');
    });
  });
  describe('새로고침해도 추가한 정보들이 유지되어야 한다.', () => {
    it('새로고침을 했을 때 이전에 추가한 식당이 보인다.', () => {
      cy.addRestaurant({ name: '이름입니다', category: '일식', distance: 10 });

      cy.reload();

      cy.contains('이름입니다').should('exist');
      cy.contains('10분 내').should('exist');
    });
  });

  describe('예외적인 경우', () => {
    it('카테고리를 선택하지 않으면 음식점을 추가할 수 없다.', () => {
      cy.get('[data-action="restaurant-add"]').click();
      cy.get('#name').type('음식점 이름');
      cy.get('#distance').select('5');

      cy.get('[data-action="modal-add"]').click();

      cy.get('select[name="category"]')
        .invoke('prop', 'validationMessage')
        .should('equal', ERROR_MESSAGES.selectInvalid[language]);
    });
    it('이름을 입력하지 않으면 음식점을 추가할 수 없다.', () => {
      cy.get('[data-action="restaurant-add"]').click();
      cy.get('#category').select('한식');
      cy.get('#distance').select('5');

      cy.get('[data-action="modal-add"]').click();

      cy.get('input[name="name"]').invoke('prop', 'validationMessage').should('equal', ERROR_MESSAGES.input[language]);
    });
    it('거리를 선택하지 않으면 음식점을 추가할 수 없다.', () => {
      cy.get('[data-action="restaurant-add"]').click();
      cy.get('#name').type('음식점 이름');
      cy.get('#category').select('한식');

      cy.get('[data-action="modal-add"]').click();

      cy.get('select[name="distance"]')
        .invoke('prop', 'validationMessage')
        .should('equal', ERROR_MESSAGES.selectInvalid[language]);
    });
  });
});
