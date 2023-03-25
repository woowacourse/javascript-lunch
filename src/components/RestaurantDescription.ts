class RestaurantDescription {
  private state = {
    container: '',
  };

  constructor(state: { container: string }) {
    this.state = state;
  }

  render() {}

  template(description: string) {
    /* html */
    return `
			<p class="restaurant__description text-body">
				${description}
			</p>
		`;
  }
}

export default RestaurantDescription;
