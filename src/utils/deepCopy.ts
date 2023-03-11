import { Restaurant } from '../types';

const deepCopy = (value: Array<Restaurant>) => JSON.parse(JSON.stringify(value));

export default deepCopy;
