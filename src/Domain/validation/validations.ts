export const ERROR_MESSAGES = Object.freeze({
  NOT_SELECTED: (title: string): string => {
    return `${title}이(가) 선택되지 않았어요.`;
  },
  IS_BLANK: '이름이 작성되지 않았어요',
  INVALID_NAME_LENGTH: '음식점 이름은 1글자 이상 20글자 이하여야 해요',
  INVALID_DESCRIPTION_LENGTH: '음식점 설명은 200자 이내여야 해요',
  INVALID_LINK_FORMAT: '링크는 프로토콜(https:// or http://)이 접두사로 붙어야 해요.',
});

const isNotSelected = (input: string): boolean => {
  if (input === '선택해주세요') return true;
  return false;
};

const isBlank = (name: string | undefined): boolean => {
  if (!name || name.trim() === '') return true;
  return false;
};

export const validateDropDown = (title: string, input: string): void => {
  if (isBlank(input)) {
    throw new Error(ERROR_MESSAGES.NOT_SELECTED(title));
  }
};

const isInvalidLength = (name: string, length: number): boolean => {
  if (name.length > length) return true;
  return false;
};

export const validateName = (name: string): void => {
  if (isBlank(name)) {
    throw new Error(ERROR_MESSAGES.IS_BLANK);
  }

  if (isInvalidLength(name, 20)) {
    throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
  }
};

export const validateDescription = (description: string): void => {
  if (isInvalidLength(description, 200)) {
    throw new Error(ERROR_MESSAGES.INVALID_DESCRIPTION_LENGTH);
  }
};

const hasNotPrefixProtocol = (input: string): boolean => {
  if (!input.match(/https?:\/\/[\w\-\.]+/g)) return true;
  return false;
};

export const validateLink = (input: string): void => {
  if (isBlank(input)) return;
  if (hasNotPrefixProtocol(input)) {
    throw new Error(ERROR_MESSAGES.INVALID_LINK_FORMAT);
  }
};
