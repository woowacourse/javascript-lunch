import { CATEGORY, CHARACTER_LIMIT, PROTOCOL } from './rule';

export const MESSAGE = {
  invalidStringType: '문자만 가능합니다.',
  invalidDistanceType: '거리는 5,10,15,20,30분만 가능합니다.',
  invalidCategoryType: `카테고리는 ${Object.keys(CATEGORY)}`,
  //name
  nameHasInvalidCharacterLimit: `1자 이상 ${CHARACTER_LIMIT.name}자 이내만 입력이 가능합니다.`,
  //description
  descriptionHasInvalidCharacterLimit: `1자 이상 ${CHARACTER_LIMIT.description}자 이내만 입력이 가능합니다.`,
  duplicateRestaurantName: '중복된 음식점이 존재합니다.',
  //link
  linkHasInvalidProtocol: `${PROTOCOL.http}/${PROTOCOL.https}로 시작되는 유효한 url이여야합니다.`,
  linkHasInvalidCharacterLimit: `1자 이상 ${CHARACTER_LIMIT.link}자 이내만 입력이 가능합니다.`,
};
