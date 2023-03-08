import PersonalRestaurant from "../type/PersonalRestaurant";

class Restaurants {
  #list: PersonalRestaurant[] = [];

  add(personalRestaurant: PersonalRestaurant) {
    this.#list.push(personalRestaurant);
  }

  getList() {
    return [... this.#list];
  }
}

export default Restaurants;
