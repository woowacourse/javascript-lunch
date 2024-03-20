import { STORAGE_KEY, MESSAGE } from './../../src/constants';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.get('add-store-btn').click();
  });

  describe('음식점 폼 입력 시 추가하기 버튼 활성화', () => {
    it('음식점의 정보에 대한 입력란 중, 필수 입력에 대한 입력값이 유효하지 않으면 "추가하기"버튼은 비활성화 상태이다.', () => {
      //입력
      cy.get('#category-filter').select('');
      cy.get('#restaurant-name').find('input').clear();
      cy.get('#distance-filter').select('');
      cy.get('#distance-filter').blur();

      cy.get('.btn-color-red').should('be.disabled');
    });

    it('음식점의 정보에 대한 입력란 중, 필수 입력에 대한 입력값이 유효하면 "추가하기"버튼은 활성화 된다.', () => {
      //입력
      cy.get('#category-filter').select('korean');
      cy.get('#restaurant-name').find('input').invoke('val', 'Hello!');
      cy.get('#distance-filter').select('5');
      cy.get('#distance-filter').blur();

      cy.get('.btn-color-red').should('not.be.disabled');
    });
    it('음식점의 정보 중 필수 값이 유효하더라도 잘못된 링크 형식을 입력하면, "추가하기"버튼은 비활성화 상태이다.', () => {
      //입력
      cy.get('#category-filter').select('korean');
      cy.get('#restaurant-name').find('input').invoke('val', 'Hello!');
      cy.get('#distance-filter').select('5');
      cy.get('#restaurant-link').find('input').invoke('val', 'htt');

      cy.get('.btn-color-red').should('be.disabled');
    });

    it('음식점의 정보 중 필수 값이 유효하더라도 잘못된 설명 형식을 입력하면, "추가하기"버튼은 비활성화 상태이다.', () => {
      // 피수값 넣기
      cy.get('#category-filter').select('korean');
      cy.get('#restaurant-name').find('input').invoke('val', 'Hello!');
      cy.get('#distance-filter').select('5');
      // 잘못된 설명 입력
      cy.get('#restaurant-description')
        .find('textarea')
        .invoke('val', Array.from({ length: 151 }, () => '1').join(''));

      cy.get('.btn-color-red').should('be.disabled');
    });
  });

  describe('음식점 추가, 취소', () => {
    it('입력된 음식점 정보의 형식이 유효하면 "추가하기"버튼을 클릭하면 음식점 정보를 추가한 후 모달이 닫힌다', () => {
      const NAME = 'Hello!!!';
      // 입력
      cy.get('#category-filter').select('korean');
      cy.get('#restaurant-name').find('input').invoke('val', NAME);
      cy.get('#distance-filter').select('5');
      cy.get('#restaurant-link').invoke('val', 'http://');
      cy.get('#restaurant-description')
        .find('textarea')
        .invoke('val', Array.from({ length: 150 }, () => '1').join(''));

      // submit 버튼 활성화
      cy.get('#distance-filter').blur();

      const $submitBtn = cy.get('.btn-color-red');

      $submitBtn.click();

      //추가
      cy.window().then((win) => {
        const data = win.localStorage.getItem(STORAGE_KEY.restaurants);

        if (data) {
          const list = JSON.parse(data);
          expect(list.find((store) => store.name === NAME)).to.not.be.undefined;
        }
      });

      //모달 닫힘
      cy.get('#modal-container-child').children().should('not.exist');
    });

    it('음식점을 추가를 취소하는 버튼을 클릭하면 모달이 닫힌다.', () => {
      cy.get('.btn-color-white').click();

      cy.get('#modal-container-child').children().should('not.exist');
    });
  });
});
