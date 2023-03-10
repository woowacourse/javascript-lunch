describe("카테고리 필터 기능 테스트", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "list",
      JSON.stringify([
        { name: "라식당", category: "중식", distance: "10", description: "쌀국수 드세요", link: "", stared: false },
        { name: "나식당", category: "한식", distance: "15", description: "쌀국수 드세요", link: "", stared: false },
        { name: "가식당", category: "아시안", distance: "10", description: "쌀국수 드세요", link: "", stared: false },
        { name: "마식당", category: "한식", distance: "25", description: "쌀국수 드세요", link: "", stared: false },
        { name: "바식당", category: "양식", distance: "30", description: "쌀국수 드세요", link: "", stared: false },
        { name: "다식당", category: "한식", distance: "20", description: "쌀국수 드세요", link: "", stared: false },
        { name: "사식당", category: "중식", distance: "20", description: "쌀국수 드세요", link: "", stared: false },
      ])
    );
    cy.visit("http://localhost:8080/");
  });

  it("한식 카테고리 이름순(기본)으로 정렬 기능", () => {
    cy.get("#category-filter").select("한식");
    cy.get(".restaurant-list")
      .find(".restaurant__name") // 각 식당 아이템의 이름 엘리먼트 선택
      .then(($names) => {
        const nameArray = [];
        for (let i = 0; i < $names.length; i++) {
          nameArray.push($names[i].innerText); // 이름을 배열에 저장
        }
        const list = JSON.parse(window.localStorage.getItem("list"));
        const categorizedArray = Array.from(list)
          .filter(({ category }) => category === "한식")
          .map(({ name }) => name)
          .sort();
        expect(nameArray).to.deep.equal(categorizedArray);
      });
  });

  it("중식 카테고리 이름순(기본)으로 정렬 기능", () => {
    cy.get("#category-filter").select("중식");
    cy.get(".restaurant-list")
      .find(".restaurant__name") // 각 식당 아이템의 이름 엘리먼트 선택
      .then(($names) => {
        const nameArray = [];
        for (let i = 0; i < $names.length; i++) {
          nameArray.push($names[i].innerText); // 이름을 배열에 저장
        }
        const list = JSON.parse(window.localStorage.getItem("list"));
        const categorizedArray = Array.from(list)
          .filter(({ category }) => category === "중식")
          .map(({ name }) => name)
          .sort();
        expect(nameArray).to.deep.equal(categorizedArray);
      });
  });
});
