const FOOD_CATEGORY_LIST = ["한식", "중식", "일식", "아시안", "양식", "기타"] as const;

type FoodCategory = typeof FOOD_CATEGORY_LIST[number];

const getFoodCategoryMemberList = () => [...FOOD_CATEGORY_LIST];

const isValidFoodCategory = (category: string): category is FoodCategory => (
  FOOD_CATEGORY_LIST.includes(category as FoodCategory)
);

export { FoodCategory, getFoodCategoryMemberList, isValidFoodCategory };
