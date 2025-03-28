export function formatDistance(distanceMap) {
  const categoryNames = {
    none: "선택해주세요.",
    5: "5",
    10: "10",
    15: "15",
    20: "20",
    30: "30",
  };

  return distanceMap.map((distance) => `${categoryNames[distance]}분 내`);
}

export function formatCategory(categoryMap) {
  const categoryNames = {
    none: "선택해주세요.",
    korea: "한식",
    china: "중식",
    japan: "일식",
    western: "양식",
    asian: "아시안",
    etc: "기타",
  };

  return categoryMap.map((category) => categoryNames[category]);
}

export function formatFilter(categoryMap) {
  const categoryNames = {
    all: "전체",
    korea: "한식",
    china: "중식",
    japan: "일식",
    western: "양식",
    asian: "아시안",
    etc: "기타",
  };

  return categoryMap.map((category) => categoryNames[category]);
}

export function formatSort(sortMap) {
  const sortNames = {
    name: "이름순",
    distance: "거리순",
  };
  return sortMap.map((sort) => sortNames[sort]);
}

export function convertObjectToArray(object) {
  return Object.values(object);
}
