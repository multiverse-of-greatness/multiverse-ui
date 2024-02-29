export type EndingDataJson = {
  id: number;
  ending: string;
};

export class EndingData {
  id: number;
  ending: string;

  constructor(id: number, ending: string) {
    this.id = id;
    this.ending = ending;
  }

  static fromJson(jsonObj: EndingDataJson): EndingData {
    return new EndingData(jsonObj.id, jsonObj.ending);
  }

  toJson(): EndingDataJson {
    return {
      id: this.id,
      ending: this.ending
    };
  }

  toString(): string {
    return `EndingData(id=${this.id}, ending=${this.ending})`;
  }
}
