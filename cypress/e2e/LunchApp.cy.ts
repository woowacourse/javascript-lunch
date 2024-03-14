import restaurantDetailJson from "../fixture/test.json";

describe("점심 뭐 먹지 앱 e2e 기능 테스트", () => {
  beforeEach(() => {
    cy.setLocalStorage(restaurantDetailJson).then(() => {
      cy.visit("/");
    });
  });

  context("초기 페이지 접속 기능", () => {
    it("GlobalNavigationBar는 초기에 렌더링 되어야 한다.", () => {
      cy.get("global-navigation-bar").should("be.visible");
    });

    it("탭 메뉴 및 요소 들은 초기에 렌더링 되어야 한다.", () => {
      cy.get("restaurant-tab").should("be.visible");
    });

    it("음식점 추가 모달은 초기에 렌더링 되지 않아야 한다.", () => {
      cy.get("#restaurant-add-modal").should("not.be.visible");
    });

    it("음식점 상세 정보 모달은 초기에 렌더링 되지 않아야 한다.", () => {
      cy.get("restaurant-detail-modal").should("not.be.visible");
    });
  });

  context("음식점 목록 확인 기능", () => {
    it(`초기 데이터와 생성된 음식점 갯수는 총 ${restaurantDetailJson.length}개로 서로 일치 한다.`, () => {
      cy.get("restaurant-item").should(
        "have.length",
        restaurantDetailJson.length
      );
    });
  });

  context("음식점 추가 기능", () => {
    it("헤더 내 GNB 버튼을 클릭하면 음식점 등록 모달이 등장한다", () => {
      cy.get("#gnb-button").click();

      cy.get("#restaurant-add-modal").should("be.visible");
    });

    it("음식점 목록에 새로운 음식점을 추가할 수 있다", () => {
      cy.get("#gnb-button").click();

      cy.get("common-dropdown #category-select").select("한식");
      cy.get("#name-input").type("새로운 한식당");
      cy.get("common-dropdown #distance-select").select("10");
      cy.get("#description-textarea").type("맛있는 한식");
      cy.get("#url-input").type("http://example.com");
      cy.get("#restaurant-add-form").submit();

      cy.get("restaurant-add-modal").should("not.exist");
      cy.get("restaurant-item").should(
        "have.length",
        restaurantDetailJson.length + 1
      );
    });

    it("취소하기를 누르면 Form이 초기화 된 후 모달이 사라져야 한다.", () => {
      cy.get("#gnb-button").click();

      cy.get("common-dropdown #category-select").select("한식");
      cy.get("#modal-cancel-button").click();

      cy.get("#restaurant-add-modal").should("not.be.visible");

      cy.get("#gnb-button").click();
      cy.get("common-dropdown #category-select").should("have.value", "");
    });
  });

  context("음식점 정보 유지 기능", () => {
    it("페이지가 새로고침 되어도 음식점 정보 들이 유지 되어야 한다.", () => {
      cy.reload();

      cy.get("restaurant-item").should(
        "have.length",
        restaurantDetailJson.length
      );
    });
  });

  context("음식점 정렬 및 필터 기능", () => {
    context("음식점 정렬만 수행하는 case", () => {
      it("이름순으로 정렬할 경우 모든 음식점 정보가 이름순으로 정렬된다.", () => {
        cy.get("common-dropdown #sorting-filter").select("이름순");

        cy.get("restaurant-item").then(($items) => {
          const names = [...$items].map(
            (item) => item.querySelector(".restaurant__name").textContent
          );
          const sortedNames = [...names].sort();

          expect(names).to.deep.equal(sortedNames);
        });
      });

      it("거리순으로 정렬할 경우 모든 음식점 정보가 거리순으로 정렬된다.", () => {
        cy.get("common-dropdown #sorting-filter").select("거리순");

        cy.get("restaurant-item").then(($items) => {
          const distances = [...$items].map((item) =>
            Number(
              item
                .querySelector(".restaurant__distance")
                .textContent.replace(/[^0-9]{1,}/, "")
            )
          );
          const sortedDistances = [...distances].sort((a, b) => a - b);
          expect(distances).to.deep.equal(sortedDistances);
        });
      });
    });

    context("음식점 필터링만 수행하는 case", () => {
      const categories = ["한식", "중식", "일식", "양식", "아시안", "기타"];

      categories.forEach((category) => {
        it(`${category}으로 필터링할 경우 모든 음식점 정보의 카테고리는 ${category}이다.`, () => {
          cy.get("common-dropdown #category-filter").select(category);

          cy.get("restaurant-item").each(($item) => {
            cy.wrap($item)
              .find("category-icon")
              .invoke("attr", "category")
              .should("equal", category);
          });
        });
      });

      it("전체를 누를 경우 모든 음식점 정보를 확인할 수 있어야 한다.", () => {
        cy.get("common-dropdown #category-filter").select("전체");

        cy.get("restaurant-item").should(
          "have.length",
          restaurantDetailJson.length
        );
      });
    });

    context("음식점 필터 후 정렬 하는 case", () => {
      it(`'한식' 카테고리를 필터링 후 '이름순'으로 정렬 시 이름 순으로 정렬된다.`, () => {
        cy.get("common-dropdown #category-filter").select("한식");
        cy.get("common-dropdown #sorting-filter").select("이름순");

        cy.get("restaurant-item").then(($items) => {
          const names = [...$items].map((item) =>
            item.querySelector(".restaurant__name").textContent.trim()
          );
          const sortedNames = [...names].sort();
          expect(names).to.deep.equal(sortedNames);
        });
      });

      it(`'한식' 카테고리를 필터링 후 '거리순'으로 정렬 시 거리 순으로 정렬된다.`, () => {
        cy.get("common-dropdown #category-filter").select("한식");
        cy.get("common-dropdown #sorting-filter").select("거리순");

        cy.get("restaurant-item").then(($items) => {
          const distances = [...$items].map((item) =>
            Number(
              item
                .querySelector(".restaurant__distance")
                .textContent.replace(/[^0-9.]/g, "")
            )
          );
          const sortedDistances = [...distances].sort((a, b) => a - b);
          expect(distances).to.deep.equal(sortedDistances);
        });
      });
    });

    context("음식점 정렬 후 필터링 하는 case", () => {
      const categories = ["중식", "전체"];
      const sortOptions = ["이름순", "거리순"];

      sortOptions.forEach((sortOption) => {
        categories.forEach((category) => {
          it(`${sortOption} 정렬 후 ${category} 카테고리로 필터링한다.`, () => {
            cy.get("common-dropdown #sorting-filter").select(sortOption);

            cy.get("common-dropdown #category-filter").select(category);

            if (category !== "전체") {
              cy.get("restaurant-item").each(($item) => {
                cy.wrap($item)
                  .find("category-icon")
                  .invoke("attr", "category")
                  .should("equal", category);
              });
            } else {
              cy.get("restaurant-item").should("exist");
            }
          });
        });
      });
    });

    context("모달을 통한 데이터 추가 후 정렬 및 필터링 유지 기능", () => {
      it("중식 - 거리순 선택 후 모달을 통해 데이터 추가", () => {
        cy.get("common-dropdown #category-filter").select("중식");
        cy.get("common-dropdown #sorting-filter").select("거리순");

        cy.get("#gnb-button").click();
        cy.get("#name-input").type("새 중식당");
        cy.get("common-dropdown #category-select").select("중식");
        cy.get("common-dropdown #distance-select").select("5");
        cy.get("#description-textarea").type("맛있는 중식");
        cy.get("#url-input").type("http://example.com");

        cy.get("#restaurant-add-form").submit();

        cy.get("restaurant-item")
          .first()
          .invoke("text")
          .should("include", "새 중식당");
      });

      it("중식 - 이름순 선택 후 모달을 통해 데이터 추가", () => {
        cy.get("common-dropdown #category-filter").select("중식");
        cy.get("common-dropdown #sorting-filter").select("이름순");

        cy.get("#gnb-button").click();
        cy.get("#name-input").type("가가 중식당");
        cy.get("common-dropdown #category-select").select("중식");
        cy.get("common-dropdown #distance-select").select("30");
        cy.get("#description-textarea").type("맛있는 중식");
        cy.get("#url-input").type("http://example.com");

        cy.get("#restaurant-add-form").submit();

        cy.get("restaurant-item")
          .first()
          .invoke("text")
          .should("include", "가가 중식당");
      });
    });

    context("카테고리 전환 시 정렬 유지 기능", () => {
      it("중식 카테고리에서 전체 카테고리로 이동 시 거리순 정렬 유지", () => {
        cy.get("common-dropdown #category-filter").select("중식");
        cy.get("common-dropdown #sorting-filter").select("거리순");

        cy.get("common-dropdown #category-filter").select("전체");

        cy.get("restaurant-item").then(($items) => {
          const distances = [...$items].map((item) =>
            Number(
              item
                .querySelector(".restaurant__distance")
                .textContent.replace(/[^0-9.]/g, "")
            )
          );
          const sortedDistances = [...distances].sort((a, b) => a - b);
          expect(distances).to.deep.equal(sortedDistances);
        });
      });

      it("중식 카테고리에서 전체 카테고리로 이동 시 이름순 정렬 유지", () => {
        cy.get("common-dropdown #category-filter").select("중식");
        cy.get("common-dropdown #sorting-filter").select("이름순");

        cy.get("common-dropdown #category-filter").select("전체");

        cy.get("restaurant-item").then(($items) => {
          const names = [...$items].map((item) =>
            item.querySelector(".restaurant__name").textContent.trim()
          );
          const sortedNames = [...names].sort();
          expect(names).to.deep.equal(sortedNames);
        });
      });
    });
  });

  context("음식점 상세 정보 확인 기능", () => {
    it("음식점 상세 정보를 확인할 수 있다", () => {
      cy.get("restaurant-item").first().click();

      cy.get("restaurant-detail-modal-content").should("be.visible");

      cy.get("restaurant-detail-modal-content").within(() => {
        cy.get("category-icon").should("exist");
        cy.get("star-icon").should("exist");
        cy.get(".restaurant__name").should("exist");
        cy.get("#restaurant-detail-distance").should("exist");
        cy.get(".restaurant__description").should("exist");
        cy.get("#restaurant-detail-url").should("exist");
      });
    });

    it("닫기를 누르면 모달이 닫힌다", () => {
      cy.get("restaurant-item").first().click();

      cy.get("restaurant-detail-modal-content").within(() => {
        cy.get("#modal-cancel-button").click();

        cy.get("restaurant-detail-modal-content").should("not.exist");
      });
    });
  });

  context("음식점 삭제 기능", () => {
    it("음식점을 삭제하고 목록에서 제거되었는지 확인한다", () => {
      let restaurantName = "";

      cy.get("restaurant-item")
        .first()
        .find(".restaurant__name")
        .invoke("text")
        .then((text) => {
          restaurantName = text;

          expect(restaurantName).not.to.be.empty;

          cy.get("restaurant-item").first().click();

          cy.get("#modal-delete-button").click();

          cy.get("restaurant-item")
            .first()
            .find(".restaurant__name")
            .invoke("text")
            .should((newText) => {
              expect(newText).not.to.equal(restaurantName);
            });

          cy.get("restaurant-item").should(
            "have.length",
            restaurantDetailJson.length - 1
          );
        });
    });
  });

  context("자주 가는 음식점 등록 기능", () => {
    it("별 아이콘을 클릭하면 채워진 별 이미지로 변경 되지만 다시 별 아이콘을 클릭하면 빈 별 이미지로 변경 된다.", () => {
      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("restaurant-item")
        .first()
        .find("star-icon>img")
        .invoke("attr", "alt")
        .should("equal", "favoriteStar");

      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("restaurant-item")
        .first()
        .find("star-icon>img")
        .invoke("attr", "alt")
        .should("equal", "nonFavoriteStar");
    });

    it("음식점 정보를 클릭하여 모달을 열었을 때, 모달 내 이미지와 음식점 정보의 별 이미지가 일치한다.", () => {
      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("restaurant-item")
        .first()
        .find("star-icon>img")
        .invoke("attr", "alt")
        .as("initialStarStatus");

      cy.get("restaurant-item").first().click();

      cy.get("restaurant-detail-modal").within(() => {
        cy.get("star-icon>img")
          .invoke("attr", "alt")
          .then((altText) => {
            cy.get("@initialStarStatus").should("equal", altText);
          });
      });
    });

    it("모달에서 별 이미지를 클릭하면, 모달과 음식점 정보의 별 이미지가 채워진 별로 변경된다.", () => {
      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("restaurant-item")
        .first()
        .find("star-icon>img")
        .invoke("attr", "alt")
        .should("equal", "favoriteStar");

      cy.get("restaurant-item").first().click();

      cy.get("#restaurant-detail-modal").find("star-icon>img").click();

      cy.get("#restaurant-detail-modal")
        .find("star-icon>img")
        .invoke("attr", "alt")
        .as("modalStarStatus");

      cy.get("restaurant-item")
        .first()
        .find("star-icon>img")
        .invoke("attr", "alt")
        .then((altText) => {
          expect(altText).equal("nonFavoriteStar");
          cy.get("@modalStarStatus").should("equal", "nonFavoriteStar");
        });
    });
  });

  context("모든 음식점/자주 가는 음식점 탭 기능", () => {
    it("처음 페이지를 방문 했을 때 '모든 음식점'이 탭 되어야 한다.", () => {
      cy.get("#all").should("have.attr", "isActiveTab", "true");

      cy.get("#favorite").should("have.attr", "isActiveTab", "false");
    });

    it("처음 페이지를 방문 했을 때 드롭 다운 들이 보여져야 한다.", () => {
      cy.get("#restaurant-dropdown-container").should("be.visible");
    });

    it("'자주 가는 음식점'을 탭하면 자주 가는 음식점으로 등록 된 item들만 필터링 되어 보여져야 한다.", () => {
      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("#favorite").click();

      cy.get("restaurant-item")
        .find("star-icon>img")
        .invoke("attr", "alt")
        .should("equal", "favoriteStar");
    });

    it("'자주 가는 음식점'을 탭하면 드롭 다운들은 보이지 않아야 한다.", () => {
      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("#favorite").click();

      cy.get("#restaurant-dropdown-container").should("not.be.visible");
    });

    it("'전체' 카테고리에 '거리순'으로 정렬되어 있는 상황에서 '자주 가는 음식점'을 탭한 후 '모든 음식점'을 탭하면 현재 카테고리 및 정렬 순서대로 item들이 보여져야 한다.", () => {
      cy.get("restaurant-item").then(($items) => {
        const sortedDistances = $items
          .map((_, item) =>
            Number(
              item
                .querySelector(".restaurant__distance")
                .textContent.replace(/[^0-9]/g, "")
            )
          )
          .get();

        cy.get("common-dropdown #category-filter").select("전체");
        cy.get("common-dropdown #sorting-filter").select("거리순");

        cy.get("#favorite").click();

        cy.get("#all").click();

        cy.get("restaurant-item").then(($newItems) => {
          const newSortedDistances = $newItems
            .map((_, item) =>
              Number(
                item
                  .querySelector(".restaurant__distance")
                  .textContent.replace(/[^0-9]/g, "")
              )
            )
            .get();

          expect(sortedDistances).to.deep.equal(newSortedDistances);
        });
      });
    });

    it("'자주 가는 음식점' 탭에 1개의 음식점이 있을 때, 첫 번째 음식점 정보의 별 아이콘을 클릭할 경우 음식점 목록은 총 0개다.", () => {
      cy.get("restaurant-item")
        .first()
        .find(".restaurant__name")
        .invoke("text")
        .as("firstFavoriteName");

      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("#favorite").click();

      cy.get("restaurant-item").first().click();

      cy.get("restaurant-detail-modal").find("star-icon>img").click();

      cy.get("restaurant-item").should("not.exist");
    });

    it("'자주 가는 음식점' 탭에 1개의 음식점이 있을 때, 첫 번째 음식점의 상세 정보에서 별 아이콘을 클릭할 경우 음식점 목록은 총 0개다.", () => {
      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("#favorite").click();

      cy.get("restaurant-item").first().find("star-icon>img").click();

      cy.get("restaurant-item").should("not.exist");
    });
  });
});
