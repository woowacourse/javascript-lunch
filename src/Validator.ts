const categories = ['한식', '중식', '일식', '아시안', '양식', '기타'];

const Validator = {
  validateCategory(categoryOption: string) {
    if (!categories.includes(categoryOption)) {
      throw new Error('[ERROR] 알 수 없는 카테고리입니다');
    }
  },

  isEmpty(rastaurantName: string) {
    return rastaurantName.length === 0;
  },
};

export default Validator;
