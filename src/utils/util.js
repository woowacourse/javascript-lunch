import { STAR_FILL_IMAGE_URL, STAR_LINE_IMAGE_URL } from './constants';

export const getImgSrcByFavorite = (isFavorite) => {
  return isFavorite ? STAR_FILL_IMAGE_URL : STAR_LINE_IMAGE_URL;
};
