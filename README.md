# javascript-lunch

우아한테크코스 레벨1 점심 뭐 먹지 미션

배포링크 : 점심뭐먹지 바로가기

폴더구조 domains/entities Restaurant : 레스토랑 정보를 담은 값객체 입니다. RestaurantCollection : Restaurant의 일급콜렉션입니다. 정렬, 필터 기능이 존재합니다. 클래스간 결합도를 낮추기위해 입출력간(게터,세터)에는 JS원시 object로 바꿔서 입출력을 하였습니다.

domains/services RestaurantDBService : 레스토랑목록정보를 받아오거나, 저장합니다. (내부적으로 RestaurantCollection을 사용합니다. ) components (customElements) Header : 헤더부입니다. FilterContainer : 카테고리필터링, 정렬을 위한 드롭다운입니다. RestaurantList : 음식점 목록들을 보여주는 부분입니다. NewRestaurantModal : 새 레스토랑 추가시 발생하는 모달창입니다. x Basic폴더 : 재사용가능한 컴포넌트들을 담습니다. 사용시에는 생성자를 호출하여 엘리먼트를 만들어 사용합니다. components에서 도메인을 사용할땐 RestaurantDBServices만을 사용하고, Restaurant나 RestaurantCollection에는 의존하지 않습니다.

index.js : components(customElements)들을 import하여 정의문이 호출되게끔합니다. index.html : customElements들을 태그로 사용합니다.

✅ 도메인 구현사항

cypress로 TDD를 적용하였습니다. 단위 테스트를 적용하였습니다. e2e테스트는 현재 localStorage와의 연동 부분을 적용하였습니다. localStorage와의 연동 테스트간에는 모킹을 적용해주었습니다. ❓localStorage 연동 테스트코드에 모킹(cypress.stub)을 해준 이유?

기본적으로 모킹은 피할수있으면 피하는 편이지만, 만약 모킹을해주지않을경우테스트코드 실행을하고나면 저장해둔 음식점목록들이 날아가거나 변하기 때문에테스트코드가 '이미저장된 음식점들'에 영향을 주지않는게 좋다고 판단하여 모킹 하였습니다. ✅ 웹뷰 구현사항

웹컴포넌트 사용. 적절한 수준의 동적렌더링을위해, 웹컴포넌트(customElements)를 사용하였습니다. customElements의 적용 자체는 보일러 플레이트가 거의 없어 합리적이라 판단하였습니다. 재사용가능한 컴포넌트재사용가능한 컴포넌트를 만들어보는건 어떨까 하는 마음에, 재사용가능하게 만들어 보았습니다. (Basic 폴더에 들어있습니다.) 😥 아쉬운점

이번에는 TS를 도메인, 웹뷰 등 전체에 적용하고, 웹컴포넌트 등을 조금 더 널리 적용해보는 시도를 하였습니다. 다만 이들을 여러가지 적용해보다보니 시간이 부족했습니다.

코드가 깔끔하다는 느낌이 들게 정돈하지는 못한 면이 있고, 특히 NewRestaurantModal파일이 꽤 긴상태입니다. 그래서 리팩토링할 예정입니다.

😥 어려웠던점 TS document.querySelector로 선택한 커스텀엘리먼트의 타입을 지정해주는 것이 어려웠고당시에는 as로 타입단언으로 조치하였으나 더 좋은방법이있을거같아, 고민을 하고 있습니다. (NewRestaurantModal.ts 파일 내)

웹컴포넌트가 마치 어렵지않게 클래스형 컴포넌트처럼, 클래스속성도 활용하여 엘리먼트를 만들수있는것으로 보입니다. 그래서 그렇게 시도해봤는데, 웹컴포넌트에 대한 이해도가 부족하여 능숙하게 다루지 못했던 점과, 조금 과하게 사용하느라 오히려 가독성 or 단순성을 해친부분은 없을지 고민하고있습니다.
