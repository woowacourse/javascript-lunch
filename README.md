## :다트: 기능 요구 사항

점심 식사 스팟 목록을 관리하는 앱을 만든다.

- [ ] 음식점 목록 페이지를 화면과 같이 구성한다.
- [ ] 음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄우면, 새로운 음식점을 추가할 수 있다.
  - [ ] 음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가할 수 있다.
  - [ ] 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
  - [ ] 카테고리, 이름, 거리는 입력 필수.
  - [ ] 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
  - [ ] 거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.
  - [ ] 설명, 참고 링크는 옵션. 입력하지 않아도 음식점을 추가할 수 있어야 한다.
  - [ ] 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 자유롭게 구현한다.
- [ ] 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.

### 컴포넌트 분리

- [ ] LunchInfoCard 컴포넌트
  - 아이콘, 점심밥 집 이름, 캠퍼스로부터 소요 시간, 설명
- [ ] SelectForm
  - 상단 라벨, 필수 표시, 선택 요소 리스트, 하단 설명
- [ ] InputForm
  - 상단 라벨, 필수 표시, placeholder, 하단 설명, 크기
- [ ] TextButton
  - 텍스트, 카테고리
- [ ] Modal
  - 위의 컴포넌트, 백드롭
- [ ] Header
- [ ] IconButton
  - 아이콘, onClick 함수

### E2E 명세

- [x] Header가 상단에 보이고, 점심 뭐먹지 라는 텍스트와 아이콘 컴포넌트가 보인다.
- [ ] LunchInfoCard의 요소 확인
  - 피양콩할마니, 캠퍼스로부터 10분 내, 설명
- [ ] LunchInfoCard의 개수를 확인한다. (5개)
- [ ] IconButton을 누르면 새로운 음식점 모달창이 생긴다.
- [ ] 모달창을 띄우면 여러 요소들이 보인다.
  - 새로운 음식점(title)
  - 카테고리 컴포넌트, 이름 입력 컴포넌트, 거리 컴포넌트, 설명 컴포넌트, 참고 링크
  - 취소하기, 추가하기 버튼
- [ ] 카테고리를 눌렀을 때 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
- [ ] 거리를 눌렀을 때 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.
- [ ] 이름, 설명, 참고링크에 값을 입력할 수 있다.
- [ ] 카테고리, 이름, 거리는 입력이 필수이다.
