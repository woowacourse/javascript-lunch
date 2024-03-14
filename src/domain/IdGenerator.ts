class IdGenerator {
  private lastId: number;

  constructor(dataList: any[]) {
    this.lastId = this.findLastId(dataList);
  }

  private findLastId(dataList) {
    let maxId = -Infinity;

    dataList.forEach(({ id }) => {
      if (id > maxId) maxId = id;
    });

    return maxId;
  }

  generateNewId() {
    return ++this.lastId;
  }
}

export default IdGenerator;
