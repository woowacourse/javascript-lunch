interface ImagePath {
  readonly [key: string]: string;
}

const BUTTON_IMAGE_SRC: ImagePath = Object.freeze({
  ADD_BUTTON: './assets/add-button.png',
});

const CATEGORY_IMAGE_SRC: ImagePath = Object.freeze({
  KOREAN: './assets/category-korean.png',
  CHINESE: './assets/category-chinese.png',
  JAPANESE: './assets/category-japanese.png',
  WESTERN: './assets/category-western.png',
  ASIAN: './assets/category-asian.png',
  ETC: './assets/category-etc.png',
});

const FAVORITE_IMAGE_SRC: ImagePath = Object.freeze({
  FAVORITE: './assets/favorite-icon-filled.png',
  UNFAVORITE: './assets/favorite-icon-lined.png',
});

export { BUTTON_IMAGE_SRC, CATEGORY_IMAGE_SRC, FAVORITE_IMAGE_SRC };
