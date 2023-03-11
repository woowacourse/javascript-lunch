import './css/index.css';

import LunchMenuApp from './LunchMenuApp';

// NOTE: Custom Element를 사용하기 위해 import 필요
import CustomModal from './components/common/CustomModal';

import RestaurantList from './components/RestaurantList';
import RestaurantListItem from './components/RestaurantListItem';
import RestaurantRegisterModal from './components/RestaurantRegisterModal';
import RestaurantDetailModal from './components/RestaurantDetailModal';
import RestaurantFilter from './components/RestaurantFilter';
import RestaurantTab from './components/RestaurantTab';

LunchMenuApp.init();
