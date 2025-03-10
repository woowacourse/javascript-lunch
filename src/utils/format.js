export function formatDistance(distanceMap) {
  return distanceMap.map((distance) => `${distance}분 내`);
}

export function formatCategory(categoryMap) {
  const categoryNames = {
    ko: "한식",
    ch: "중식",
    ja: "일식",
    we: "양식",
    as: "아시안",
    etc: "기타",
  };

  return categoryMap.map((category) => categoryNames[category] || "알 수 없음");
}
