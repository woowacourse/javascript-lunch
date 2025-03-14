export {};

declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.css";

declare global {
  type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
  type Distance = "5분" | "10분" | "15분" | "20분" | "30분";

  interface FoodItemProps {
    id: string;
    category: Category;
    name: string;
    distance: Distance;
    description: string;
    isFavorite: boolean;
    link: string;
  }
}
