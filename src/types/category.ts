import Condition from '../constants/Condition';

const { CATEGORY } = Condition;

type Union<T> = T[keyof T];
type Category = Union<typeof CATEGORY>;

export default Category;
