import { Favorite } from '../../data/image';

const FavoriteIcon = {
  template(state: boolean) {
    return `
      <img src="${state ? Favorite.filled : Favorite.lined}" alt="자주 가는 음식점 버튼" id="favorite-lined"/>`;
  },
};

export default FavoriteIcon;
