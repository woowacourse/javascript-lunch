import App from '../src/app';
import { Category, Order } from '../src/constants/enum';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';

describe('전체 app ui 테스트', () => {
  let app: App;
  let $target: HTMLDivElement;
  let dom;

  const localStorageMock = (() => {
    let store = {};

    return {
      getItem: (key) => {
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

  it('컴포넌트를 렌더해야한다.', () => {
    expect($target.querySelector('.gnb')).not.toBeNull();
    expect(
      $target.querySelector('.restaurant-filter-container')
    ).not.toBeNull();
    expect($target.querySelector('.restaurant-list-container')).not.toBeNull();
    expect(
      $target.querySelector('.restaurant-add-modal-container')
    ).not.toBeNull();
  });

  it('form 을 submit 한 이후 음식점이 등록되어야한다.', () => {
    const initialLength = app.$state.restaurantList.length;
    const $modalButton = $target.querySelector(
      '.nav-add-button'
    ) as HTMLButtonElement;
    $modalButton.click();

    const $nameInput = $target.querySelector<HTMLInputElement>('#name');
    const $categorySelect =
      $target.querySelector<HTMLSelectElement>('#category');
    const $distanceInput = $target.querySelector<HTMLInputElement>('#distance');
    const $submitButton =
      $target.querySelector<HTMLButtonElement>('.submit-restaurant');

    $nameInput.value = 'New Restaurant';
    $categorySelect.value = Category.Korean;
    $distanceInput.value = '5';

    $submitButton.click();

    expect(app.$state.restaurantList.length).toBe(initialLength + 1);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.getItem('restaurantList')).toEqual(
      JSON.stringify(app.$state.restaurantList)
    );
  });

  it('레스토랑 리스트를 필터링해야한다.', () => {
    const $categorySelect =
      $target.querySelector<HTMLSelectElement>('#category-filter');
    const $orderSelect =
      $target.querySelector<HTMLSelectElement>('#sorting-filter');

    $categorySelect.value = Category.Korean;
    $orderSelect.value = Order.Distance;

    const filteredList = app.getFilteredListByCategory(
      app.$state.restaurantList,
      Category.Korean
    );
    filteredList.sort((a, b) => Number(a.distance) - Number(b.distance));

    expect(app.$state.restaurantList).toEqual(filteredList);
  });
});
