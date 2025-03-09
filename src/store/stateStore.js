const stateStore = {
  state: {
    category: '',
    name: '',
    distance: 0,
    description: '',
    link: '',
  },

  updateState(newState) {
    this.state = newState;
  },

  initState() {
    const currentState = this.state;

    currentState.category = '';
    currentState.name = '';
    currentState.distance = 0;
    currentState.description = '';
    currentState.link = '';
  },

  getState() {
    return { ...this.state };
  },
};

export default stateStore;
