import { Category, Distance, Restaurant } from '../../interface/RestaurantInterfaces';

interface Props {
  restaurant: Restaurant;
}

class RestaurantEntity implements Restaurant {
  id: string;
  name: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;
  isFavorite: boolean;

  constructor({ restaurant }: Props) {
    const { id, name, distance, category, description, link, isFavorite } = restaurant;
    this.id = id;
    this.name = name;
    this.distance = distance;
    this.category = category;
    this.description = description;
    this.link = link;
    this.isFavorite = isFavorite;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      distance: this.distance,
      category: this.category,
      description: this.description,
      link: this.link,
      isFavorite: this.isFavorite,
    };
  }

  favoriteToggle() {
    this.isFavorite = !this.isFavorite;
  }
}

export default RestaurantEntity;
