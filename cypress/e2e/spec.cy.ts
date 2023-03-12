import {
  DEFAULT_RESTAURANTS,
  LOCAL_STORAGE_KEY,
} from '../../src/constants/index';

describe('점심 뭐 먹지 사이트 전체 테스트', () => {
  it('페이지에 접속한다.', () => {
    cy.visit('http://localhost:8080/', {
      onBeforeLoad(win) {
        const restaurants = JSON.stringify(DEFAULT_RESTAURANTS);
        win.localStorage.setItem(LOCAL_STORAGE_KEY, restaurants);
      },
    });
  });
});
