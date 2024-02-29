import { StoryChoice, StoryChoiceJson } from "./story/StoryChoice";
import { StoryNarrative, StoryNarrativeJson } from "./story/StoryNarrative";

import { z } from "zod";

export const StoryChunkJson = z.object({
    "id": z.string(),
    "chapter": z.number(),
    "story_so_far": z.string(),
    "story": z.array(StoryNarrativeJson),
    "choices": z.array(StoryChoiceJson),
    "story_id": z.string(),
    "num_opportunities": z.number()
});

export class StoryChunk {
    id: string;
    chapter: number;
    story_so_far: string;
    story: StoryNarrative[];
    choices: StoryChoice[];
    story_id: string;
    num_opportunities: number;

    constructor(
        id: string,
        chapter: number,
        story_so_far: string,
        story: StoryNarrative[],
        choices: StoryChoice[],
        story_id: string,
        num_opportunities: number,
    ) {
        this.id = id;
        this.chapter = chapter;
        this.story_so_far = story_so_far;
        this.story = story;
        this.choices = choices;
        this.story_id = story_id;
        this.num_opportunities = num_opportunities;
    }

    static from_json(json_obj: z.infer<typeof StoryChunkJson>): StoryChunk {
        const narratives = json_obj.story ? json_obj.story : [];
        const choices = json_obj.choices ? json_obj.choices : [];
        return new StoryChunk(
            json_obj.id,
            json_obj.chapter,
            json_obj.story_so_far,
            narratives.map((narrative) => StoryNarrative.from_json(narrative)),
            choices.map((choice) => StoryChoice.from_json(choice)),
            json_obj.story_id,
            json_obj.num_opportunities,
        );
    }

    to_json(): z.infer<typeof StoryChunkJson> {
        return {
            id: this.id,
            chapter: this.chapter,
            story_so_far: this.story_so_far,
            story: this.story.map((narrative: StoryNarrative) => narrative.to_json()),
            choices: this.choices.map((choice: StoryChoice) => choice.to_json()),
            story_id: this.story_id,
            num_opportunities: this.num_opportunities,
        };
    }

    toString(): string {
        return `StoryChunk(id=${this.id}, chapter=${this.chapter}, story_so_far=${this.story_so_far}, story=[${this.story.map((n: StoryNarrative) => n.toString())}], choices=[${this.choices.map((c: StoryChoice) => c.toString())}])`;
    }
}
