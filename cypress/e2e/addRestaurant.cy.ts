describe("음식점 목록에 새로운 음식점을 추가할 수 있다", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#add-restaurant-button").click();
  });

  const addRestaurant = ({
    nameValue,
    categoryValue,
    distanceValue,
    descriptionValue = "",
    linkValue = "",
  }) => {
    const form = cy.get(
      "#adding-restaurant-modal-container>div.modal>div.modal-container>form"
    );

    const category = form.get("div.form-item>select[name=category]");
    category.select(categoryValue, { force: true });

    const name = form.get("div.form-item>input[name=name]");
    name.type(nameValue);

    const distance = form.get("div.form-item>select[name=distance]");
    distance.select(distanceValue);

    const description = form.get("div.form-item>textarea[name=description]");
    descriptionValue && description.type(descriptionValue);

    const link = form.get("div.form-item>input[name=link]");
    linkValue && link.type(linkValue);

    form.get("div.button-container>button.button--primary").click();
  };

  it("음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가할 수 있다.", () => {
    addRestaurant({
      nameValue: "소코아",
      categoryValue: "일식",
      distanceValue: "10",
      descriptionValue: "아보카도와 새우가 들어간 냉우동이 맛있습니다.",
      linkValue: "https://map.naver.com/p/entry/place/1020669898",
    });

    cy.get("ul.restaurant-list").contains("소코아");
  });

  it("카테고리, 이름, 거리는 입력 필수이며, 입력하지 않으면 음식점을 추가할 수 없다.", () => {
    const form = cy.get(
      "#adding-restaurant-modal-container>div.modal>div.modal-container>form"
    );

    const category = form.get("div.form-item>select[name=category]");
    category.select("중식", { force: true });

    const name = form.get("div.form-item>input[name=name]");
    name.type("친친");

    form
      .get("div.button-container>button.button--primary")
      .click()
      .then(() => {
        cy.get("select:invalid").should("have.length", 1);
      });

    cy.get("div.form-item>input[name=name]").should("have.value", "친친");
    cy.get("#adding-restaurant-modal-container>div.modal").should(
      "have.class",
      "modal--open"
    );
  });

  it("설명, 참고 링크는 옵션. 입력하지 않아도 음식점을 추가할 수 있다.", () => {
    addRestaurant({
      nameValue: "얌샘김밥",
      categoryValue: "한식",
      distanceValue: "5",
    });

    cy.get("ul.restaurant-list").contains("얌샘김밥");
  });

  it("새로고침해도 추가한 음식점 정보들이 유지되어야 한다.", () => {
    addRestaurant({
      nameValue: "토마토파스타",
      categoryValue: "양식",
      distanceValue: "15",
    });

    cy.get("ul.restaurant-list").contains("토마토파스타");

    cy.reload();

    cy.get("ul.restaurant-list").contains("토마토파스타");
  });
});
