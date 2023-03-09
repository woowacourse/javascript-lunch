export const CATEGORIES = ['한식', '중식', '일식', '양식', '아시안', '기타'] as const;
export const FILTER_CATEGORIES = ['전체', ...CATEGORIES];
export const DISTANCES = ['5', '10', '15', '20', '30'] as const;
export const SORT_TYPE = ['name', 'distance'] as const;

export const ERROR_MESSAGE = Object.freeze({
  emptyCategory: '[ERROR] 카테고리가 선택되지 않았습니다.',
  invalidCategory: '[ERROR] 알 수 없는 카테고리입니다',
  emptyName: '[ERROR] 가게 이름이 입력되지 않았습니다.',
  emptyDistance: '[ERROR] 거리 옵션이 선택되지 않았습니다.',
  invalidDistance: '[ERROR] 알 수 없는 거리 옵션입니다',
});
