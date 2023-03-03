/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import Modal from '../src/components/Modal';
import Restaurants from '../src/model/Restaurants';

describe('Modal', () => {
  let modal;
  let target;

  beforeEach(() => {
    target = document.createElement('div');
    modal = new Modal(target, new Restaurants(), {}, jest.fn());
    modal.render();
  });

  afterEach(() => {
    target.innerHTML = '';
  });

  test('모달이 HTML 정보를 잘 출력하나', () => {
    modal.render();

    expect(target.innerHTML).toContain('<select name="category" id="category" required="">');
    expect(target.innerHTML).toContain('<label for="name text-caption">이름</label>');
  });

  test('필수 입력 필드가 작성되지 않은 경우 ALERT 창을 출력한다', () => {
    const addButton = target.querySelector('.button--primary');
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    addButton?.dispatchEvent(new MouseEvent('click'));

    expect(spyAlert).toHaveBeenCalledWith('카테고리, 이름, 거리는 필수 입력 정보 입니다!');
  });
});