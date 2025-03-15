//e2e 테스트 추가
describe("E2E Test Group", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5175/");
    cy.viewport(1920, 1080);
    cy.get(".gnb .gnb__button").click();
    cy.get("#category").select("한식");
    cy.get("#name").type("한식가게이름");
    cy.get("#distance").select("5");
  });

  it("사용자가 카메고리, 이름, 이용시간을 정상적으로 입력한 경우 화면에 list가 추가된다.", () => {
    cy.get(".button-container button").eq(1).click();

    cy.get(".restaurant").should("exist").and("be.visible");
    cy.get(".restaurant__category").should("exist").and("be.visible");
    cy.get(".restaurant__name").should("exist").contains("한식가게이름");
    cy.get(".restaurant__info").should("exist").and("be.visible");
    cy.get(".restaurant__distance")
      .should("exist")
      .contains("캠퍼스부터 5분 내");
    cy.get(".restaurant__description").should("exist").and("be.visible");
  });

  it("사용자가 카메고리, 이름, 이용시간, 설명, URL을 정상적으로 입력한 경우 화면에 list가 추가된다.", () => {
    cy.get("#description").type("한식가게이름에 대한 설명글입니다.");
    cy.get("#link").type("https://www.naver.com/");

    cy.get(".button-container button").eq(1).click();

    cy.get(".restaurant").should("exist").and("be.visible");
    cy.get(".restaurant__category").should("exist").and("be.visible");
    cy.get(".restaurant__name").should("exist").contains("한식가게이름");
    cy.get(".restaurant__info").should("exist").and("be.visible");
    cy.get(".restaurant__distance")
      .should("exist")
      .contains("캠퍼스부터 5분 내");
    cy.get(".restaurant__description")
      .should("exist")
      .contains("한식가게이름에 대한 설명글입니다.");
  });

  it("이미 list가 추가된 상황에서 한번 더 폼 입력을 했을 때 리스트가 추가된다. ", () => {
    cy.get(".button-container button").eq(1).click();

    cy.get(".gnb .gnb__button").click();
    cy.get("#category").select("중식");
    cy.get("#name").type("중식가게이름");
    cy.get("#distance").select("15");
    cy.get(".button-container button").eq(1).click();

    cy.get(".restaurant")
      .should("have.length", 8) // 요소가 정확히 2개인지 확인
      .each(($el) => {
        cy.wrap($el).should("be.visible"); // 각 요소가 보이는지 확인
      });
  });

  it("'거리순' 필터링을 선택했을 때 음식점이 거리순으로 정렬되어 있는지 확인한다.", () => {
    cy.get(".button-container button").eq(1).click();

    cy.get("#sorting-filter").select("거리순");
    cy.get(".restaurant-list .restaurant .restaurant__distance").then(
      ($distances) => {
        const distances = $distances
          .toArray()
          .map((el) => parseInt(el.innerText.match(/\d+/)?.[0] || "0"));
        const sortedDistances = [...distances].sort((a, b) => a - b);
        expect(distances).to.deep.equal(sortedDistances);
      }
    );
  });

  it("한식 필터링을 선택했을 때 '한식' 카테고리의 음식점만 선택되었는지 확인한다.", () => {
    cy.get(".button-container button").eq(1).click();
    cy.get("#category-filter").select("한식");

    cy.get(".restaurant")
      .should("have.length", 2) // 요소가 정확히 2개인지 확인
      .each(($el) => {
        cy.wrap($el).should("be.visible"); // 각 요소가 보이는지 확인
      });
  });

  it("새로 만든 음식점을 선택해서 모달창에 정보가 되어있는지 확인하고 삭제한다.", () => {
    cy.get(".button-container button").eq(1).click();

    cy.get(".restaurant").eq(0).click();
    cy.get(".modal").should("exist");
    cy.get(".modal .button").eq(0).click();

    cy.get(".restaurant")
      .should("have.length", 7)
      .each(($el) => {
        cy.wrap($el).should("exist");
      });
  });

  it("즐겨찾기 버튼을 눌렀을 때 '자주가는 음식점'목록에 추가되는지 확인하고 '자주가는 음식점'목록에서 즐겨찾기 버튼을 해제했을 때 아이템이 사라지는지 확인한다.", () => {
    cy.get(".button-container button").eq(1).click();

    cy.get(".restaurant").eq(0).find(".gnb__button").click();
    cy.get(".tab-button .tab-button_favorite").click();
    cy.get(".restaurant")
      .should("have.length", 1)
      .each(($el) => {
        cy.wrap($el).should("exist");
      });

    cy.get(".restaurant").eq(0).find(".gnb__button").click();
    cy.get(".tab-button .tab-button_favorite").click();
    cy.get(".restaurant")
      .should("have.length", 0)
      .each(($el) => {
        cy.wrap($el).should("exist");
      });
  });
});
