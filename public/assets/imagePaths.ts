interface ImagePath {
  readonly [key: string]: string;
}

const BUTTON_IMAGE_SRC: ImagePath = Object.freeze({
  ADD_BUTTON: './public/assets/add-button.png',
});

const CATEGORY_IMAGE_SRC: ImagePath = Object.freeze({
  KOREAN: './public/assets/category-korean.png',
  CHINESE: './public/assets/category-chinese.png',
  JAPANESE: './public/assets/category-japanese.png',
  WESTERN: './public/assets/category-western.png',
  ASIAN: './public/assets/category-asian.png',
  ETC: './public/assets/category-etc.png',
});

const FAVORITE_IMAGE_SRC: ImagePath = Object.freeze({
  FAVORITE: './public/assets/favorite-icon-filled.png',
  UNFAVORITE: './public/assets/favorite-icon-lined.png',
});

export { BUTTON_IMAGE_SRC, CATEGORY_IMAGE_SRC, FAVORITE_IMAGE_SRC };
