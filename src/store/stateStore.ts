export interface State {
  category: string;
  name: string;
  distance: number;
  description: string;
  link: string;
}

const stateStore = {
  state: {
    category: '',
    name: '',
    distance: 0,
    description: '',
    link: '',
  } as State,

  updateState(newState: State) {
    this.state = newState;
  },

  initState() {
    this.state = {
      category: '',
      name: '',
      distance: 0,
      description: '',
      link: '',
    };
  },

  getState(): State {
    return { ...this.state };
  },
};

export default stateStore;
