class IdGenerator {
  private lastId: number;

  constructor(dataList: any[]) {
    this.lastId = this.findLastId(dataList);
  }

  private findLastId(dataList: any[]) {
    if (dataList.length === 0) return (this.lastId = 0);

    let maxId = -Infinity;

    dataList.forEach(({ id }) => {
      if (Number(id) > maxId) maxId = Number(id);
    });

    return maxId;
  }

  generateNewId() {
    return ++this.lastId;
  }
}

export default IdGenerator;
