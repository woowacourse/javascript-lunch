import "../types/restaurant";

const translateCategory = (category: Category): string => {
  if (category === "한식") return "korean";
  if (category === "일식") return "japanese";
  if (category === "중식") return "chinese";
  if (category === "아시안") return "asian";
  if (category === "양식") return "western";
  return "etc";
};

export default translateCategory;
