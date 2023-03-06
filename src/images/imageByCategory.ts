interface ImageByCategory {
  [key: string]: string;
}

const ImageByCategory: ImageByCategory = {
  한식: './category-korean.png',
  일식: './category-japanese.png',
  중식: './category-chinese.png',
  양식: './category-western.png',
  아시안: './category-asian.png',
  기타: './category-etc.png',
};

export default ImageByCategory;
