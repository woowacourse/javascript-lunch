describe("정렬 필터 기능 테스트", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "list",
      JSON.stringify([
        { name: "라식당", category: "한식", distance: "10", description: "쌀국수 드세요", link: "", stared: false },
        { name: "나식당", category: "한식", distance: "15", description: "쌀국수 드세요", link: "", stared: false },
        { name: "가식당", category: "한식", distance: "10", description: "쌀국수 드세요", link: "", stared: false },
        { name: "마식당", category: "한식", distance: "25", description: "쌀국수 드세요", link: "", stared: false },
        { name: "바식당", category: "한식", distance: "30", description: "쌀국수 드세요", link: "", stared: false },
        { name: "다식당", category: "한식", distance: "20", description: "쌀국수 드세요", link: "", stared: false },
      ])
    );
    cy.visit("http://localhost:8080/");
  });

  it("이름순으로 정렬 기능", () => {
    cy.get("#sorting-filter").select("name");
    cy.get(".restaurant-list")
      .find(".restaurant") // 각 식당 아이템의 이름 엘리먼트 선택
      .then(($names) => {
        const nameArray = [];
        for (let i = 0; i < $names.length; i++) {
          nameArray.push($names[i].innerText); // 이름을 배열에 저장
        }
        const sortedArray = nameArray.slice().sort(); // 배열 복사 후 정렬
        expect(nameArray).to.deep.equal(sortedArray); // 정렬된 배열과 비교하여 순서가 맞는지 검증
      });
  });

  it("거리순으로 정렬 기능", () => {
    cy.get("#sorting-filter").select("distance");
    cy.get(".restaurant-list")
      .find(".restaurant") // 각 식당 아이템의 이름 엘리먼트 선택
      .then(($items) => {
        const distanceArray = [];
        for (let i = 0; i < $items.length; i++) {
          const distanceText = $items[i].querySelector(".restaurant__distance").innerText;
          const distance = parseInt(distanceText.replace(/[^0-9]/g, "")); // 거리 텍스트에서 숫자만 추출하여 정수형으로 변환
          distanceArray.push(distance); // 거리를 배열에 저장
        }
        const sortedArray = distanceArray.slice().sort((a, b) => a - b); // 배열 복사 후 거리순으로 정렬
        expect(distanceArray).to.deep.equal(sortedArray); // 정렬된 배열과 비교하여 순서가 맞는지 검증
      });
  });
});
