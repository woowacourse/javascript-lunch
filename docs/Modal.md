# Modal & Portal

### 모달을 컴포넌트 외부에서 관리할 수 없을까?

모달은 기존 웹 화면을 가리고 앞에 놓는 특수한 컴포넌트입니다. 이 모달 컴포넌트를 기존 돔 트리와 구분해서 관리하고 싶었습니다. 기존 돔트리와 격리해 모달을 렌더링함으로써 CSS 스타일 상속을 방지하여 독립적인 렌더링 컨텍스트를 만들고 싶었습니다.

이를 [Portal](../src/lib/modules/Portal.ts)를 통해 해결했습니다.

1. html파일에 포탈로 만들고 싶은 태그의 id값을 설정합니다.
2. 생성자 함수에서 1번의 id를 넘겨 원하는 요소를 찾습니다.
3. `append(element)`를 실행 시 포탈에 원하는 요소를 삽입합니다.
4. `clear()`를 실행 시 포탈 내부 요소를 제거합니다.

### 사용 방법

```ts
// Modal.ts
export default class Modal {
  // ..
  open() {
    this.#portal.append(this.element);
  }
}
```

```ts
// Modal.ts
export default class Modal {
  // ..
  remove() {
    this.#portal.clear();
  }
}
```

### 모달이 열리면 외부 화면은 스크롤이 안되고, 모달 내부만 스크롤 되어야한다.

모달이 열리면 모달 외부 body의 스크롤이 안되도록 합니다.

```ts
// Modal.ts
export default class Modal {
  // ..
  open() {
    document.body.style = 'overflow:hidden';
  }
}
```

```ts
// Modal.ts
export default class Modal {
  // ..
  remove() {
    document.body.style = 'overflow:scroll';
  }
}
```

모달 내부는 스크롤이 가능합니다.

```css
// style.css
.modal-container {
  max-height: 100%;
  overflow: scroll;
}
```
