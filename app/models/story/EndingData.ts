import { z } from "zod";

export const EndingDataJson = z.object({
  id: z.union([z.string(), z.number()]),
  ending: z.string(),
});

export class EndingData {
  id: string | number;
  ending: string;

  constructor(id: string | number, ending: string) {
    this.id = id;
    this.ending = ending;
  }

  static fromJson(jsonObj: z.infer<typeof EndingDataJson>): EndingData {
    const parsed = EndingDataJson.parse(jsonObj);
    return new EndingData(parsed.id, parsed.ending);
  }

  toJson(): z.infer<typeof EndingDataJson> {
    return {
      id: this.id,
      ending: this.ending,
    };
  }

  toString(): string {
    return `EndingData(id=${this.id}, ending=${this.ending})`;
  }
}
