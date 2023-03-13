import { Category } from './enum';
import IRestaurantInput from '../interfaces/IRestaurantInput';

const defaultDummyRestaurantsData: IRestaurantInput[] = [
  {
    name: '김돈이 본점',
    category: Category.Korean,
    distance: '5',
    description: '점심 김치찌개 너무 맛있어용',
    link: 'https://binaural.tistory.com/272',
    isFavorite: false,
  },
  {
    name: '나기',
    category: Category.Japanese,
    distance: '5',
    description: '나기!!',
    link: 'https://binaural.tistory.com/272',
    isFavorite: true,
  },
  {
    name: '스시마이우 선릉역점',
    category: Category.Japanese,
    distance: '10',
    description: '스시 너무 맛있어요',
    link: 'https://www.siksinhot.com/P/408170',
    isFavorite: true,
  },
];

export default defaultDummyRestaurantsData;
