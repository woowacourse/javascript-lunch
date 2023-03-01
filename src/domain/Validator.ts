const RESTAURANT_CATEGORIES = [
  "한식",
  "중식",
  "일식",
  "아시안",
  "양식",
  "기타",
];

const Validator = {
  checkCategory: (category: string) => {
    if (!Validator.isRestaurantCategory(category)) {
      throw new Error("에러 1");
    }
  },

  isRestaurantCategory: (category: string) => {
    return RESTAURANT_CATEGORIES.includes(category);
  },
};

export default Validator;
