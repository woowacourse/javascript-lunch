class RestaurantDistance {
  private state = {
    container: '',
  };

  constructor(state: { container: string }) {
    this.state = state;
  }

  render() {}

  template(distance: string) {
    /* html */
    return `
			<span class="restaurant__distance text-body">
				캠퍼스부터 ${distance}분 내
			</span>
		`;
  }
}

export default RestaurantDistance;
