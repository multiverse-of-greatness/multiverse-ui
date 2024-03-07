import { z } from "zod";

export const StoryChoiceJson = z.object({
  id: z.number(),
  choice: z.string(),
  description: z.string(),
});

export class StoryChoice {
  id: number;
  choice: string;
  description: string;

  constructor(id: number, choice: string, description: string) {
    this.id = id;
    this.choice = choice;
    this.description = description;
  }

  static fromJson(json_obj: z.infer<typeof StoryChoiceJson>): StoryChoice {
    const parsed = StoryChoiceJson.parse(json_obj);
    return new StoryChoice(parsed.id, parsed.choice, parsed.description);
  }

  toJson(): z.infer<typeof StoryChoiceJson> {
    return {
      id: this.id,
      choice: this.choice,
      description: this.description,
    };
  }

  toString(): string {
    return `StoryChoice(id=${this.id}, choice=${this.choice}, description=${this.description})`;
  }
}
