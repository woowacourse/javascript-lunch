// 디폴트 데이터가 수정되어도

// - 음식점 목록 중 하나의 음식점을 클릭하면, 해당 음식점 상세 정보를 보여주는 모달이 렌더링된다

// 해당 테스트가 통과될 수 있도록 한다.

describe("음식점 상세 정보 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("음식점 목록 중 첫번째 음식점을 클릭하면, 해당 음식점 상세 정보를 보여주는 모달이 렌더링된다.", () => {
    cy.get(".restaurant-list-container").children().first().click();

    cy.get("#restaurant-detail-wrapper").should("have.class", "modal--open");

    cy.get("div.restaurant-detail")
      .children()
      .first()
      .should("have.class", "restaurant__info");
  });

  it("음식점 상세 정보를 보여주는 모달에서 닫기 버튼을 클릭하면 모달이 사라진다.", () => {
    cy.get(".restaurant-list-container").children().first().click();

    cy.get("#detail-close-button").click();

    cy.get("#restaurant-detail-wrapper").should(
      "not.have.class",
      "modal--open"
    );
  });

  it("음식점 상세 정보를 보여주는 모달에서 모달 영역 외부를 클릭하면 모달이 사라진다.", () => {
    cy.get(".restaurant-list-container").children().first().click();

    cy.get("#restaurant-detail-backdrop").click("top", {
      force: true,
    });

    cy.get("#restaurant-detail-wrapper").should(
      "not.have.class",
      "modal--open"
    );
  });

  it("첫번째 음식점 상세 정보를 보여주는 모달에서 삭제하기 버튼을 클릭하면 해당 음식점은 사라져야한다.", () => {
    cy.get(".restaurant-list-container")
      .children()
      .then((children) => {
        const childLength = children.length;

        cy.get(".restaurant-list-container").children().first().click();

        cy.get("#delete-button").click();

        cy.get(".restaurant-list-container")
          .children()
          .should("have.length", childLength - 1);

        cy.get("#restaurant-detail-wrapper").should(
          "not.have.class",
          "modal--open"
        );
      });
  });

  it("사용자가 모든 음식점을 삭제하고, 새로고침할 경우 디폴트 데이터가 다시 보여진다.", () => {
    const DEFAULT_RESTAURANT_LENGTH = 6;
    const EMPTY_RESTAURANT_LENGTH = 0;

    cy.get(".restaurant-list-container")
      .children()
      .then((children) => {
        const childLength = children.length;
        console.log(childLength);
        Array.from({ length: childLength }, () => {
          cy.get(".restaurant-list-container").children().first().click();
          cy.get("#delete-button").click();
        });
      });

    cy.get(".restaurant-list-container")
      .children()
      .should("have.length", EMPTY_RESTAURANT_LENGTH);

    cy.reload();

    cy.get(".restaurant-list-container")
      .children()
      .should("have.length", DEFAULT_RESTAURANT_LENGTH);
  });
});
