import { RESTAURANT_FIELD_LENGTH } from "./restaurant";
export const ERROR_MESSAGE = {
  INVALID_CATEGORY: "존재하지 않는 카테고리 입니다.",
  INVALID_RESTAURANT_NAME_LENGTH: `음식점 이름은 ${RESTAURANT_FIELD_LENGTH.name.min}글자 이상, ${RESTAURANT_FIELD_LENGTH.name.max}글자 이하만 가능합니다.`,
  INVALID_RESTAURANT_DISTANCE: "음식점 거리가 유효하지 않습니다.",
  INVALID_RESTAURANT_DESCRIPTION_LENGTH: `음식점 설명은 ${RESTAURANT_FIELD_LENGTH.description.max}이하만 가능합니다.`,
  INVALID_RESTAURANT_LINK_LENGTH: `움식점 링크는 ${RESTAURANT_FIELD_LENGTH.link.max}이하만 가능합니다.`,
  DUPLICATE_RESTAURANT:
    "이미 동일한 이름의 음식점이 있습니다. 다른 음식점을 입력해주세요.",
  INVALID_DEFAULT_RESTAURANT:
    "초기 레스토랑 값이 올바르지 않습니다. 초기 레스토랑 값을 체크해보세요.",
  NO_RESTAURANT_FOUND: "해당 레스토랑이 없습니다. 이미 지워진것 일수 있어요.",
} as const;
