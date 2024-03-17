describe("음식점 상세 정보 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".restaurant-list-container").children().first().click();
    cy.get("#restaurant-detail-wrapper").should("have.class", "modal--open");
  });

  it("음식점 목록 중 하나의 음식점을 클릭하면, 해당 음식점 상세 정보를 보여주는 모달이 렌더링된다.", () => {
    cy.get("div.restaurant-detail").should("contain", "도스타코스 선릉점");
  });

  it("음식점 상세 정보를 보여주는 모달에서 닫기 버튼을 클릭하면 모달이 사라진다.", () => {
    cy.get("#detail-close-button").click();

    cy.get("#restaurant-detail-wrapper").should("not.have.class", "modal--open");
  });

  it("음식점 상세 정보를 보여주는 모달에서 모달 영역 외부를 클릭하면 모달이 사라진다.", () => {
    cy.get("#restaurant-detail-backdrop").click("top", {
      force: true,
    });

    cy.get("#restaurant-detail-wrapper").should("not.have.class", "modal--open");
  });

  it("음식점 상세 정보를 보여주는 모달에서 삭제하기 버튼을 클릭하면 해당 음식점은 사라져야한다.", () => {
    const EXPECTED_RESTAURANT_LENGTH = 5;

    cy.get("#delete-button").click();

    cy.get(".restaurant-list-container").children().should("have.length", EXPECTED_RESTAURANT_LENGTH);
    cy.get("#restaurant-detail-wrapper").should("not.have.class", "modal--open");

    cy.get(".restaurant-list-container").children().first().should("contain", "이태리키친");
  });
});
