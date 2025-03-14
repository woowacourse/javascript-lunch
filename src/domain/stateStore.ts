interface RestaurantState {
  sort: string;
  category: string;
  tab: string;
}

interface StateStore {
  restaurantState: RestaurantState;
  updateState: (stateKey: string, state: string) => void;
  initState: () => void;
  getState: () => RestaurantState;
}

const stateStore: StateStore = {
  restaurantState: {
    sort: 'name',
    category: '',
    tab: '',
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
    currentState.category = '';
    currentState.tab = '';
  },

  getState() {
    return { ...this.restaurantState };
  },
};

export default stateStore;
