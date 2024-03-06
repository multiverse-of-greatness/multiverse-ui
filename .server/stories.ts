import {
  ChapterSynopsis,
  ChapterSynopsisJson,
} from "./models/story/ChapterSynopsis";
import { CharacterData, CharacterDataJson } from "./models/story/CharacterData";
import { EndingData, EndingDataJson } from "./models/story/EndingData";
import { SceneData, SceneDataJson } from "./models/story/SceneData";
import { StoryChoice, StoryChoiceJson } from "./models/story/StoryChoice";
import {
  StoryNarrative,
  StoryNarrativeJson,
} from "./models/story/StoryNarrative";

import { Integer } from "neo4j-driver";
import { StoryChunk } from "./models/StoryChunk";
import { StoryData } from "./models/StoryData";
import { getSession } from "./db/neo4j";
import { z } from "zod";

type GetStoriesResponse = {
  "s.id": string;
};

const getStoriesQuery = "MATCH (s:StoryData) RETURN s.id";
export const getStories = async () => {
  const session = getSession();
  try {
    const response = await session.executeRead((txc) =>
      txc.run<GetStoriesResponse>(getStoriesQuery),
    );
    const storyIds = response.records.map((record) => record.get("s.id"));
    return storyIds;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
};

type GetStoryDataResponse = {
  s: {
    properties: {
      id: string;
      title: string;
      genre: string;
      themes: string[];
      main_scenes: string;
      main_characters: string;
      synopsis: string;
      chapter_synopses: string;
      beginning: string;
      endings: string;
      generatedBy: string;
    };
  };
};

const getStoryDataByIdQuery =
  "MATCH (s:StoryData { id: $storyId }) RETURN s LIMIT 1";
export const getStoryDataById = async (storyId: string) => {
  const session = getSession();
  try {
    const responses = await session.executeRead((txc) =>
      txc.run<GetStoryDataResponse>(getStoryDataByIdQuery, { storyId }),
    );
    const response = responses.records[0].get("s").properties;

    const mainScenes = z
      .array(SceneDataJson)
      .parse(JSON.parse(response.main_scenes))
      .map((scene) => SceneData.fromJson(scene));
    const mainCharacters = z
      .array(CharacterDataJson)
      .parse(JSON.parse(response.main_characters))
      .map((character) => CharacterData.fromJson(character));
    const chapterSynopses = z
      .array(ChapterSynopsisJson)
      .parse(JSON.parse(response.chapter_synopses))
      .map((chapterSynopsis) => ChapterSynopsis.fromJson(chapterSynopsis));
    const endings = z
      .array(EndingDataJson)
      .parse(JSON.parse(response.endings))
      .map((ending) => EndingData.fromJson(ending));
    const storyData = new StoryData(
      response.id,
      response.title,
      response.genre,
      response.themes,
      mainScenes,
      mainCharacters,
      response.synopsis,
      chapterSynopses,
      response.beginning,
      endings,
      response.generatedBy,
    );

    return storyData;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
};

type GetStoryChunkByChunkIdResponse = {
  chunk: {
    properties: {
      id: string;
      story: string;
      choices: string;
      chapter: Integer;
      story_so_far: string;
      story_id: string;
      num_opportunities: Integer;
    };
  };
  choices: {
    properties: {
      id: Integer;
      choice: string;
      description: string;
    };
  };
};
const getStoryChunkByChunkIdQuery =
  "MATCH (chunk:StoryChunk { id: $chunkId })-[choices:BRANCHED_TO]->() RETURN chunk, choices";
const getLeafStoryChunkByChunkIdQuery =
  "MATCH (chunk:StoryChunk { id: $chunkId }) RETURN chunk";
export const getStoryChunkByChunkId = async (chunkId: string) => {
  const session = getSession();
  try {
    let isLeaf = false;
    const responses = await session.executeRead((txc) =>
      txc.run<GetStoryChunkByChunkIdResponse>(getStoryChunkByChunkIdQuery, {
        chunkId,
      }),
    );
    let filteredResponses = responses.records.filter(
      (record) => record !== undefined && Object.keys(record).length !== 0,
    );

    if (filteredResponses.length === 0) {
      const responses = await session.executeRead((txc) =>
        txc.run<GetStoryChunkByChunkIdResponse>(
          getLeafStoryChunkByChunkIdQuery,
          { chunkId },
        ),
      );
      filteredResponses = responses.records.filter(
        (record) => record !== undefined && Object.keys(record).length !== 0,
      );
      isLeaf = true;
    }

    const chunkResponse = filteredResponses[0].get("chunk").properties;
    const stories = z
      .array(StoryNarrativeJson)
      .parse(JSON.parse(chunkResponse.story))
      .map((narrative) => StoryNarrative.fromJson(narrative));

    let choices: StoryChoice[] = []
    if (!isLeaf) {
      const choicesResponse = filteredResponses
        .map((record) => record.get("choices").properties)
        .filter(
          (choice) => choice !== undefined && Object.keys(choice).length !== 0,
        )
        .map((choice) => ({ ...choice, id: choice.id.toNumber() }));
      choices = choicesResponse.map((choice) =>
        StoryChoice.fromJson(choice),
      );
    }
    const storyChunk = new StoryChunk(
      chunkResponse.id,
      chunkResponse.chapter.toNumber(),
      chunkResponse.story_so_far,
      stories,
      choices,
      chunkResponse.story_id,
      chunkResponse.num_opportunities.toNumber(),
    );
    return storyChunk;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
};

type getFirstStoryChunkIdResponse = {
  "chunk.id": string;
};
const getFirstStoryChunkIdQuery =
  "MATCH (:StoryData { id: $storyId })-[:STARTED_AT]->(chunk:StoryChunk) RETURN chunk.id LIMIT 1";
export const getFirstStoryChunkId = async (storyId: string) => {
  const session = getSession();
  try {
    const response = await session.executeRead((txc) =>
      txc.run<getFirstStoryChunkIdResponse>(getFirstStoryChunkIdQuery, {
        storyId,
      }),
    );
    const chunkId = response.records[0].get("chunk.id");
    return chunkId;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
};

type getNextStoryChunkIdByChoiceIdResponse = {
  "chunk.id": string;
};
const getNextStoryChunkIdByChoiceIdQuery =
  "MATCH (:StoryChunk { id: $currentChunkId })-[:BRANCHED_TO { id: $choiceId }]->(chunk:StoryChunk) RETURN chunk.id LIMIT 1";
export const getNextStoryChunkIdByChoiceId = async (
  currentChunkId: string,
  choiceId: number,
) => {
  const session = getSession();
  try {
    const response = await session.executeRead((txc) =>
      txc.run<getNextStoryChunkIdByChoiceIdResponse>(
        getNextStoryChunkIdByChoiceIdQuery,
        { currentChunkId, choiceId },
      ),
    );
    const chunkId = response.records[0].get("chunk.id");
    return chunkId;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
};

type getNextStoryChunkIdByChunkIdResponse = {
  "chunk.id": string;
};
const getNextStoryChunkIdByChunkIdQuery =
  "MATCH (:StoryChunk { id: $currentChunkId })-[:BRANCHED_TO]->(chunk:StoryChunk) RETURN chunk.id LIMIT 1";
export const getNextStoryChunkIdByChunkId = async (currentChunkId: string) => {
  const session = getSession();
  try {
    const response = await session.executeRead((txc) =>
      txc.run<getNextStoryChunkIdByChunkIdResponse>(
        getNextStoryChunkIdByChunkIdQuery,
        { currentChunkId },
      ),
    );

    if (response.records.length === 0) {
      return null;
    }

    const chunkId = response.records[0].get("chunk.id");
    return chunkId;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    session.close();
  }
}