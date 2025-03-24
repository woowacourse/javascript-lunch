export interface ImageProps {
  imgSrc: string;
  imgAlt: string;
}

export interface Restaurant extends ImageProps {
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
