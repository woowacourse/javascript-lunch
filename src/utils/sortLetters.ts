const isKorean = (letter: string) => {
  const koreanPattern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;
  return koreanPattern.test(letter);
};

const isEnglish = (letter: string) => {
  const englishPattern = /^[a-zA-Z]+$/;
  return englishPattern.test(letter);
};

const compareEnglish = (a: string, b: string) => {
  if (a.localeCompare(b, "en", { sensitivity: "base" }) !== 0) {
    return a.localeCompare(b, "en", { sensitivity: "base" });
  }
  return -1 * a.localeCompare(b, "en");
};

// 문자열을 비교하여 -1, 0, 1을 반환하는 함수
// 정렬 기준: 오름차순, 한글 > 영어 > 기타 문자
// 영어는 대소문자 없이 구분하되, 같을 경우 대문자를 우선순위로 둔다.
const compareLetterPriority = (a: string, b: string) => {
  if (a === b) {
    return 0;
  }
  if (isKorean(a) && isKorean(b)) {
    return a.localeCompare(b, "ko");
  }
  if (isKorean(a) || isKorean(b)) {
    return isKorean(a) ? -1 : 1;
  }
  if (isEnglish(a) && isEnglish(b)) {
    return compareEnglish(a, b);
  }
  if (isEnglish(a) || isEnglish(b)) {
    return isEnglish(a) ? -1 : 1;
  }
  return [a, b].sort()[0] === a ? -1 : 1;
};

const sortLetters = (a: string, b: string) => {
  const minLength = Math.min(a.length, b.length);
  for (let index = 0; index < minLength; index++) {
    const aLetter = a[index];
    const bLetter = b[index];
    if (compareLetterPriority(aLetter, bLetter) !== 0)
      return compareLetterPriority(aLetter, bLetter);
  }
  if (a.length === b.length) return 0;
  return a.length < b.length ? -1 : 1;
};

export default sortLetters;
