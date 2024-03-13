import favoritedImage from '../../../../templates/favorite-icon-filled.png';
import unfavoritedImage from '../../../../templates/favorite-icon-lined.png';

const RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA = {
  TAG_CLASS_NAME: 'favorited-icon',
  TAG_ALT: (isFavorited: boolean) => (isFavorited ? 'unfavorited' : 'favorited'),
  TAG_SRC: (isFavorited: boolean) => (isFavorited ? favoritedImage : unfavoritedImage),
};

export default RESTAURANT_LIST_ITEM_IS_FAVORITED_COMPONENT_DATA;
