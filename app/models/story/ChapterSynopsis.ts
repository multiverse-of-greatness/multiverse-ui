import { z } from "zod";

export const ChapterSynopsisJson = z.object({
  chapter: z.number(),
  synopsis: z.string(),
  character_ids: z.array(z.number()),
  scene_ids: z.array(z.number()),
});

export class ChapterSynopsis {
  chapter: number;
  synopsis: string;
  characterIds: number[];
  sceneIds: number[];

  constructor(
    chapter: number,
    synopsis: string,
    characterIds: number[],
    sceneIds: number[],
  ) {
    this.chapter = chapter;
    this.synopsis = synopsis;
    this.characterIds = characterIds;
    this.sceneIds = sceneIds;
  }

  static fromJson(
    jsonObj: z.infer<typeof ChapterSynopsisJson>,
  ): ChapterSynopsis {
    const parsed = ChapterSynopsisJson.parse(jsonObj);
    return new ChapterSynopsis(
      parsed.chapter,
      parsed.synopsis,
      parsed.character_ids,
      parsed.scene_ids,
    );
  }

  toJson(): z.infer<typeof ChapterSynopsisJson> {
    return {
      chapter: this.chapter,
      synopsis: this.synopsis,
      character_ids: this.characterIds,
      scene_ids: this.sceneIds,
    };
  }

  toString(): string {
    return (
      `ChapterSynopsis(chapter=${this.chapter}, synopsis=${this.synopsis}, ` +
      `character_ids=${this.characterIds}, scene_ids=${this.sceneIds})`
    );
  }
}
