# javascript-lunch

우아한테크코스 레벨1 점심 뭐 먹지 미션

## CustomEvent 명세

### Global

#### insertData

LocalStorage에 데이터를 삽입하는 이벤트

- `AddRestForm` : 음식점 등록 버튼 클릭 시

#### FetchData

LocalStorage에서 데이터를 가져오는 이벤트

- global : 앱 시작 시
- `restFilterContainer` : 필터/정렬 변경 시

### CustomModal

#### openModal

CustomModal을 여는 이벤트

- `AppHeader` : 음식점 추가 버튼 클릭 시

#### closeModal (Caught in CustomModal)

CustomModal을 닫는 이벤트

- `AddRestForm` : 음식점 등록 버튼 클릭 시

### RestListContainer
