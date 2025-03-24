export interface State {
  id: number;
  category: string;
  name: string;
  distance: number;
  description: string;
  link: string;
  isFavorite: boolean;
}

export type RestaurantModalData = Omit<State, 'distance'> & {
  distance: string;
  image: string;
};

const initialState: State = {
  id: 7,
  category: '',
  name: '',
  distance: 0,
  description: '',
  link: '',
  isFavorite: false,
};

const stateStore = {
  state: { ...initialState },

  updateState(newState: State) {
    this.state = newState;
  },

  initState() {
    this.state = { ...initialState };
  },

  getState(): State {
    return { ...this.state };
  },
};

export default stateStore;
