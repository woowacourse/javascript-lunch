describe("음식점 목록을 확인할 수 있다.", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("사용자가 selectBox에서 카테고리를 고르면, 음식점 목록이 해당 카테고리별로 필터링해서 보인다.", () => {
    cy.get(".restaurant-filter-container>.restaurant-filter[name=category]")
      .select("한식")
      .should("have.value", "한식");

    const result = cy.get("ul.restaurant-list").children();
    result.should("have.length", 1);
    result
      .get("li>div.restaurant__category>img")
      .should("have.attr", "alt", "한식");
  });

  it("사용자가 selectBox 에서 정렬 기준으로 이름순을 고르면, 음식점 목록이 이름순으로 보인다.", () => {
    cy.get(
      ".restaurant-filter-container>.restaurant-filter[name=sorting]"
    ).should("have.value", "이름순");
    const result = cy.get("ul.restaurant-list").children();
    result.should(($lis) => {
      expect($lis).to.have.length(6);
      expect($lis.eq(0)).to.contain("도쿄라면");
      expect($lis.eq(1)).to.contain("맛있는콩나무");
      expect($lis.eq(2)).to.contain("방콕맛집");
      expect($lis.eq(3)).to.contain("스페인타파스");
      expect($lis.eq(4)).to.contain("프렌치빌");
      expect($lis.eq(5)).to.contain("홍콩반점");
    });
  });

  it("사용자가 selectBox 에서 정렬 기준으로 거리순을 고르면, 음식점 목록이 거리순 보인다.", () => {
    cy.get(".restaurant-filter-container>.restaurant-filter[name=sorting]")
      .select("거리순")
      .should("have.value", "거리순");

    const result = cy.get("ul.restaurant-list").children();
    result.should(($lis) => {
      expect($lis).to.have.length(6);
      expect($lis.eq(0)).to.contain("5분");
      expect($lis.eq(1)).to.contain("10분");
      expect($lis.eq(2)).to.contain("15분");
      expect($lis.eq(3)).to.contain("15분");
      expect($lis.eq(4)).to.contain("20분");
      expect($lis.eq(5)).to.contain("30분");
    });
  });
});
