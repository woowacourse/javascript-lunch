class RestaurantName {
  private state = {
    container: '',
  };

  constructor(state: { container: string }) {
    this.state = state;
  }

  render() {}

  template(name: string) {
    /* html */
    return `
			<h3 class="restaurant__name text-subtitle">
				${name}
			</h3>
		`;
  }
}

export default RestaurantName;
