import { CHARACTER_LIMIT, PROTOCOL } from './rule.ts';

export const MESSAGE = {
  descriptionHasInvalidCharacterLimit: `1자 이상 ${CHARACTER_LIMIT.description}자 이내만 입력이 가능합니다.`,
  nameHasInvalidCharacterLimit: `1자 이상 ${CHARACTER_LIMIT.name}자 이내만 입력이 가능합니다.`,
  linkHasInvalidChars: '영어,숫자,기호(.,-,/)만 입력이 가능합니다.',
  linkHasInvalidProtocol: `${PROTOCOL.http}/${PROTOCOL.https}로 시작되어야 합니다.`,
  linkHasInvalidCharacterLimit: `1자 이상 ${CHARACTER_LIMIT.link}자 이내만 입력이 가능합니다.`,
  duplicateRestaurantName: '중복된 음식점이 존재합니다.',
};
