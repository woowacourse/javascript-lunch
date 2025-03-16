import { RestaurantState } from '../../types/domain';

type StateKey = keyof RestaurantState;
type State = RestaurantState[StateKey];

interface StateStore {
  restaurantState: RestaurantState;
  updateState: (stateKey: StateKey, state: State) => void;
  getState: () => RestaurantState;
}

const stateStore: StateStore = {
  restaurantState: {
    sort: 'name',
    category: '',
    isFavoriteTab: false,
  },

  updateState(stateKey, state) {
    if (!(stateKey in this.restaurantState)) {
      throw new Error('restaurantState에 존재하지 않는 key 입니다.');
    }

    this.restaurantState = {
      ...this.restaurantState,
      [stateKey]: state,
    };
  },

  getState() {
    return { ...this.restaurantState };
  },
};

export default stateStore;
