import { RestaurantState } from '../../types/domain';

interface StateStore {
  restaurantState: RestaurantState;
  updateState: (state: Partial<RestaurantState>) => void;
  getState: () => RestaurantState;
}

const stateStore: StateStore = {
  restaurantState: {
    sort: 'name',
    category: '',
    isFavoriteTab: false,
  },

  updateState(state) {
    const keys = Object.keys(state);
    keys.forEach((key) => {
      if (!(key in this.restaurantState)) {
        throw new Error('restaurantState에 존재하지 않는 key 입니다.');
      }
    });

    this.restaurantState = {
      ...this.restaurantState,
      ...state,
    };
  },

  getState() {
    return { ...this.restaurantState };
  },
};

export default stateStore;
