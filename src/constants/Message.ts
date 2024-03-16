export const ERROR_MESSAGE = {
  NOT_VALID_CATEGORY: '카테고리를 선택해주세요.',
  NOT_VALID_DISTANCE: '거리를 선택해주세요.',
  NOT_VALID_NAME: '이름을 입력해주세요.',
  NOT_VALID_LINK: '유효한 링크를 입력해주세요',
  NULL_SELECTOR: (selector: string | null) => {
    return `${selector} 가 존재하지 않습니다.`;
  },
};

export const INFO_MESSAGE = {
  DESCRIPTION: '메뉴 등 추가 정보를 입력해 주세요.',
  LINK: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
  DELETE_CONFIRM: '정말 삭제하시겠습니까?',
};

export const ERROR_ID = (id: string) => `${id}-error`;
