const CATEGORY_IMAGE = {
  한식: "category-korean",
  중식: "category-chinese",
  일식: "category-japanese",
  아시안: "category-asian",
  양식: "category-western",
  기타: "category-etc",
};

export const match = (str) => {
  return CATEGORY_IMAGE[str];
};
