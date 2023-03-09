interface IImagePaths {
  mainListIconImage: {
    readonly [key: string]: string;
    readonly 한식: string;
    readonly 일식: string;
    readonly 중식: string;
    readonly 양식: string;
    readonly 아시안: string;
    readonly 기타: string;
  };

  isFavoriteIconImage: {
    readonly isFavorite: string;
    readonly notFavorite: string;
  };

  generalIconImage: {
    readonly addListIcon: string;
  };
}

const imagePaths: IImagePaths = {
  mainListIconImage: {
    한식: './category-korean.png',
    일식: './category-japanese.png',
    중식: './category-chinese.png',
    양식: './category-western.png',
    아시안: './category-asian.png',
    기타: './category-etc.png',
  },

  isFavoriteIconImage: {
    isFavorite: './favorite-icon-filled.png',
    notFavorite: './favorite-icon-lined.png',
  },

  generalIconImage: {
    addListIcon: './add-button.png',
  },
};

export default imagePaths;
