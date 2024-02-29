import { z } from "zod";

export const StoryNarrativeJson = z.object({
  "id": z.number(),
  "speaker": z.string(),
  "speaker_id": z.number(),
  "scene_title": z.string(),
  "scene_id": z.number(),
  "text": z.string()
});

export class StoryNarrative {
  id: number;
  speaker: string;
  speaker_id: number;
  scene_title: string;
  scene_id: number;
  text: string;

  constructor(id: number, speaker: string, speaker_id: number, scene_title: string, scene_id: number, text: string) {
    this.id = id;
    this.speaker = speaker;
    this.speaker_id = speaker_id;
    this.scene_title = scene_title;
    this.scene_id = scene_id;
    this.text = text;
  }

  static from_json(json_obj: z.infer<typeof StoryNarrativeJson>): StoryNarrative {
    const parsed = StoryNarrativeJson.parse(json_obj);
    return new StoryNarrative(
      parsed.id,
      parsed.speaker,
      parsed.speaker_id,
      parsed.scene_title,
      parsed.scene_id,
      parsed.text
    );
  }

  to_json(): z.infer<typeof StoryNarrativeJson> {
    return {
      id: this.id,
      speaker: this.speaker,
      speaker_id: this.speaker_id,
      scene_title: this.scene_title,
      scene_id: this.scene_id,
      text: this.text
    };
  }

  toString(): string {
    return `StoryNarrative(id=${this.id}, speaker=${this.speaker}, speaker_id=${this.speaker_id}, scene_title=${this.scene_title}, scene_id=${this.scene_id}, text=${this.text})`;
  }
}
