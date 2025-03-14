import restaurantDataList from "../../domain/RestaurantDataList";
import RestaurantItem from "../restaurant/RestaurantItem";
import RestaurantItemDetailModalButtonContainer from "./RestaurantItemDetailModalButtonContainer";

export default function RestaurantItemDetailModal({restaurantId, isColumn}) {
    const $fragment = document.createDocumentFragment();

    const restaurant = restaurantDataList.getData(restaurantId);
    
    $fragment.appendChild(RestaurantItem({...restaurant.getData(), isColumn}));
    $fragment.appendChild(RestaurantItemDetailModalButtonContainer({restaurantId}));
    
    return $fragment;
}