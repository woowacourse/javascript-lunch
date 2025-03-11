import { Restaurant } from '../../types/domain';

type SortKey = string | number;

function sortRestaurants(sortKey: SortKey, restaurants: Restaurant[]) {
  const sortedRestaurants = [...restaurants];

  switch (sortKey) {
    case 'name':
      sortedRestaurants.sort((prev, next) => {
        return prev.name.localeCompare(next.name);
      });

      break;

    case 'distance':
      sortedRestaurants.sort((prev, next) => {
        return prev.distance - next.distance;
      });

      break;

    default:
      throw new Error('유효하지 않은 정렬 기준입니다.');
  }

  return sortedRestaurants;
}

export default sortRestaurants;
