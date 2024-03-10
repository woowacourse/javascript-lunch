import './app/style.css';

import './app/modal/AddRestaurantModal/AddRestaurantModal.ts';
import './app/root/NavigationBar/NavigationBar.ts';
import './app/root/SelectBoxSection/SelectBoxSection.ts';
import './app/root/RestaurantItem/RestaurantItem.ts';

import AppController from './app/controller/AppController.ts';

const appController = new AppController();
appController.initializeApp();
