describe('step2 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.viewport(1024, 768);
  });

  describe('카테고리 필터링 테스트', () => {
    it('기본 상태에서 모든 음식점이 보이는지 확인한다.', () => {
      cy.get('.restaurant-list .restaurant')
        .should('have.length', 6);
    });

    const categories = ['한식', '중식', '일식', '양식', '아시안', '기타'];
    describe('사용자가 각 필터를 선택하면 각 카테고리 음식점만 보인다.', () => {
      categories.forEach((category) => {
        it(`사용자가 '${category}' 필터를 선택하면 ${category} 카테고리 음식점만 보인다.`, () => {
          cy.get('#category-filter').select(category);

          cy.get('.restaurant-list .restaurant').each(($restaurant) => {
            cy.wrap($restaurant)
              .find('.restaurant__category img')
              .should('have.attr', 'alt', category);
          });
        });
      });
    });

    it('사용자가 한식 -> 중식 필터를 선택하면 중식 카테고리 음식점만 보인다.', () => {
      cy.get('#category-filter').select('한식');
      cy.get('#category-filter').select('중식');

      cy.get('.restaurant-list .restaurant').each(($restaurant) => {
        cy.wrap($restaurant)
          .find('.restaurant__category img')
          .should('have.attr', 'alt', '중식');
      });
    })

    it('사용자가 한식 → 전체 필터를 선택하면 모든 음식점이 보인다.', () => {
      cy.get('#category-filter').select('한식');
      cy.get('#category-filter').select('전체');

      cy.get('.restaurant-list .restaurant')
        .should('have.length', 6);
    })

    it('필터를 선택했을 때 존재하는 음식점이 없으면 빈 화면이 보인다.', () => {
      cy.get('.restaurant[data-id="1"]').click();
      cy.get('.modal--open').should('exist');
      cy.get('.delete-button').click();
      cy.get('.modal--open').should('not.exist');

      cy.get('#category-filter').select('한식');

      cy.get('.restaurant-list .restaurant')
        .should('have.length', 0);
    })

    it('필터를 선택했을 때 존재하는 음식점이 없으면 빈 화면이 보인다.', () => {
      cy.get('.restaurant[data-id="1"]').click();
      cy.get('.modal--open').should('exist');
      cy.get('.delete-button').click();
      cy.get('.modal--open').should('not.exist');

      cy.get('#category-filter').select('한식');

      cy.get('.restaurant-list .restaurant')
        .should('have.length', 0);
    })
  });

  describe('정렬 테스트', () => {
    it('기본 정렬이 이름순(가나다순)으로 적용되어 있는지 확인한다.', () => {
      cy.get('.restaurant-list .restaurant__name')
        .then(($names) => {
          const nameArray = $names.map((_, el) => Cypress.$(el).text()).get();
          const sortedArray = [...nameArray].sort();
          expect(nameArray).to.deep.equal(sortedArray);
        });
    })

    it('사용자가 거리순 정렬을 선택하면 가까운 거리순으로 음식점이 정렬된다.', () => {
      cy.get('#sorting-filter').select('거리순');

      cy.get('.restaurant-list .restaurant__distance').then(($distanceElements) => {
        const distanceArray = $distanceElements
          .map((_, el) => {
            const text = Cypress.$(el).text().trim();
            const numericValue = parseInt(text.replace(/\D/g, ''), 10);
            return numericValue;
          })
          .get();

        const sortedArray = [...distanceArray].sort((a, b) => a - b);
        expect(distanceArray).to.deep.equal(sortedArray);
      });
    });

    it('한식 필터를 적용한 후 거리순 정렬을 선택하면 한식 내에서 가까운 거리순으로 정렬된다.', () => {
      cy.get('.gnb__button').click();
      cy.get('.modal--open').should('exist');

      cy.get('#category').select('한식');
      cy.get('#name').type('꺼벙이');
      cy.get('#distance').select('5분 내');
      cy.get('#description').type('꺼벙이 분식');

      cy.get('.button--primary').click();

      cy.get('#category-filter').select('한식');
      cy.get('#sorting-filter').select('거리순');

      cy.get('.restaurant-list .restaurant__distance').then(($distanceElements) => {
        const distanceArray = $distanceElements
          .map((_, el) => {
            const text = Cypress.$(el).text().trim();
            const numericValue = parseInt(text.replace(/\D/g, ''), 10);
            return numericValue;
          })
          .get();

        const sortedArray = [...distanceArray].sort((a, b) => a - b);
        expect(distanceArray).to.deep.equal(sortedArray);
      });
    })
  });

  describe('자주 가는 음식점 탭 테스트', () => {
    it('사용자가 특정 음식점에 별을 누르고 자주 가는 음식점 탭을 클릭하면 해당 음식점만 보인다.', () => {
      cy.get('.restaurant-list .restaurant').first().as('firstRestaurant');

      cy.get('@firstRestaurant').find('.favorite-star').click();

      cy.get('#favorites').click();

      cy.get('.restaurant-list .restaurant').should('have.length', 1);

      cy.get('@firstRestaurant').find('.restaurant__name').invoke('text').then((restaurantName) => {
        cy.get('.restaurant-list .restaurant .restaurant__name').should('have.text', restaurantName);
      });
    });

    it('사용자가 아무 음식점도 즐겨찾기하지 않은 상태에서 자주 가는 음식점 탭을 선택하면 빈 화면이 보인다.', () => {
      cy.get('#favorites').click();
      cy.get('.restaurant-list .restaurant').should('not.exist');
    });

    it('자주 가는 음식점이 여러 개일 때, 하나씩 삭제할 때마다 목록이 정상적으로 업데이트되는지 확인한다.', () => {
      cy.get('.restaurant[data-id="1"]').find('.favorite-star').click();
      cy.get('.restaurant[data-id="2"]').find('.favorite-star').click();

      cy.get('#favorites').click();

      cy.get('.restaurant-list .restaurant').should('have.length', 2);

      cy.get('.restaurant[data-id="1"]').click();
      cy.get('.modal--open').should('exist');
      cy.get('.delete-button').click();
      cy.get('.modal--open').should('not.exist');

      cy.get('.restaurant-list .restaurant').should('have.length', 1);

      cy.get('.restaurant[data-id="2"]').click();
      cy.get('.modal--open').should('exist');
      cy.get('.delete-button').click();
      cy.get('.modal--open').should('not.exist');

      cy.get('.restaurant-list .restaurant').should('not.exist');
    });
  })

  describe('자주 가는 음식점 추가 테스트', () => {
    it('사용자가 음식점 리스트에서 별을 누르면 자주 가는 음식점에 추가되고, 자주 가는 음식점 탭을 눌렀을 때 추가한 음식점이 표시된다.', () => {
      cy.get('.restaurant-list .restaurant').first().as('firstRestaurant');

      cy.get('@firstRestaurant').find('.favorite-star').click();

      cy.get('#favorites').click();

      cy.get('.restaurant-list .restaurant').should('have.length', 1);

      cy.get('@firstRestaurant')
        .find('.restaurant__name')
        .invoke('text')
        .then((restaurantName) => {
          cy.get('.restaurant-list .restaurant .restaurant__name').should('have.text', restaurantName);
        });
    });

    it('사용자가 음식점 상세 모달에서 별을 누르면 자주 가는 음식점에 추가되고, 모달창을 닫고 자주 가는 음식점 탭을 눌렀을 때 추가한 음식점이 표시된다.', () => {
      cy.get('.restaurant-list .restaurant').first().as('firstRestaurant'); // 첫 번째 음식점 선택

      cy.get('@firstRestaurant').click();
      cy.get('.modal--open').should('exist');

      cy.get('.modal .favorite-star').click();
      cy.get('.close-button').click();
      cy.get('.modal--open').should('not.exist');
      cy.get('#favorites').click();

      cy.get('.restaurant-list .restaurant').should('have.length', 1);

      cy.get('@firstRestaurant')
        .find('.restaurant__name')
        .invoke('text')
        .then((restaurantName) => {
          cy.get('.restaurant-list .restaurant .restaurant__name').should('have.text', restaurantName);
        });
    });
  });

  describe('음식점 상세보기 테스트', () => {
    it('음식점을 클릭하면 해당 음식점의 상세 모달이 열린다.', () => {
      cy.get('.restaurant-list .restaurant').first().as('firstRestaurant').click();
      cy.get('.modal--open').should('exist');

      cy.get('@firstRestaurant')
        .find('.restaurant__name')
        .invoke('text')
        .then((restaurantName) => {
          cy.get('.restaurant__detail .restaurant .restaurant__name').should('have.text', restaurantName);
        });
    });

    it('닫기 버튼을 누르면 모달이 닫힌다.', () => {
      cy.get('.restaurant-list .restaurant').first().click();
      cy.get('.modal--open').should('exist');
      cy.get('.close-button').click();
      cy.get('.modal--open').should('not.exist');
    });

    it('ESC 키를 누르면 모달이 닫힌다.', () => {
      cy.get('.restaurant-list .restaurant').first().click();
      cy.get('.modal--open').should('exist');
      cy.get('body').type('{esc}');
      cy.get('.modal--open').should('not.exist');
    });

    it('모달 바깥을 클릭하면 모달이 닫힌다.', () => {
      cy.get('.restaurant-list .restaurant').first().click();
      cy.get('.modal--open').should('exist');

      cy.get('.restaurant-detail-modal .modal-backdrop').click();
      cy.get('.modal--open').should('not.exist');
    });
  });
});
