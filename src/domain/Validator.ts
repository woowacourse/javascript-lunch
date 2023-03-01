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

  checkName: (name: string) => {
    if (Validator.isBlank(name.trim())) {
      throw new Error("에러 2");
    }
  },

  isBlank: (name: string) => {
    return name.length === 0;
  },
};

export default Validator;
