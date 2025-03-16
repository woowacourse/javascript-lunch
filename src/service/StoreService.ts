import { parseJSON, stringifyJSON } from '../utils/data.ts';
import store from '../database/store.ts';
import { BaseData } from '../../types/domain';

class StoreService<T extends BaseData> {
  #key: string;
  #totalData: T[];

  constructor(key: string) {
    this.#key = key;
    this.#totalData = this.getDataList();
  }

  getDataList(): T[] {
    return parseJSON(store.getData(this.#key) ?? '[]');
  }

  findDataById(id: number) {
    const target = this.#totalData.find((data: T) => data.id === id);
    if (!target) {
      throw new Error('데이터가 없습니다. id를 확인해주세요.');
    }

    return target;
  }

  updateDataById(id: number, newData: T) {
    const maintainedDataList = this.#totalData.filter((data: T) => {
      return data.id !== id;
    });

    const newDataList = [...maintainedDataList, newData];
    const stringData = stringifyJSON(newDataList);

    store.setData(this.#key, stringData);
  }

  addData(data: T) {
    const newDataList = [...this.#totalData, data];
    const stringData = stringifyJSON(newDataList);

    store.setData(this.#key, stringData);
  }

  addDataList(dataList: T[]) {
    const newDataList = [...this.#totalData, ...dataList];
    const stringData = stringifyJSON(newDataList);

    store.setData(this.#key, stringData);
  }

  deleteDataById(id: number) {
    const maintainedDataList = this.#totalData.filter((data) => data.id !== id);
    const stringData = stringifyJSON(maintainedDataList);

    store.setData(this.#key, stringData);
  }

  getNewDataId() {
    return this.#totalData.length;
  }
}

export default StoreService;
