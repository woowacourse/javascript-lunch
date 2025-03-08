export const ERROR_MESSAGES = Object.freeze({
  NOT_SELECTED: (title) => {
    return `${title}이(가) 선택되지 않았어요.`;
  },
  IS_BLANK: '이름이 작성되지 않았어요',
  INVALID_NAME_LENGTH: '가게 이름은 1글자 이상 20글자 이하여야 해요',
  INVALID_DESCRIPTION_LENGTH: '가게 설명은 200자 이내여야 해요',
  INVALID_LINK_FORMAT: '링크는 프로토콜(https:// or http://)이 접두사로 붙어야 해요.',
});
