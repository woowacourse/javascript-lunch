// @ts-nocheck

import App from '../src/app';
import { Category, Order } from '../src/constants/enum';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';

// @ts-nocheck
interface ILocalStorageMock {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  clear: () => void;
  removeItem: (key: string) => void;
}

describe('전체 app ui 테스트', () => {
  let app: typeof App;
  let $target: HTMLDivElement;
  let dom: JSDOM;

  const localStorageMock: ILocalStorageMock = (() => {
    let store = {};

    return {
      getItem: (key: string) => {
        return store[key] || null;
      },
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key) => {
        delete store[key];
      },
    };
  })();

  beforeAll(() => {
    dom = new JSDOM(`<!DOCTYPE html>`);
    global.document = dom.window.document;

    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
    });
  });

  afterAll(() => {
    dom.window.close();
    delete global.document;
  });

  beforeEach(() => {
    $target = document.createElement('div');
    app = new App($target);
  });

  afterEach(() => {
    $target.innerHTML = '';
    localStorageMock.clear();
  });

  it('초기 컴포넌트를 렌더해야한다.', () => {
    expect($target.querySelector('.gnb')).not.toBeNull();
    expect(
      $target.querySelector('.restaurant-filter-container')
    ).not.toBeNull();
    expect($target.querySelector('.tabview__content')).not.toBeNull();
    // 초기 등록한 음식점이 없을 시 더미 데이터 (2개의 음식점) 을 보여준다.
    expect($target.querySelectorAll('.restaurant')).toHaveLength(3);
  });

  it('form 을 submit 한 이후 음식점이 등록되어야한다.', () => {
    const initialLength = app.$state.restaurantList.length;
    const $modalButton = $target.querySelector(
      '.nav-add-button'
    ) as HTMLButtonElement;
    $modalButton.click();

    const $nameInput = $target.querySelector<HTMLInputElement>('#name')!;
    const $categorySelect =
      $target.querySelector<HTMLSelectElement>('#category')!;
    const $distanceInput =
      $target.querySelector<HTMLInputElement>('#distance')!;
    const $submitButton =
      $target.querySelector<HTMLButtonElement>('.submit-restaurant')!;

    $nameInput.value = 'New Restaurant';
    $categorySelect.value = Category.Korean;
    $distanceInput.value = '5';

    $submitButton.click();

    // 처음 음식점을 등록 시 기존의 2개의 더미 데이터가 삭제되고 하나의 실제 음식점이 추가되므로 initialLength 보다 2가 작아야한다.
    expect(app.$state.restaurantList.length).toBe(initialLength - 2);
    expect(localStorageMock.getItem('restaurantList')).toEqual(
      JSON.stringify(app.$state.restaurantList)
    );
  });

  it('레스토랑 리스트를 필터링해야한다.', () => {
    const ExpectedFilteredDummyRestaurantData = [
      {
        name: '김돈이 본점',
        category: Category.Korean,
        distance: '5',
        isFavorite: false,
        description: '점심 김치찌개 너무 맛있어용',
        link: 'https://binaural.tistory.com/272',
      },
    ];

    const $categorySelect =
      $target.querySelector<HTMLSelectElement>('#category-filter')!;
    const $orderSelect =
      $target.querySelector<HTMLSelectElement>('#sorting-filter')!;

    $categorySelect.value = Category.Korean;
    $orderSelect.value = Order.Distance;

    const filteredList = app.getFilteredListByCategory(
      app.$state.restaurantList,
      Category.Korean
    );
    filteredList.sort((a, b) => Number(a.distance) - Number(b.distance));

    expect(filteredList).toStrictEqual(ExpectedFilteredDummyRestaurantData);
  });
});
