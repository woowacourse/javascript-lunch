import { ProtocolEnum } from './domain-enum';
import { CHARACTER_LIMIT } from './rule';

export const MESSAGE = {
  descriptionHasInvalidCharacterLimit: `${CHARACTER_LIMIT.description}자 이내만 입력이 가능합니다.`,
  nameHasInvalidCharacterLimit: `${CHARACTER_LIMIT.description}자 이내만 입력이 가능합니다.`,
  linkHasInvalidChars: '영어,숫자,기호(.,-,/)만 입력이 가능합니다.',
  linkHasInvalidProtocol: `${ProtocolEnum.http}/${ProtocolEnum.https}로 시작되어야 합니다.`,
  linkHasInvalidCharacterLimit: `${CHARACTER_LIMIT.link}자 이내만 입력이 가능합니다.`,
  duplicateRestaurantName: '중복된 음식점이 존재합니다.',
};
