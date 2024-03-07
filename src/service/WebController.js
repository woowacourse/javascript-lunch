// WebView, Domain을 중개하는

import RestaurantManager from '../domain/RestaurantManager';
import WebView from '../view/WebView';
import { RESTAURANT_FORM_EVENTS } from '../view/components/RestaurantForm';
import { SELECT_EVENTS } from '../view/components/Select';

export default class WebController {
  #webView;

  #restaurantManger;

  constructor() {
    this.#webView = new WebView();
    this.#restaurantManger = new RestaurantManager();
  }

  async start() {
    document.addEventListener(RESTAURANT_FORM_EVENTS.submit, (e) => {
      const { formData } = e.detail;
      // localStorage 업데이트
      this.#updateLocalStorage(formData);

      // domain 업데이트
      this.#restaurantManger.restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
    });
    // document.addEventListener(SELECT_EVENTS.onchange, (e) => {
    //   const { detail } = e;
    // });
  }

  #updateLocalStorage(restaurant) {
    const curData = window.localStorage.getItem('restaurants');
    if (curData) {
      const restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
      restaurants.push(restaurant);
      window.localStorage.setItem('restaurants', JSON.stringify(restaurants));
    } else {
      window.localStorage.setItem('restaurants', JSON.stringify([restaurant]));
    }
  }
}
