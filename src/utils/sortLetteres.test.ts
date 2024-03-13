import sortLetters from "./sortLetters";

describe("sortLetter 단위 테스트", () => {
  test.each([
    ["가", "나", ["가", "나"]],
    ["가", "가", ["가", "가"]],
    ["나", "가", ["가", "나"]],
  ])("한글을 오름차순으로 정렬한다.", (a, b, expected) => {
    // when
    const result = [a, b].sort(sortLetters);

    //then
    expect(result).toEqual(expected);
  });

  test.each([
    ["가", "a", ["가", "a"]],
    ["a", "가", ["가", "a"]],
    ["1", "가", ["가", "1"]],
    ["가", "1", ["가", "1"]],
  ])(
    "한글과 다른 언어가 있을 때 한글을 우선적으로 정렬한다.",
    (a, b, expected) => {
      // when
      const result = [a, b].sort(sortLetters);

      //then
      expect(result).toEqual(expected);
    }
  );

  test.each([
    ["A", "a", ["A", "a"]],
    ["a", "A", ["A", "a"]],
  ])(
    "같은 영어 대소문자가 있을 때 대문자를 앞으로 정렬한다.",
    (a, b, expected) => {
      // when
      const result = [a, b].sort(sortLetters);

      //then
      expect(result).toEqual(expected);
    }
  );

  test.each([
    ["a", "b", ["a", "b"]],
    ["b", "a", ["b", "a"]],
  ])("영어를 오름차순으로 정렬한다.", (a, b, expected) => {
    // when
    const result = [a, b].sort(sortLetters);

    //then
    expect(result).toEqual(expected);
  });

  test.each([
    ["a", "B", ["a", "B"]],
    ["b", "A", ["A", "b"]],
  ])(
    "영어가 같은 문자(ex: 'a'와'A')가 아닐 경우, 대소문자 상관없이 정렬한다.",
    (a, b, expected) => {
      // when
      const result = [a, b].sort(sortLetters);

      //then
      expect(result).toEqual(expected);
    }
  );

  test.each([
    ["a", "1", ["a", "1"]],
    ["1", "a", ["a", "1"]],
  ])("숫자보다 영어를 앞으로 정렬한다.", (a, b, expected) => {
    // when
    const result = [a, b].sort(sortLetters);

    //then
    expect(result).toEqual(expected);
  });

  test.each([
    ["0", "1", ["0", "1"]],
    ["1", "0", ["0", "1"]],
  ])("0은 1보다 앞으로 정렬한다.", (a, b, expected) => {
    // when
    const result = [a, b].sort(sortLetters);

    //then
    expect(result).toEqual(expected);
  });

  test.each([
    ["2", "1", ["1", "2"]],
    ["1", "2", ["1", "2"]],
  ])("숫자를 정렬한다.", (a, b, expected) => {
    // when
    const result = [a, b].sort(sortLetters);

    //then
    expect(result).toEqual(expected);
  });

  test.each([
    ["a", "aaaaa", ["a", "aaaaa"]],
    ["aaaaa", "a", ["a", "aaaaa"]],
  ])(
    "길이가 다른 문자열이 있을 때 짧은 문자열까지 우선순위가 같을 경우, 짧은 문자열을 앞으로 정렬한다.",
    (a, b, expected) => {
      // when
      const result = [a, b].sort(sortLetters);

      //then
      expect(result).toEqual(expected);
    }
  );
});
