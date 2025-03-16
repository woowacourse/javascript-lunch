export default interface IList {
  id: string;
  category: string;
  name: string;
  dist: string;
  description?: string;
  link?: string;
  isFavorite: boolean;
}
