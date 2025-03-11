declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.css";

type Label = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

interface Restaurant {
  label: Label;
  name: string;
  distance: number;
  description?: string;
  link?: string;
}
