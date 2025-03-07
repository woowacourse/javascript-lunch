# 🤔 점심 뭐 먹지?

### 기능 목록

- [x] 헤더 메뉴 버튼 클릭 시, 모달 창 열기
- [x] 음식점 정보 입력 받기
- [x] "추가하기" 버튼 클릭 시 새로운 음식점 추가
- [x] 메인창에 새로운 음식점 표시
- [x] "취소하기" 버튼 클릭 시 모달 창 닫고 입력 내용 초기화
- [x] 입력값 잘못 입력 시, 사용자에게 alert창으로 안내

### 컴포넌트화

- [x] storeItem : 메인에 표시되는 각 스토어 정보
- [x] optionInput, textArea, textInput : 모달창에 사용되는 Input 태그
- [x] button : 모달 창 버튼

## E2E 테스트

- [x] 모달창 "추가하기" 버튼 클릭 시 메인창에 새로운 음식점이 표시된다.
  - [x] 설명과 참고 링크 없이도 음식점이 추가되어야 한다.
  - [x] 카테고리, 이름, 거리를 입력하지 않은 경우 음식점이 추가되지 않아야 한다.
  - [x] 잘못된 값이 입력된 경우 alert 안내가 가야한다.
- [x] 헤더 "메뉴 아이콘" 클릭 시 모달창이 표시된다.
- [x] 모달 입력 태그에 값이 잘 들어간다.
- [x] 모달창 "취소하기" 버튼 클릭 시 모달창 입력값이 초기화된다.
