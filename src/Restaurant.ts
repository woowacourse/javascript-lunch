export type TCategory = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type TDistance = 5 | 10 | 15 | 20 | 30;

export interface IRestaurant {
  category: TCategory;
  name: string;
  distance: TDistance;
  description?: string;
  referenceLink?: string;
}

class Restaurant {
  information;

  constructor(information: IRestaurant) {
    this.information = information;
  }

  isMatchedCategory(category: string): boolean {
    return this.information.category === category;
  }
}

export default Restaurant;
