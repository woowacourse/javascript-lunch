/**
 * @jest-environment jsdom
 */
import { fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { $ } from '../src/utils/common/domHelper.ts';
import { App } from '../src/view/components/App.ts';
import { render } from '../src/utils/core/index.ts';

const waitElement = (getElementCallback, options) => {
  return waitFor(() => {
    const element = getElementCallback();
    if (!element) throw new Error();

    expect(element).toBeInTheDocument();
  }, options);
};

describe('앱 렌더링 테스트', () => {
  document.body.innerHTML = '<div id="app" />';
  render(App, $('#app'));

  test('헤더의 음식점 추가 버튼을 누르면 음식점 생성 모달이 나타난다', async () => {
    await waitElement(() => $('.gnb__button'));

    const modalTriggerBtn = $('.gnb__button');
    fireEvent.click(modalTriggerBtn);

    await waitElement(() => $('.modal'));
  });

  test('음식점 추가 모달의 취소하기 버튼을 누르면 모달이 사라진다', async () => {
    await waitElement(() => $('.modal'));

    const cancelBtn = $('.button--secondary');
    fireEvent.click(cancelBtn);

    await waitForElementToBeRemoved($('.modal'));

    expect($('.modal')).not.toBeInTheDocument();
  });
});
