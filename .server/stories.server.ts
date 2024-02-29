import { ChapterSynopsis, ChapterSynopsisJson } from "./models/story/ChapterSynopsis";
import { CharacterData, CharacterDataJson } from "./models/story/CharacterData";
import { EndingData, EndingDataJson } from "./models/story/EndingData";
import { SceneData, SceneDataJson } from "./models/story/SceneData";
import { StoryChoice, StoryChoiceJson } from "./models/story/StoryChoice";
import { StoryNarrative, StoryNarrativeJson } from "./models/story/StoryNarrative";

import { Integer } from "neo4j-driver";
import { StoryChunk } from "./models/StoryChunk";
import { StoryData } from "./models/StoryData";
import { getSession } from "./db/neo4j";
import { z } from 'zod';

type GetStoriesResponse = {
  's.id': string;
}

const getStoriesQuery = 'MATCH (s:StoryData) RETURN s.id';
export const getStories = async () => {
  const session = getSession();
  try {
    const response = await session.executeRead(txc => txc.run<GetStoriesResponse>(getStoriesQuery));
    const storyIds = response.records.map(record => record.get('s.id'));
    return storyIds;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
}

type GetStoryDataResponse = {
  's': {
    properties: {
      id: string,
      title: string,
      genre: string,
      themes: string[],
      main_scenes: string,
      main_characters: string,
      synopsis: string,
      chapter_synopses: string,
      beginning: string,
      endings: string,
      generatedBy: string
    }
  }
}

const getStoryDataByIdQuery = 'MATCH (s:StoryData {id: $storyId}) RETURN s LIMIT 1';
export const getStoryDataById = async (storyId: string) => {
  const session = getSession();
  try {
    const responses = await session.executeRead(txc => txc.run<GetStoryDataResponse>(getStoryDataByIdQuery, { storyId }));
    const response = responses.records[0].get('s').properties;

    const mainScenes = z.array(SceneDataJson).parse(JSON.parse(response.main_scenes)).map(scene => SceneData.fromJson(scene))
    const mainCharacters = z.array(CharacterDataJson).parse(JSON.parse(response.main_characters)).map(character => CharacterData.fromJson(character))
    const chapterSynopses = z.array(ChapterSynopsisJson).parse(JSON.parse(response.chapter_synopses)).map(chapterSynopsis => ChapterSynopsis.fromJson(chapterSynopsis))
    const endings = z.array(EndingDataJson).parse(JSON.parse(response.endings)).map(ending => EndingData.fromJson(ending))
    const storyData = new StoryData(response.id, response.title, response.genre, response.themes, mainScenes, mainCharacters, response.synopsis, chapterSynopses, response.beginning, endings, response.generatedBy);

    return storyData;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
}

type getFirstStoryChunkResponse = {
  'chunk': {
    properties: {
      id: string,
      text: string,
      story: string,
      choices: string,
      chapter: Integer,
      story_so_far: string,
      story_id: string,
      num_opportunities: Integer
    }
  },
  'branch': {
    properties: {
      id: Integer,
      choice: string,
      description: string
    }
  }
}
const getFirstStoryChunkQuery = 'MATCH (:StoryData {id: $storyId})-[:STARTED_AT]->(chunk:StoryChunk)-[branch:BRANCHED_TO]->() RETURN chunk, branch';
export const getFirstStoryChunk = async (storyId: string) => {
  const session = getSession();
  try {
    const responses = await session.executeRead(txc => txc.run<getFirstStoryChunkResponse>(getFirstStoryChunkQuery, { storyId }));
    const filteredResponses = responses.records.filter(record => record !== undefined)
    const chunk_response = filteredResponses[0].get('chunk').properties;
    const stories = z.array(StoryNarrativeJson).parse(JSON.parse(chunk_response.story)).map(narrative => StoryNarrative.from_json(narrative));
    const choices_response = filteredResponses.map(record => record.get('branch').properties).map(choice => ({ ...choice, id: choice.id.toNumber() }));
    const choices = choices_response.map(choice => StoryChoice.from_json(choice));
    const storyChunk = new StoryChunk(chunk_response.id,
      chunk_response.chapter.toNumber(),
      chunk_response.story_so_far,
      stories,
      choices,
      chunk_response.story_id,
      chunk_response.num_opportunities.toNumber());
    return storyChunk;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
}