import { StoryChoice, StoryChoiceJson } from "./story/StoryChoice";
import { StoryNarrative, StoryNarrativeJson } from "./story/StoryNarrative";

import { z } from "zod";

export const StoryChunkJson = z.object({
  id: z.string(),
  chapter: z.number(),
  story_so_far: z.string(),
  story: z.array(StoryNarrativeJson),
  choices: z.array(StoryChoiceJson),
  story_id: z.string(),
  num_opportunities: z.number(),
});

export class StoryChunk {
  id: string;
  chapter: number;
  storySoFar: string;
  story: StoryNarrative[];
  choices: StoryChoice[];
  storyId: string;
  num_opportunities: number;

  constructor(
    id: string,
    chapter: number,
    storySoFar: string,
    story: StoryNarrative[],
    choices: StoryChoice[],
    storyId: string,
    num_opportunities: number,
  ) {
    this.id = id;
    this.chapter = chapter;
    this.storySoFar = storySoFar;
    this.story = story;
    this.choices = choices;
    this.storyId = storyId;
    this.num_opportunities = num_opportunities;
  }

  static fromJson(jsonObj: z.infer<typeof StoryChunkJson>): StoryChunk {
    const narratives = jsonObj.story ? jsonObj.story : [];
    const choices = jsonObj.choices ? jsonObj.choices : [];
    return new StoryChunk(
      jsonObj.id,
      jsonObj.chapter,
      jsonObj.story_so_far,
      narratives.map((narrative) => StoryNarrative.fromJson(narrative)),
      choices.map((choice) => StoryChoice.fromJson(choice)),
      jsonObj.story_id,
      jsonObj.num_opportunities,
    );
  }

  toJson(): z.infer<typeof StoryChunkJson> {
    return {
      id: this.id,
      chapter: this.chapter,
      story_so_far: this.storySoFar,
      story: this.story.map((narrative: StoryNarrative) => narrative.toJson()),
      choices: this.choices.map((choice: StoryChoice) => choice.toJson()),
      story_id: this.storyId,
      num_opportunities: this.num_opportunities,
    };
  }

  toString(): string {
    return `StoryChunk(id=${this.id}, chapter=${this.chapter}, story_so_far=${this.storySoFar}, story=[${this.story.map((n: StoryNarrative) => n.toString())}], choices=[${this.choices.map((c: StoryChoice) => c.toString())}])`;
  }
}
