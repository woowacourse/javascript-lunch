# Observer

### 문제점

식당 목록 컴포넌트에서는 '식당 목록이 변경된다 -> 이를 로컬 스토리지에 저장한다.' 를 명시적으로 작성해야했습니다.

이를 간단한 옵저버 패턴으로 해결하고 싶었습니다. 옵저버 패턴은 미리 등록한 상태에 변화가 생길 때 상태 변화를 관찰하는 관찰자들에게 이를 알리는 디자인 패턴입니다.

### 사용 방법

1. 옵저버 등록

   ```ts
   const observer = new Observer<RestaurantType[]>({
     callback: (restaurants) => {
       this.setState({
         restaurants,
       });
       LocalStorage.set('restaurants', JSON.stringify(restaurants));
     },
   });
   ```

2. 상태 변경

   ```ts
   this.#restaurantObserver.notify([...this.state.restaurants, restaurant]);
   ```

3. 옵저버에서 등록한 콜백 함수 실행

### 후기

옵저버 패턴에 대해 완벽히 숙지하지 못해 아직은 제대로 활용을 못하고 있는 것 같습니다 😂

다음 번에는 옵저버 패턴을 완벽하게 익혀서 제대로 적용해보고 싶습니다 :)
