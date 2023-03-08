import RegisterRestaurantModal from './modal/RegisterRestaurantModal';
import Restaurant from './restaurant/Restaurant';
import RestaurantList from './restaurant/RestaurantList';
import SearchRestaurantSection from './section/SearchRestaurantSection';
import Header from './header/Header';
import Modal from './shared/Modal';
import Button from './shared/Button';
import FormItem from './shared/FormItem';
import Input from './shared/Input';
import Select from './shared/Select';
import Textarea from './shared/Textarea';

export type CustomRestaurantListElement = RestaurantList;

export type CustomSelectElement = Select;

export type CustomRegisterRestaurantModalElement = RegisterRestaurantModal;

export default {
  RegisterRestaurantModal,
  Restaurant,
  RestaurantList,
  SearchRestaurantSection,
  Header,
  Modal,
  Button,
  FormItem,
  Input,
  Select,
  Textarea,
};
