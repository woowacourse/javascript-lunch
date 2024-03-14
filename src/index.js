import './css/style.css';

import './app/modal/AddRestaurantModal/AddRestaurantModal.ts';
import './app/root/LunchHeader/LunchHeader.ts';
import './app/root/SelectBoxSection/SelectBoxSection.ts';
import './app/root/RestaurantItem/RestaurantItem.ts';
import './app/root/FavoriteNavBar/FavoriteNavBar.ts';

import AppController from './app/controller/AppController.ts';

const appController = new AppController();
appController.initializeApp();
