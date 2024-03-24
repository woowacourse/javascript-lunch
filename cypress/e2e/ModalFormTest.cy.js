const RESTAURANT_ADD_FORM = "#restaurant-add-form";
const ADD_BUTTON = ".gnb__button";
const NAME_INPUT = "#name";
const DISTANCE_SELECT = "#distance-select";
const CATEGORY_SELECT = "#category-select";
const RESTAURANT = ".restaurant";
const MODAL = ".modal";

describe("음식점 추가 폼 입력 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
  });
  it("음식점 추가 폼에서 카테고리를 선택하지 않고 폼을 제출한 경우 그 아래에 에러메세지를 띄운다.", () => {
    cy.get(ADD_BUTTON).click();
    cy.get(NAME_INPUT).type("스타벅스");
    cy.get(DISTANCE_SELECT).select("5분 내");
    cy.get(RESTAURANT_ADD_FORM).submit();

    cy.get("#category-select-error-message")
      .scrollIntoView()
      .should("be.visible");
  });

  it("음식점 추가 폼에서 거리를 선택하지 않고 폼을 제출한 경우 그 아래에 에러메세지를 띄운다.", () => {
    cy.get(ADD_BUTTON).click();
    cy.get(NAME_INPUT).type("스타벅스");
    cy.get(CATEGORY_SELECT).select("한식");
    cy.get(RESTAURANT_ADD_FORM).submit();
    cy.get("#distance-select-error-message")
      .scrollIntoView()
      .should("be.visible");
  });

  it("음식점 추가 폼에서 이름을 입력하지 않은 경우 에러메세지를 띄운다.", () => {
    cy.get(ADD_BUTTON).click();
    cy.get(CATEGORY_SELECT).select("한식");
    cy.get(DISTANCE_SELECT).select("5분 내");
    cy.get(RESTAURANT_ADD_FORM).submit();
    cy.get("#error-message").scrollIntoView().should("be.visible");
  });

  it("음식점 추가 폼에서 중복된 이름을 입력한 경우 alert 창을 띄운다.", () => {
    cy.get(ADD_BUTTON).click();

    cy.get(NAME_INPUT).type("피양콩 할마니");
    cy.get(CATEGORY_SELECT).select("한식");
    cy.get(DISTANCE_SELECT).select("5분 내");

    cy.get(RESTAURANT_ADD_FORM).submit();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("이미 존재하는 식당입니다!");
    });
  });

  it("음식점 추가 폼에서 잘못된 링크 형식을 입력한 경우 alert 창을 띄운다.", () => {
    cy.get(ADD_BUTTON).click();

    cy.get(NAME_INPUT).type("피양콩");
    cy.get(CATEGORY_SELECT).select("한식");
    cy.get(DISTANCE_SELECT).select("5분 내");
    cy.get("#link").type("naver.com");

    cy.get(RESTAURANT_ADD_FORM).submit();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("유요하지 않은 링크 형식입니다.");
    });
  });

  it("등록하기 버튼을 클릭할 때 해당 음식점이 음식점 목록에 추가된다.", () => {
    cy.get(ADD_BUTTON).click();
    cy.get(NAME_INPUT).type("스타벅스");
    cy.get(CATEGORY_SELECT).select("한식");
    cy.get(DISTANCE_SELECT).select("5분 내");
    cy.get(RESTAURANT_ADD_FORM).submit();

    cy.contains(".restaurant-list li", "스타벅스").should("exist");
  });

  it("등록 모달창 밖을 클릭할 때 모달창이 닫힌다.", () => {
    cy.get(ADD_BUTTON).click();
    cy.get(".back-addForm").click({ force: true });
    cy.get(MODAL).should("not.be.visible");
  });

  it("등록 모달창 취소하기 버튼을 클릭할 때 모달창이 닫힌다.", () => {
    cy.get(ADD_BUTTON).click();
    cy.get("#reset-button").click();
    cy.get(MODAL).should("not.be.visible");
  });
});

describe("음식점 디테일 폼 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
  });
  it("음식점 디테일 모달창 밖을 클릭할 때 모달창이 닫힌다.", () => {
    cy.get(RESTAURANT).first().click();
    cy.get(".back-detail").click({ force: true });
    cy.get(MODAL).should("not.be.visible");
  });

  it("음식점 디테일 모달창 닫기 버튼을 클릭할 때 모달창이 닫힌다.", () => {
    cy.get(RESTAURANT).first().click();
    cy.get("#close-modal").click({ force: true });
    cy.get(MODAL).should("not.be.visible");
  });

  it("삭제하기 버튼을 클릭할 때 해당 음식점이 음식점 목록에 제거된다.", () => {
    cy.get(RESTAURANT).then((restaurants) => {
      const initialCount = restaurants.length;

      cy.get(RESTAURANT).first().click();
      cy.get("#delete-button").click({ force: true });

      cy.get(RESTAURANT).should((restaurantsAfterDelete) => {
        expect(restaurantsAfterDelete.length).to.eq(initialCount - 1);
      });
    });
  });
});
