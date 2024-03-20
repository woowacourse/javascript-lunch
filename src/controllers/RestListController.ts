import { RestCard } from '../components/single/RestCard';
import { DEFAULT_KEY } from '../constants/filter';
import RestDataAPI from '../services/RestDataAPI';
import { KeyOfCategoryKey, KeyOfSortingKey } from '../types/filter';
import { Restaurant } from '../types/restaurant';

class RestListController {
  private $list: HTMLUListElement;

  constructor($list: HTMLUListElement) {
    this.$list = $list;
  }

  public render({
    categoryKey = DEFAULT_KEY.categoryKey,
    sortingKey = DEFAULT_KEY.sortingKey
  }: {
    categoryKey?: KeyOfCategoryKey;
    sortingKey?: KeyOfSortingKey;
  }): void {
    const restDataArray = RestDataAPI.load(categoryKey, sortingKey);

    this.clearList();
    this.updateList(restDataArray);
  }

  private clearList(): void {
    while (this.$list.firstChild) {
      this.$list.removeChild(this.$list.firstChild);
    }
  }

  private updateList(restDataArray: Restaurant[]): void {
    restDataArray.forEach((restData) => {
      const $restCard = RestCard(restData);

      this.$list.appendChild($restCard);
    });
  }
}

export default RestListController;
