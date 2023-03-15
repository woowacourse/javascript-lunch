/**
 * @jest-environment jsdom
 */
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { ID } from '../src/constants';
import Header from '../src/components/Header';
import Menu from '../src/components/Menu';
import ModalHeader from '../src/components/AddModal/ModalHeader';
import CategoryInput from '../src/components/AddModal/CategoryInput';
import DistanceInput from '../src/components/AddModal/DistanceInput';
import DescriptionInput from '../src/components/AddModal/DescriptionInput';
import NameInput from '../src/components/AddModal/NameInput';
import LinkInput from '../src/components/AddModal/LinkInput';
import FilterSection from '../src/components/FilterSection';
import RestaurantListSection from '../src/components/RestaurantListSection';
import mockList from '../src/data/mockRestaurant';

const category = ['한식', '중식', '일식', '양식', '아시안', '기타'];
const distance = ['5분 내', '10분 내', '15분 내', '20분 내', '30분 내'];

describe('컴포넌트 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });

  test('모달의 헤더가 "새로운 음식점" 이다.', () => {
    const app = document.querySelector(`#${ID.APP}`) as HTMLDivElement;
    const container = ModalHeader.template();
    app.innerHTML = container;

    expect(screen.queryByText('새로운 음식점')).toBeInTheDocument();
  });

  test.each([
    [CategoryInput, ['카테고리', '선택해 주세요', ...category]],
    [DistanceInput, ['거리(도보 이동 시간)', '선택해 주세요', ...distance]],
    [NameInput, ['이름']],
    [DescriptionInput, ['설명', '메뉴 등 추가 정보를 입력해 주세요.']],
    [LinkInput, ['참고 링크', '매장 정보를 확인할 수 있는 링크를 입력해 주세요.']],
  ])('모달의 Input UI 텍스트가 올바른지 검사한다.', (dom, texts) => {
    const app = document.querySelector(`#${ID.APP}`) as HTMLDivElement;
    const container = dom.template();
    app.innerHTML = container;

    texts.forEach((text) => {
      expect(screen.queryByText(text)).toBeInTheDocument();
    });
  });

  test('필터 버튼 UI에 쓰이는 텍스트가 올바른지 검사한다.', () => {
    const app = document.querySelector(`#${ID.APP}`) as HTMLDivElement;
    const container = FilterSection.template();
    app.innerHTML = container;

    [...category, '이름순', '거리순'].forEach((text) => {
      expect(screen.queryByText(text)).toBeInTheDocument();
    });
  });

  test('헤더 UI에 쓰이는 텍스트는 "점심 뭐 먹지"이며, 헤더에 있는 버튼이 정상적으로 동작한다.', () => {
    const app = document.querySelector(`#${ID.APP}`) as HTMLDivElement;
    const container = Header.template();
    app.innerHTML = container;

    expect(screen.queryByText('점심 뭐 먹지')).toBeInTheDocument();
    expect(fireEvent.click(screen.getByTestId('headerButton'))).toBe(true);
  });

  test('메뉴 UI의 버튼 텍스트는 "모든 음식점", "자주가는 음식점"이며 정상적으로 동작한다.', () => {
    const app = document.querySelector(`#${ID.APP}`) as HTMLDivElement;
    const container = Menu.template();
    app.innerHTML = container;

    expect(screen.queryByText('모든 음식점')).toBeInTheDocument();
    expect(screen.queryByText('자주 가는 음식점')).toBeInTheDocument();
    expect(fireEvent.click(screen.getByText('모든 음식점'))).toBe(true);
    expect(fireEvent.click(screen.getByText('자주 가는 음식점'))).toBe(true);
  });

  test('초기 음식점 리스트 UI에서는 mockList에 있는 음식점의 이름을 모두 포함한다.', () => {
    const app = document.querySelector(`#${ID.APP}`) as HTMLDivElement;
    const container = RestaurantListSection.template(mockList);
    app.innerHTML = container;

    mockList.forEach((mockItem) => {
      screen.queryAllByText(mockItem.name).forEach((result) => {
        expect(result).toBeInTheDocument();
      });
    });
  });
});
