import { IRestaurant, Restaurant } from '../src/domain/Restaurant';
import RestaurantService from '../src/domain/RestaurantService';

describe('RestaurantService 객체 테스트', () => {
  test('addRestaurant 메서드는 Restaurant 객체를 필드 배열에 추가해준다.', () => {
    const restaurantService = new RestaurantService();

    restaurantService.addRestaurant({
      category: '중식',
      name: '친친',
      distance: 5,
    });

    expect(
      restaurantService
        .getRestaurantsInfo()
        .map((res) => res.getRestaurantInfo())
    ).toEqual([
      {
        category: '중식',
        name: '친친',
        distance: 5,
      },
    ]);
  });

  test('filterByCategory 메서드는 카테고리에 해당하는 restaurant 정보들을 반환한다.', () => {
    const restaurants: IRestaurant[] = [
      {
        category: '중식',
        name: '친친',
        distance: 5,
      },
      {
        category: '중식',
        name: '마담루소',
        distance: 20,
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 10,
      },
    ];
    const restaurantList = restaurants.map((res) => new Restaurant(res));

    const restaurantService = new RestaurantService(restaurantList);

    expect(
      restaurantService
        .filterByCategory(restaurantService.getRestaurantsInfo(), '중식')
        .map((res) => res.getRestaurantInfo())
    ).toEqual([
      {
        category: '중식',
        name: '친친',
        distance: 5,
      },
      {
        category: '중식',
        name: '마담루소',
        distance: 20,
      },
    ]);
  });

  test('sortByName 메서드는 restaurant 정보들을 이름을 기준으로 오름차순으로 정렬하여 반환한다.', () => {
    const restaurants: IRestaurant[] = [
      {
        category: '중식',
        name: '친친',
        distance: 5,
      },
      {
        category: '중식',
        name: '마담루소',
        distance: 20,
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 10,
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 30,
      },
    ];
    const restaurantList = restaurants.map((res) => new Restaurant(res));

    const restaurantService = new RestaurantService(restaurantList);

    expect(
      restaurantService
        .sortByName(restaurantService.getRestaurantsInfo())
        .map((res) => res.getRestaurantInfo())
    ).toEqual([
      {
        category: '중식',
        name: '마담루소',
        distance: 20,
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 10,
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 30,
      },
      {
        category: '중식',
        name: '친친',
        distance: 5,
      },
    ]);
  });

  test('sortByDistance 메서드는 restaurant 정보들을 걸리는 시간 기준으로 오름차순으로 정렬하여 반환한다.', () => {
    const restaurants: IRestaurant[] = [
      {
        category: '중식',
        name: '친친',
        distance: 5,
      },
      {
        category: '중식',
        name: '마담루소',
        distance: 20,
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 10,
      },
      {
        category: '한식',
        name: '선릉김밥',
        distance: 10,
      },
    ];
    const restaurantList = restaurants.map((res) => new Restaurant(res));

    const restaurantService = new RestaurantService(restaurantList);

    expect(
      restaurantService
        .sortByDistance(restaurantService.getRestaurantsInfo())
        .map((res) => res.getRestaurantInfo())
    ).toEqual([
      {
        category: '중식',
        name: '친친',
        distance: 5,
      },
      {
        category: '한식',
        name: '선릉김밥',
        distance: 10,
      },
      {
        category: '한식',
        name: '얌샘김밥',
        distance: 10,
      },
      {
        category: '중식',
        name: '마담루소',
        distance: 20,
      },
    ]);
  });
});
