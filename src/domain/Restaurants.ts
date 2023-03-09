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
    const index = this.#list.findIndex(
      (value) => value === personalRestaurant
    );

    this.#list.splice(index, 1);
  }
}

export default Restaurants;
