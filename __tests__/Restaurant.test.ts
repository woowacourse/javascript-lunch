import { Restaurant } from '../src/domains';
import { RestaurantInfo } from '../src/types';
import { MESSAGE } from '../src/constants';

describe('Restaurant 테스트', () => {
  const initialInfo: RestaurantInfo = {
    category: 'korean',
    name: '꺼벙이네',
    distance: 5,
  };

  describe('유효성 검사-이름', () => {
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
    test.each(['https://' + Array.from({ length: 2001 }, () => 'j').join('')])(
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
      'https://' + Array.from({ length: 1992 }, () => 'j').join(''),
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

    test.each(['https://한글'])(
      '링크 입력값이 영어가 아니면 오류가 발생한다. \n [Test Case] : %s',
      (value: string) => {
        expect(() => {
          new Restaurant({
            ...initialInfo,
            link: value,
          });
        }).toThrow(MESSAGE.linkHasInvalidChars);
      },
    );

    test.each(['https://english'])(
      '링크 입력값이 영어이면 오류가 발생하지 않는다. \n [Test Case] : %s',
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

    test.each(['http://', 'https://'])(
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
