class Restaurant {
  // 카테 고리
  // 가게 이름
  // 거리
  // 설명(선택사항)
  // 참고링크(선택사항)
  #info;
  constructor({ category, name, distance, description, link }) {
    this.#info = { category, name, distance, description, link };
  }

  get info() {
    return {
      ...this.#info,
    };
  }
}

export default Restaurant;
