import { ERROR_CODE } from '../../constants/error';
import { CustomError } from '../../validation/error';

export function addData(data: unknown, id: string = 'mock') {
  localStorage.setItem(id, JSON.stringify(data));
}

export function getData(id: string = 'mock') {
  const data = localStorage.getItem(id);

  if (!data) throw new CustomError(ERROR_CODE.NON_EXISTENT_DATA);

  return JSON.parse(data);
}
