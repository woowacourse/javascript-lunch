import { CLASS } from '../../constants';
import { Favorite } from '../../data/image';
import RestaurantListItem from '../../domain/RestaurantListItem';

const FavoriteIcon = {
  template(favorite: boolean, id: string) {
    return `
    <div class="${CLASS.FAVORITE}" data-id="${id}" data-active="${favorite}">
      <img src="${favorite ? Favorite.filled : Favorite.lined}" alt="자주 가는 음식점 버튼" id="favorite-lined"/>
    </div>`;
  },
  icon(src: string) {
    return `<img src="${src}" alt="자주 가는 음식점 버튼" id="favorite-lined"/>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    const favorite = document.querySelectorAll(`.${CLASS.FAVORITE}`) as NodeListOf<HTMLDivElement>;

    favorite.forEach((item: HTMLDivElement) => {
      item?.addEventListener('click', (e) => {
        e.stopPropagation();

        const id = item.dataset.id;
        const isActive = item.dataset.active;

        if (id) RestaurantListItem.toggleFavorite(id);

        if (isActive === 'false') {
          item.innerHTML = this.icon(Favorite.filled);
          item.dataset.active = 'true';
        } else {
          item.innerHTML = this.icon(Favorite.lined);
          item.dataset.active = 'false';
        }
      });
    });
  },
};

export default FavoriteIcon;
