import korean from '../../assets/category-korean.png';
import chinese from '../../assets/category-chinese.png';
import japanese from '../../assets/category-japanese.png';
import western from '../../assets/category-western.png';
import asian from '../../assets/category-asian.png';
import etc from '../../assets/category-etc.png';
import favorite from '../../assets/favorite-icon-filled.png';
import notFavorite from '../../assets/favorite-icon-lined.png';
import { CategoryOptions } from '../types/type';

export function categoryImageSource(category: CategoryOptions) {
  switch (category) {
    case '한식':
      return korean;
    case '중식':
      return chinese;
    case '일식':
      return japanese;
    case '양식':
      return western;
    case '아시안':
      return asian;
    case '기타':
      return etc;
  }
}

export function favoriteImageSource(isFavorite: boolean) {
  if (isFavorite) return favorite;

  return notFavorite;
}
