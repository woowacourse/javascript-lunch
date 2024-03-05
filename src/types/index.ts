type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type Distance = 5 | 10 | 15 | 20 | 30;

type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
};

export { Category, Distance, Restaurant };
