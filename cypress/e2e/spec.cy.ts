class Restaurant {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

describe('레스토랑 클래스', () => {
  it('성공 케이스', () => {
    const restaurant = new Restaurant('맛집 레스토랑');
    expect(restaurant.getName()).to.equal('맛집 레스토랑');
  });
});
