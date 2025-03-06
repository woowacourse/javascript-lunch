# 🚀 점심 뭐 먹지?

## 🎯 기능 요구 사항

> 점심 식사 스팟 목록을 관리하는 앱을 만든다.

<br>

## 🍱 새로운 음식점 추가하기

### 1. 음식점 추가 모달 창을 띄우기

- [x] 음식점 목록에서 우측 상단의 추가 버튼을 누르면 모달 창이 뜬다.
- [x] 모달 배경을 누르거나 취소하기를 누르면 모달 창이 닫힌다.

### 2. 음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가하기

- [x] 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
  - [x] 카테고리, 이름, 거리는 입력 필수
  - [x] 카테고리는 `"한식", "중식", "일식", "아시안", "양식", "기타"` 중 하나를 선택한다.
  - [x] 거리는 캠퍼스로부터 도보로 걸리는 시간(분)이며, `5, 10, 15, 20, 30` 중 하나를 선택한다.
  - [x] 설명, 참고 링크는 옵션이며, 입력하지 않아도 음식점을 추가할 수 있어야 한다.

### 3. 새로고침 처리하기

- [x] 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.

### 4. 입력값 오류 처리하기

- [ ] 입력값이 잘못되었을 때 사용자에게 alert 창을 띄워 알려준다.

<br>

## 📝 커밋 메시지

- feat : 새로운 기능을 추가한 경우
- fix : 버그 수정
- docs : 문서를 수정한 경우
- style : 코드 스타일, 포멧, 주석을 변경
- refactor : 코드 리팩토링
- test : 테스트 관련 코드를 수정한 경우
- chore : 코드 수정이 아닌, 단순 폴더명 파일명 등을 수정한 경우
