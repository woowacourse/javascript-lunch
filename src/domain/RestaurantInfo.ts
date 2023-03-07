import { $ } from "../util/querySelector";

const RestaurantInfo = {
  get() {
    const category: string = (<HTMLSelectElement>$("#category"))?.value;
    const name: string = (<HTMLInputElement>$("#name"))?.value;
    const distance: string = (<HTMLSelectElement>$("#distance"))?.value;
    const description: string = (<HTMLInputElement>$("#description"))?.value;
    const link: string = (<HTMLInputElement>$("#link"))?.value;

    return { category, name, distance, description, link };
  },
};

export default RestaurantInfo;
