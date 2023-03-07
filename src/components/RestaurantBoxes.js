class RestaurantBoxes extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
        ul {
          display: flex;
          flex-direction: column;
        
          padding: 0 16px;
          margin: 16px 0;
        }`;

    this.shadowRoot.innerHTML = '<ul id="restaurantList"></ul>';
    this.shadowRoot.append(componentStyle);
  }

  getRestaurant({ category, name, distance, description }) {
    return `<restaurant-box category="${category}" name="${name}" distance="${distance}" description="${description}"/>`;
  }

  restaurantListRender(restaurants) {
    this.shadowRoot.querySelector('#restaurantList').innerHTML = '';

    restaurants.forEach((restaurant) => {
      const restaurantTemplate = this.getRestaurant(restaurant);
      this.shadowRoot
        .querySelector('#restaurantList')
        .insertAdjacentHTML('beforeend', restaurantTemplate);
    });
  }
}

export default RestaurantBoxes;
