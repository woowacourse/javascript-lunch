# E2E

## 고민

- E2E란 무엇인가...

  - UI + domain을 테스트하는게 E2E인가? 아니면 단위 테스트인가?
    - 단위 테스트를 지금까지 할 때, "UI테스트는 하지 않는다."라고 되어 있었고, 프리코스의 테스트는 도메인과 UI까지 다 테스트하길래 UI와 도메인을 같이 테스트하면 E2E인가? 라는 의문이었습니다.
  - ~~시작부터 끝까지 테스트하니까 그럼 E2E는 테스트가 하나밖에 없나?~~
    - 여러 시나리오가 있으므로 시나리오마다 E2E는 테스트 케이스가 나올 수 있다!
  - E2E 하나만 있으면 단위 테스트는 자동으로 다 되는 거 아닌가?
    - 기능적으로는 어느 정도 맞는 말이지만, 개발자의 유지보수와 경험 측면에서 단위 테스트를 완전히 대체할 수 없다. E2E 테스트는 리소스 비용이 많이 들고, 방대하기 때문에 문제 발생 지점을 한 번에 알 수 없기 때문이다.
  - 현업에서는 어느 시점에 E2E 테스트를 작성하기로 결정하는가? 기획이 계속해서 바뀜에 따라 예전에 만들어둔 E2E 테스트 코드가 수정되어야 하고, 심할 경우에는 아예 버려야 하는 상황이 여러 번 생길 수 있을 것 같다. TDD로 E2E 테스트를 하는 경우가 많은지?

- 레스토랑 정보 입력하는 모달을 display:none으로 할지, 동적으로 DOM에 추가하고 삭제할지?
  - 후자를 선택하기로 했다.
    - 그 이유는 개발자의 의도가 사용자가 개발자 도구를 켜서 DOM을 조작해서 접근하는 것이 아니기 때문이다.
    - Header의 버튼을 클릭해서 접근해야 하는 modal이라고 생각하기에 동적으로 추가 및 삭제 하기로 함

## E2E 시나리오

- 모달을 열고 레스토랑 정보를 성공적으로 입력해서 추가하는 케이스
- 모달을 열고 레스토랑 정보를 잘못 입력해서 실패하는 케이스
- 모달을 열고 모달을 overlay로 닫는 케이스
- 모달을 열고 모달을 취소하기 버튼으로 닫는 케이스

# 단위 테스트

- 모달이 잘 열리는지
- 모달이 overlay로 잘 닫히는지
- 모달이 취소하기 버튼으로 잘 닫히는지

# Component

### css 스타일링

- text
- button

```ts

interface Restaurant {
    name: string;
    category: string;
    distance: string;
    description?: string;
    link?: string;
}

interface data: Restaurant[]


// 하나의 컴포넌트 단위
- Container
    - props: label, required, children
    <Container label={label} required={true}>
        <input value="" />
        <hintText>
    </Container>
```

### 기능 구현 목록

- [x] 헤더

  - [x] 점심 뭐 먹지 타이틀
  - [x] 추가 아이콘

- [x] 음식점 리스트

  - [x] 음식점 아이템
    - [ ] 카테고리 (required)
    - [ ] 이름 (required)
    - [ ] 거리(도보 이동 시간) (required)
    - [ ] 설명

- [ ] 새로운 음식점 추가하는 모달
  - [ ] 카테고리 (required)
    - Container (label, required), option
    - [ ] 유효성 검사
      - [ ] 선택 무조건 하나 하기
  - [ ] 이름 (required)
    - Container (label, required), text input
    - [ ] 유효성 검사
      - [ ] 1글자 이상, 10글자 이하
  - [ ] 거리(도보 이동 시간) (required)
    - Container (label, required), option
    - [ ] 유효성 검사
      - [ ] 선택 무조건 하나 하기
  - [ ] 설명
    - Container (label, required), textarea, hint text
    - 0자 이상, 300자 이하
  - [ ] 참고 링크
    - Container (label, required), textarea, hint text
    - 0자 이상
    - 정규표현식 써서 링크 형식인지 맞추기?
  - [ ] 취소 버튼
  - [ ] 추가 버튼
