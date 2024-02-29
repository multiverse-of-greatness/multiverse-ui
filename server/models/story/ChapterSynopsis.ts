export type ChapterSynopsisJson = {
  chapter: number;
  synopsis: string;
  character_ids: number[];
  scene_ids: number[];
};

export class ChapterSynopsis {
  chapter: number;
  synopsis: string;
  characterIds: number[];
  sceneIds: number[];

  constructor(chapter: number, synopsis: string, characterIds: number[], sceneIds: number[]) {
    this.chapter = chapter;
    this.synopsis = synopsis;
    this.characterIds = characterIds;
    this.sceneIds = sceneIds;
  }

  static fromJson(jsonObj: ChapterSynopsisJson): ChapterSynopsis {
    return new ChapterSynopsis(jsonObj.chapter, jsonObj.synopsis, jsonObj.character_ids, jsonObj.scene_ids);
  }

  toJson(): ChapterSynopsisJson {
    return {
      chapter: this.chapter,
      synopsis: this.synopsis,
      character_ids: this.characterIds,
      scene_ids: this.sceneIds
    };
  }

  toString(): string {
    return (
      `ChapterSynopsis(chapter=${this.chapter}, synopsis=${this.synopsis}, ` +
      `character_ids=${this.characterIds}, scene_ids=${this.sceneIds})`
    );
  }
}
