declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.css";

export interface Restaurant {
  imgSrc: string;
  imgAlt: string;
  name: string;
  distance: number;
  description: string;
  category: string;
  link: string;
  id: string;
}

export type isModalOpen = boolean;

export interface Categories {
  [key: string]: string;
}
