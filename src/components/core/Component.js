class Component {
  $target;
  props;
  state = {};
  #changedKeys = new Set();
  #stateToUIMap = {};

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.initialRender();
  }

  setup() {}

  componentDidMount() {}
  componentDidUpdate(changedKeys) {
    changedKeys.forEach((key) => {
      if (this.#stateToUIMap[key]) {
        this.#stateToUIMap[key]();
      }
    });
  }

  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };

    // 변경된 state 키 찾기
    this.#changedKeys.clear();
    Object.keys(newState).forEach((key) => {
      if (prevState[key] !== newState[key]) {
        this.#changedKeys.add(key);
      }
    });

    this.componentDidUpdate([...this.#changedKeys]);
  }

  /** 상태 변경 감시 */
  watchState(stateKey, callback) {
    this.#stateToUIMap[stateKey] = callback;
  }

  render() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());
  }

  initialRender() {
    this.render();
    this.componentDidMount();
  }

  template() {
    return "";
  }
}

export default Component;
