import { ChapterSynopsis, ChapterSynopsisJson } from "./story/ChapterSynopsis";
import { CharacterData, CharacterDataJson } from "./story/CharacterData";
import { EndingData, EndingDataJson } from "./story/EndingData";
import { SceneData, SceneDataJson } from "./story/SceneData";

import { z } from "zod";

export const StoryDataJson = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  genre: z.string(),
  themes: z.array(z.string()),
  main_scenes: z.array(SceneDataJson),
  main_characters: z.array(CharacterDataJson),
  synopsis: z.string(),
  chapter_synopses: z.array(ChapterSynopsisJson),
  beginning: z.string(),
  endings: z.array(EndingDataJson),
  generated_by: z.string(),
  approach: z.string(),
});

export class StoryData {
  id: string | number;
  title: string;
  genre: string;
  themes: string[];
  mainScenes: SceneData[];
  mainCharacters: CharacterData[];
  synopsis: string;
  chapterSynopses: ChapterSynopsis[];
  beginning: string;
  endings: EndingData[];
  generatedBy: string;
  approach: string;

  constructor(
    id: string | number,
    title: string,
    genre: string,
    themes: string[],
    mainScenes: SceneData[],
    mainCharacters: CharacterData[],
    synopsis: string,
    chapterSynopses: ChapterSynopsis[],
    beginning: string,
    endings: EndingData[],
    generatedBy: string,
    approach: string,
  ) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.themes = themes;
    this.mainScenes = mainScenes;
    this.mainCharacters = mainCharacters;
    this.synopsis = synopsis;
    this.chapterSynopses = chapterSynopses;
    this.beginning = beginning;
    this.endings = endings;
    this.generatedBy = generatedBy;
    this.approach = approach;
  }

  static fromJson(jsonObj: typeof StoryDataJson): StoryData {
    const parsed = StoryDataJson.parse(jsonObj);
    return new StoryData(
      parsed.id,
      parsed.title,
      parsed.genre,
      parsed.themes,
      parsed.main_scenes.map((scene) => SceneData.fromJson(scene)),
      parsed.main_characters.map((character) =>
        CharacterData.fromJson(character),
      ),
      parsed.synopsis,
      parsed.chapter_synopses.map((chapterSynopsis) =>
        ChapterSynopsis.fromJson(chapterSynopsis),
      ),
      parsed.beginning,
      parsed.endings.map((ending) => EndingData.fromJson(ending)),
      parsed.generated_by,
      parsed.approach,
    );
  }

  toJson(): z.infer<typeof StoryDataJson> {
    return {
      id: this.id,
      title: this.title,
      genre: this.genre,
      themes: this.themes,
      main_scenes: this.mainScenes.map((scene: SceneData) => scene.toJson()),
      main_characters: this.mainCharacters.map((character: CharacterData) =>
        character.toJson(),
      ),
      synopsis: this.synopsis,
      chapter_synopses: this.chapterSynopses.map(
        (chapterSynopsis: ChapterSynopsis) => chapterSynopsis.toJson(),
      ),
      beginning: this.beginning,
      endings: this.endings.map((ending: EndingData) => ending.toJson()),
      generated_by: this.generatedBy,
      approach: this.approach,
    };
  }

  toString(): string {
    return `StoryData(id=${this.id}, title=${this.title}, genre=${this.genre}, themes=${this.themes}, main_scenes=[${this.mainScenes.map((s) => s.toString()).join(", ")}], main_characters=[${this.mainCharacters.map((c) => c.toString()).join(", ")}], synopsis=${this.synopsis}, chapter_synopses=[${this.chapterSynopses.map((cs) => cs.toString()).join(", ")}], beginning=${this.beginning}, endings=[${this.endings.map((e) => e.toString()).join(", ")}]), approach=${this.approach}`;
  }
}
