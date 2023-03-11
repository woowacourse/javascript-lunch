import IRestaurant from "./IRestaurant";
import { TCategory } from "./TCategory";

export default interface IListState {
  restaurants: IRestaurant[];
  filter: TCategory;
  sort: string;
  menuTab: string;
}
