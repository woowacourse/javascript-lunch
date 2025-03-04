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

- [ ] 헤더
  - [ ] 점심 뭐 먹지 타이틀
  - [ ] 추가 아이콘

- [ ] 음식점 리스트
  - [ ] 음식점 아이템
    - [ ] 카테고리 (required)
    - [ ] 이름 (required)
    - [ ] 거리(도보 이동 시간) (required)
    - [ ] 설명


- [ ] 새로운 음식점 추가하는 모달
  - [ ] 카테고리  (required)
    - Container (label, required), option
    - [ ] 유효성 검사
      - [ ] 선택 무조건 하나 하기
  - [ ] 이름  (required)
    - Container (label, required), text input
    - [ ] 유효성 검사
      - [ ] 1글자 이상, 10글자 이하
  - [ ] 거리(도보 이동 시간)  (required)
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
