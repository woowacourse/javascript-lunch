describe("restaurantDetailModal 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "restaurantList",
          JSON.stringify([
            {
              category: "한식",
              name: "공원",
              distance: 2000,
              description: "😠",
              link: "https://www.naver.com/",
            },
            {
              category: "한식",
              name: "해먼드",
              distance: 5,
              description: "😆",
              link: "https://www.naver.com/",
            },
            {
              category: "한식",
              name: "수이",
              distance: 10,
              description: "💖",
              link: "https://www.naver.com/",
            },
          ])
        );
      },
    });
  });

  it("공원을 클릭하면 상세 정보가 포함된 모달이 열린다", () => {
    cy.get("#restaurant_공원").click();
    cy.get("#restaurantModal_공원").should("exist");
    cy.get(".restaurant__detail .restaurant__name").should("have.text", "공원");
    cy.get(".restaurant__detail .restaurant__distance").should(
      "have.text",
      "캠퍼스부터 2000분 내"
    );
    cy.get(".restaurant__detail .restaurant__detail__description").should(
      "have.text",
      "😠"
    );
    cy.get(".restaurant__detail .restaurant__detail__link").should(
      "have.text",
      "https://www.naver.com/"
    );
  });

  it("수이를 삭제한다", () => {
    cy.get("#restaurant_수이").should("exist");
    cy.get("#restaurant_수이").click();
    cy.get("#remove__button").click();
    cy.get("#restaurant_수이").should("not.exist");
  });
});
