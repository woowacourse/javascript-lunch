describe("LunchInfoCard 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.get(".restaurant-list").invoke(
      "html",
      `
        <li class="restaurant">
          <div class="restaurant__category">
              <img src="./category-korean.png" alt="한식"/>
          </div>
          <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">피양콩할마니</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 10분 내</span>
              <p class="restaurant__description text-body">
                        평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩
                        할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은
                        평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선
                        맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은
                        건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만,
                        할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의
                        역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은
                        만큼 덜어 먹을 수 있게 준비돼 있다.
              </p>
          </div>
        </li>
    `
    );
  });

  it("초기 LunchInfoCard는 6개가 있다.", () => {
    cy.get(".restaurant-list").children(".restaurant").should("have.length", 1);
  });

  it("LunchInfoCard에는 점심 음식점 이름이 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__name")
      .should("have.text", "피양콩할마니");
  });

  it("LunchInfoCard에는 캠퍼스에서 음식점까지의 거리가 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__distance")
      .should("have.text", "캠퍼스부터 10분 내");
  });

  it("LunchInfoCard에는 점심 음식점 설명이 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__description")
      .should(
        "contain.text",
        "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩"
      );
  });
});
