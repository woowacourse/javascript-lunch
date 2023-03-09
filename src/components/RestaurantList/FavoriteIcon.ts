import { Favorite } from '../../data/image';
import RestaurantListItem from '../../domain/RestaurantListItem';

const FavoriteIcon = {
  template(favorite: boolean, id: string) {
    return `
    <div class="favorite" data-id="${id}" data-active="false">
      <img src="${favorite ? Favorite.filled : Favorite.lined}" alt="자주 가는 음식점 버튼" id="favorite-lined"/>
    </div>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    const favorite = document.querySelector('.favorite') as HTMLImageElement;

    favorite?.addEventListener('click', () => {
      const id = favorite.dataset.id;
      const isActive = favorite.dataset.active;

      if (id) {
        RestaurantListItem.toggleFavorite(id);

        if (isActive === 'false') {
          favorite.innerHTML = FavoriteIcon.template(true, id);
          favorite.dataset.active = 'true';
        } else {
          favorite.innerHTML = FavoriteIcon.template(false, id);
          favorite.dataset.active = 'false';
        }
      }
    });
  },
};

export default FavoriteIcon;
