import Restaurant from './restaurant/Restaurant';
import RestaurantList from './restaurant/RestaurantList';
import Modal from './modal/Modal';
import Button from './shared/Button';
import FormItem from './shared/FormItem';
import Input from './shared/Input';
import Select from './shared/Select';
import Textarea from './shared/Textarea';

export type CustomRestaurantListElement = RestaurantList;

export type CustomSelectElement = Select;

export type CustomModalElement = Modal;

export default {
  Restaurant,
  RestaurantList,
  Modal,
  Button,
  FormItem,
  Input,
  Select,
  Textarea,
};
