import RegisterRestaurantModal from './modal/RegisterRestaurantModal';
import RestaurantDetailModal from './modal/RestaurantDetailModal';
import RestaurantList from './restaurant/RestaurantList';
import SearchRestaurantSection from './section/SearchRestaurantSection';
import RestaurantTypeSection from './section/RestaurantTypeSection';
import Header from './header/Header';
import RestaurantItem from './shared/RestaurantItem';
import Modal from './shared/Modal';
import Button from './shared/Button';
import FormItem from './shared/FormItem';
import Input from './shared/Input';
import Select from './shared/Select';
import Textarea from './shared/Textarea';
import FavoriteIcon from './shared/FavoriteIcon';

export type CustomRestaurantListElement = RestaurantList;

export type CustomSelectElement = Select;

export type CustomSearchRestaurantSection = SearchRestaurantSection;

export type CustomRestaurantTypeSection = RestaurantTypeSection;

export type CustomRegisterRestaurantModalElement = RegisterRestaurantModal;

export type CustomRestaurantDetailModalElement = RestaurantDetailModal;

export default {
  RegisterRestaurantModal,
  RestaurantDetailModal,
  RestaurantItem,
  RestaurantList,
  SearchRestaurantSection,
  RestaurantTypeSection,
  Header,
  Modal,
  Button,
  FormItem,
  Input,
  Select,
  Textarea,
  FavoriteIcon,
};
