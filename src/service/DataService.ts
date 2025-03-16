import { parseJSON, stringifyJSON } from '../utils/data.ts';
import store from '../data/store.ts';
import { BaseData } from '../../types/domain';

class DataService<T extends BaseData> {
  #key: string;

  constructor(key: string) {
    this.#key = key;
  }

  getDataList(): T[] {
    return parseJSON(store.getData(this.#key) ?? '[]');
  }

  findDataById(id: number) {
    const totalData = this.getDataList();
    const target = totalData.find((data: T) => data.id === id);
    if (!target) {
      throw new Error('데이터가 없습니다. id를 확인해주세요.');
    }

    return target;
  }

  updateDataById(id: number, newData: T) {
    const totalData = this.getDataList();
    const maintainedDataList = totalData.filter((data: T) => {
      return data.id !== id;
    });

    const newDataList = [...maintainedDataList, newData];
    const stringData = stringifyJSON(newDataList);

    store.setData(this.#key, stringData);
  }

  addData(data: T) {
    const totalData = this.getDataList();
    const newDataList = [...totalData, data];
    const stringData = stringifyJSON(newDataList);

    store.setData(this.#key, stringData);
  }

  addDataList(dataList: T[]) {
    const totalData = this.getDataList();
    const newDataList = [...totalData, ...dataList];
    const stringData = stringifyJSON(newDataList);

    store.setData(this.#key, stringData);
  }

  deleteDataById(id: number) {
    const totalData = this.getDataList();
    const maintainedDataList = totalData.filter((data) => data.id !== id);
    const stringData = stringifyJSON(maintainedDataList);

    store.setData(this.#key, stringData);
  }

  getNewDataId() {
    const totalData = this.getDataList();
    return totalData.length;
  }

  checkHasKey() {
    return store.checkValidKey(this.#key);
  }
}

export default DataService;
