type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타" | "전체";

type EstimatedTime = "5" | "10" | "15" | "20" | "30";

interface Restaurant {
  name: string;
  category: Category;
  estimatedTime: EstimatedTime;

  description: string;
  link: string;
}

export { Restaurant, Category, EstimatedTime };
