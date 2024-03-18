describe("음식점 상세 정보를 확인할 수 있다.", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("음식점 상세 모달에서 카테고리, 이름, 거리, 설명, 참고 링크를 확인할 수 있다.", () => {
    cy.get("li[name=홍콩반점").click();

    const detailModal = cy.get("div.restaurant__detail[name=홍콩반점]");
    detailModal.get("h3.restaurant__name").contains("홍콩반점");
    detailModal
      .get("span.restaurant__distance")
      .contains("캠퍼스로부터 20분 내");
    detailModal
      .get("p.restaurant__description")
      .contains("정통 홍콩 스타일의 중국 요리");
    detailModal
      .get("img.category-icon")
      .should("have.attr", "src", "http://localhost:8080/category-chinese.png");

    detailModal
      .get("a.restaurant__link")
      .should("have.attr", "href", "https://www.woowacourse.io/");
  });

  it("음식점을 삭제할 수 있다.", () => {
    cy.get("ul.restaurant-list>li").should("have.length", 6);

    cy.get("li[name=맛있는콩나무").click();

    cy.get("div.restaurant__detail[name=맛있는콩나무]")
      .next()
      .children()
      .first()
      .click();

    cy.get(
      "#restaurant-detail-modal-container>div.modal>div.modal-container"
    ).should("not.have.class", "modal--open");

    cy.get("ul.restaurant-list>li").should("have.length", 5);
  });
});
