import Category from "./Category";

interface RestaurantDTO {
    id: string;
    src?: string;
    alt?: string;
    name: string;
    distance: number;
    category: Category;
    description?: string;
    link?: string;
    isWish: boolean;
}

export default RestaurantDTO;