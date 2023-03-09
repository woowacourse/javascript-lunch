export const FILTER = {
  value: {
    entire: '전체',
  },

  label: {
    entire: '전체',
  },
};

export const SORT = {
  value: {
    name: 'name',
    distance: 'distance',
  },

  label: {
    name: '이름순',
    distance: '거리순',
  },
};

export const DEFAULT_OPTION = {
  value: '',
  label: '선택해주세요',
};

export const RESTAURANT_NAME_LENGTH = {
  min: 1,
  max: 20,
};

export const ERROR_MESSAGE = {
  restaurantNameLength: '음식점 이름은 1 ~ 20자 사이어야 합니다.',
  restaurantNameDuplication: '음식점이 존재합니다. 체인점인 경우 지역까지 명시해주세요.',
  restaurantCategory: '카테고리를 선택해주세요.',
  restaurantDistanceByMinutes: '거리(도보 이동 시간)를 선택해주세요.',
};

export const ALERT_MESSAGE = {
  removeFavorite: '자주 가는 음식점에서 제거되었습니다.',
  addFavorite: '자주 가는 음식점에 추가되었습니다.',
  createRestaurant: '음식점이 생성되었습니다.',
};
