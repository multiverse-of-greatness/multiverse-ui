import { ChapterSynopsis, ChapterSynopsisJson } from './story/ChapterSynopsis';
import { CharacterData, CharacterDataJson } from './story/CharacterData';
import { EndingData, EndingDataJson } from './story/EndingData';
import { SceneData, SceneDataJson } from './story/SceneData';

export type StoryDataJson = {
    "id": string,
    "title": string,
    "genre": string,
    "themes": string[],
    "main_scenes": SceneDataJson[],
    "main_characters": CharacterDataJson[],
    "synopsis": string,
    "chapter_synopses": ChapterSynopsisJson[],
    "beginning": string,
    "endings": EndingDataJson[],
    "generated_by": string
};

export class StoryData {
    id: string;
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

    constructor(id: string, title: string, genre: string, themes: string[], mainScenes: SceneData[], mainCharacters: CharacterData[],
        synopsis: string, chapterSynopses: ChapterSynopsis[], beginning: string, endings: EndingData[], generatedBy: string) {
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
    }

    static fromJson(jsonObj: StoryDataJson): StoryData {
        return new StoryData(
            jsonObj['id'], jsonObj['title'], jsonObj['genre'], jsonObj['themes'],
            jsonObj['main_scenes'].map((scene: SceneDataJson) => SceneData.fromJson(scene)),
            jsonObj['main_characters'].map((character: CharacterDataJson) => CharacterData.fromJson(character)),
            jsonObj['synopsis'],
            jsonObj['chapter_synopses'].map((chapterSynopsis: ChapterSynopsisJson) => ChapterSynopsis.fromJson(chapterSynopsis)),
            jsonObj['beginning'],
            jsonObj['endings'].map((ending: EndingDataJson) => EndingData.fromJson(ending)),
            jsonObj['generated_by']
        );
    }

    toJson(): StoryDataJson {
        return {
            'id': this.id,
            'title': this.title,
            'genre': this.genre,
            'themes': this.themes,
            'main_scenes': this.mainScenes.map((scene: SceneData) => scene.toJson()),
            'main_characters': this.mainCharacters.map((character: CharacterData) => character.toJson()),
            'synopsis': this.synopsis,
            'chapter_synopses': this.chapterSynopses.map((chapterSynopsis: ChapterSynopsis) => chapterSynopsis.toJson()),
            'beginning': this.beginning,
            'endings': this.endings.map((ending: EndingData) => ending.toJson()),
            'generated_by': this.generatedBy
        };
    }

    toString(): string {
        return `StoryData(id=${this.id}, title=${this.title}, genre=${this.genre}, themes=${this.themes}, main_scenes=[${this.mainScenes.map(s => s.toString()).join(', ')}], main_characters=[${this.mainCharacters.map(c => c.toString()).join(', ')}], synopsis=${this.synopsis}, chapter_synopses=[${this.chapterSynopses.map(cs => cs.toString()).join(', ')}], beginning=${this.beginning}, endings=[${this.endings.map(e => e.toString()).join(', ')}])`;
    }
}