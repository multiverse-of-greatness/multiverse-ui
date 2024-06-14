import { z } from "zod";

export const StoryNarrativeJson = z.object({
  id: z.number(),
  speaker: z.string(),
  speaker_id: z.union([z.string(), z.number(), z.null()]),
  scene_title: z.string(),
  scene_id: z.union([z.string(), z.number(), z.null()]),
  text: z.string(),
});

export class StoryNarrative {
  id: number;
  speaker: string;
  speakerId: string | number | null;
  sceneTitle: string;
  sceneId: string | number | null;
  text: string;

  constructor(
    id: number,
    speaker: string,
    speakerId: string | number | null,
    sceneTitle: string,
    sceneId: string | number | null,
    text: string,
  ) {
    this.id = id;
    this.speaker = speaker;
    this.speakerId = speakerId;
    this.sceneTitle = sceneTitle;
    this.sceneId = sceneId;
    this.text = text;
  }

  static fromJson(jsonObj: z.infer<typeof StoryNarrativeJson>): StoryNarrative {
    const parsed = StoryNarrativeJson.parse(jsonObj);
    return new StoryNarrative(
      parsed.id,
      parsed.speaker,
      parsed.speaker_id,
      parsed.scene_title,
      parsed.scene_id,
      parsed.text,
    );
  }

  toJson(): z.infer<typeof StoryNarrativeJson> {
    return {
      id: this.id,
      speaker: this.speaker,
      speaker_id: this.speakerId,
      scene_title: this.sceneTitle,
      scene_id: this.sceneId,
      text: this.text,
    };
  }

  toString(): string {
    return `StoryNarrative(id=${this.id}, speaker=${this.speaker}, speaker_id=${this.speakerId}, scene_title=${this.sceneTitle}, scene_id=${this.sceneId}, text=${this.text})`;
  }
}
