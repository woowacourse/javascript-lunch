import { IRestaurant } from '../types';

const deepCopy = (value: Array<IRestaurant>) => JSON.parse(JSON.stringify(value));

export default deepCopy;
