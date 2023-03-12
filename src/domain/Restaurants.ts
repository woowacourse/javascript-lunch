import PersonalRestaurant from "../type/PersonalRestaurant";

class Restaurants {
  #list: PersonalRestaurant[] = [];

  add(personalRestaurant: PersonalRestaurant) {
    this.#list.push(personalRestaurant);
  }

  getList() {
    return [... this.#list];
  }

  remove(personalRestaurant: PersonalRestaurant) {
    this.#list = this.#list.filter((value) => value !== personalRestaurant);
  }
}

export default Restaurants;
