export function FoodItem({ imgSrc, imgAlt, name, distance, description }) {
  const container = document.createElement("div");
  container.innerHTML = `
     <li class="restaurant">
          <div class="restaurant__category">
            <img src=${imgSrc} alt=${imgAlt} class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>`;

  return container.firstElementChild;
}

/**
 *         <li class="restaurant">
          <div class="restaurant__category">
            <img src="./category-chinese.png" alt="중식" class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">친친</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 5분 내</span>
            <p class="restaurant__description text-body">Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다</p>
          </div>
        </li>
 */
