export const ERROR = {
  typeStoreName: '[ERROR] 음식점 이름은 공백 또는 특수기호로만 이루어질 수 없습니다.',
  duplicatedStoreName: '[ERROR] 음식점 이름은 이미 추가된 음식점 이름과 중복될 수 없습니다.',
};

export const REG_EXP = {
  storeName: /^[a-zA-Z0-9가-힣ㄱ-ㅎ\s]*$/,
};
