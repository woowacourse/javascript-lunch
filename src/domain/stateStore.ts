interface RestaurantState {
  sort: string;
  category: string | null;
  isFavoriteTab: boolean;
}

type StateKey = keyof RestaurantState;
type State = RestaurantState[StateKey];

interface StateStore {
  restaurantState: RestaurantState;
  updateState: (stateKey: StateKey, state: State) => void;
  initState: () => void;
  getState: () => RestaurantState;
}

const stateStore: StateStore = {
  restaurantState: {
    sort: 'name',
    category: null,
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

  initState() {
    const currentState = this.restaurantState;

    currentState.sort = 'name';
    currentState.category = null;
    currentState.isFavoriteTab = false;
  },

  getState() {
    return { ...this.restaurantState };
  },
};

export default stateStore;
