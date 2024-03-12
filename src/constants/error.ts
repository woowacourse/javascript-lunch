const ERROR = Object.freeze({
  INVALID_CATEGORY: {
    CLASS_NAME: 'invalid_category',
    MESSAGE: '카테고리는 필수적으로 선택해주세요.',
  },
  INVALID_NAME: {
    CLASS_NAME: 'invalid_name',
    MESSAGE: '레스토랑 이름은 필수적으로 작성해주세요',
  },
  DUPLICATE_NAME: {
    CLASS_NAME: 'invalid_name',
    MESSAGE: '이미 등록된 레스토랑입니다.',
  },
});

export default ERROR;
