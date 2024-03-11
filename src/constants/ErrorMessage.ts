export const ErrorMessage = {
  NOT_VALID_CATEGORY: '카테고리를 선택해주세요.',
  NOT_VALID_DISTANCE: '거리를 선택해주세요.',
  NOT_VALID_NAME: '이름을 입력해주세요.',
  NOT_VALID_LINK: '유효한 링크를 입력해주세요',
  NULL_SELECTOR: (selector: Element | null) => {
    `${selector} 가 존재하지 않습니다.`;
  },
};

export const ErrorId = (id: string) => `${id}-error`;
