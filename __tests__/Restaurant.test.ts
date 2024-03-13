import { CATEGORY, DISTANCES, MESSAGE, STORAGE_KEY } from '../src/constants';
import { Restaurant } from '../src/domains';
import { RestaurantInfo } from '../src/types';

describe('Restaurant 테스트', () => {
  const initialInfo: RestaurantInfo = {
    category: 'korean',
    name: '바다_소하',
    distance: 5,
  };

  describe('유효성 검사-이름', () => {
    const ITEM: RestaurantInfo[] = [
      {
        category: CATEGORY.korean,
        name: '피양콩할마니',
        distance: 10,
        description:
          '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼..',
        link: 'https://piyang.modoo.at',
      },
    ];

    beforeAll(() => {
      localStorage.setItem(STORAGE_KEY.restaurants, JSON.stringify(ITEM));
    });
    test.each([['1', '이름'], { nam: '이름' }, undefined])(
      '이름이 문자 타입이 아니면 오류가 발생한다',
      (value) => {
        expect(() => {
          // @ts-expect-error 타입 오류 검사를 위해 ts 기능 끔
          new Restaurant({ ...initialInfo, name: value });
        }).toThrow(MESSAGE.invalidStringType);
      },
    );
    test.each(['12345678910', ''])(
      '이름 입력값의 글자수가 1자 미만, 10자 초과 시 오류가 발생한다.  \n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            name: value,
          });
        }).toThrow(MESSAGE.nameHasInvalidCharacterLimit);
      },
    );

    test.each(['1234567890', '호'])(
      '이름 입력값의 글자수가 1자 이상 10자 이하면 오류가 발생하지 않는다.\n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            name: value,
          });
        }).not.toThrow();
      },
    );

    test('이름이 이미 등록된 이름일 경우 오류가 발생한다.', () => {
      expect(() => {
        new Restaurant({
          ...initialInfo,
          name: ITEM[0].name,
        });
      }).toThrow(MESSAGE.duplicateRestaurantName);
    });

    test('등록된 음식점들과 이름이 중복되지 않으면 오류가 발생하지 않는다.', () => {
      expect(() => {
        new Restaurant({
          ...initialInfo,
          name: 'mau__%e_as',
        });
      }).not.toThrow();
    });
  });

  describe('유효성 검사- 카테고리', () => {
    test.each(['한식', 'ko', 'all'])(
      `카테고리가 유효한 카테코리("${Object.keys(CATEGORY).join(',')}")가 아니라면 오류가 발생한다`,
      (value) => {
        expect(() => {
          // @ts-expect-error 타입 오류 검사를 위해 ts 기능 끔
          new Restaurant({ ...initialInfo, category: value });
        }).toThrow(MESSAGE.invalidCategoryType);
      },
    );
  });

  describe('유효성 검사- 거리', () => {
    test.each(['5', '오분', 6, 31, 0])(
      `거리가 숫자 타입의 유효한 거리("${DISTANCES.join(',')}")가 아니라면 오류가 발생한다`,
      (value) => {
        expect(() => {
          // @ts-expect-error 타입 오류 검사를 위해 ts 기능 끔
          new Restaurant({ ...initialInfo, distance: value });
        }).toThrow(MESSAGE.invalidDistanceType);
      },
    );
  });

  describe('유효성 검사-설명', () => {
    test.each(['   ', Array.from({ length: 151 }, () => '아').join('')])(
      '설명 입력값의 글자수가 1자 미만, 150자 초과 시 오류가 발생한다.\n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            description: value,
          });
        }).toThrow(MESSAGE.descriptionHasInvalidCharacterLimit);
      },
    );

    test.each(['하', Array.from({ length: 150 }, () => '아').join('')])(
      '설명 입력값의 글자수가 1자 이상 150자 이하이면 오류가 발생하지 않는다.\n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            description: value,
          });
        }).not.toThrow();
      },
    );
  });

  describe('유효성 검사-링크', () => {
    test.each([`https://${Array.from({ length: 2001 }, () => 'j').join('')}`])(
      '링크 입력값의 글자수가 2000자 초과 시 오류가 발생한다. \n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            link: value,
          });
        }).toThrow(MESSAGE.linkHasInvalidCharacterLimit);
      },
    );

    test.each([
      'https:// ',
      'http:// ',
      `https://${Array.from({ length: 1992 }, () => 'j').join('')}`,
    ])(
      '링크 입력값의 글자수가1자 이상 2000자 이내이면 오류가 발생하지 않는다. \n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            link: value,
          });
        }).not.toThrow();
      },
    );

    test.each(['htt://', 'h://'])(
      '링크 입력값의 첫 시작이 http/https 프로토콜이 존재하지 않으면 오류가 발생한다. \n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            link: value,
          });
        }).toThrow(MESSAGE.linkHasInvalidProtocol);
      },
    );

    test.each([
      'http://www.lunch.com',
      'https://www.lunch.com/category?korean',
    ])(
      '링크 입력값의 첫 시작이 http/https 프로토콜이면  오류가 발생하지 않는다. \n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            link: value,
          });
        }).not.toThrow();
      },
    );
  });
});
