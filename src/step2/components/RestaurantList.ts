import { RestaurantType } from '../types/restaurants';
import { useState } from '../utils/core/Core';
import Restaurant from './Restaurant';

interface RestaurantListProps {
  restaurants: RestaurantType[];
  isModalOpen: boolean;
  closeModal: () => void;
}

const RestaurantList = (props: RestaurantListProps) => {
  const { restaurants, isModalOpen, closeModal } = props;
  const [, setFavorite] = useState(false);

  return `
    <ul class="restaurant-list">
      ${restaurants
        ?.map((restaurant) =>
          Restaurant({
            ...restaurant,
            favorite: restaurant.isFavorite ?? false,
            isModalOpen,
            setFavorite,
            closeModal,
          })
        )
        .join('')}
    </ul>
  `;
};

export default RestaurantList;
