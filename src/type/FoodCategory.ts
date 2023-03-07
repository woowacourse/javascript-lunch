const foodCategoryList = ["한식", "중식", "일식", "아시안", "양식", "기타"] as const;

type FoodCategory = typeof foodCategoryList[number];

const getFoodCategoryMemberList = () => [...foodCategoryList];

const isValidFoodCategory = (category: string): category is FoodCategory => (
  foodCategoryList.includes(<FoodCategory>category)
);

export { FoodCategory, getFoodCategoryMemberList, isValidFoodCategory };