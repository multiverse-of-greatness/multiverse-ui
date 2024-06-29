import {
  StoryNarrative,
  StoryNarrativeJson,
} from "~/models/story/StoryNarrative";

import {
  ChapterSynopsis,
} from "~/models/story/ChapterSynopsis";
import { CharacterData } from "~/models/story/CharacterData";
import { EndingData } from "~/models/story/EndingData";
import { Integer } from "neo4j-driver";
import { SceneData } from "~/models/story/SceneData";
import { StoryChoice } from "~/models/story/StoryChoice";
import { StoryChunk } from "~/models/StoryChunk";
import { StoryData } from "~/models/StoryData";
import allStoryData from '~/data/storyData'
import { getSession } from "~/db/neo4j";
import { z } from "zod";

export const getStoryDataById = (storyId: string) => {
  const storyData = allStoryData.find((story) => story.id === storyId);

  if (!storyData) {
    throw new Error(`Story with id ${storyId} not found`);
  }

  const parsedStoryData = new StoryData(
    storyData.id,
    storyData.title,
    storyData.genre,
    storyData.themes,
    storyData.main_scenes.map((scene) => SceneData.fromJson(scene)),
    storyData.main_characters.map((character) => CharacterData.fromJson(character)),
    storyData.synopsis,
    storyData.chapter_synopses.map((chapter) => ChapterSynopsis.fromJson(chapter)),
    storyData.beginning,
    storyData.endings.map((ending) => EndingData.fromJson(ending)),
    storyData.generated_by,
    storyData.approach,
  );

  return parsedStoryData
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

    const choicesResponse = filteredResponses
      .map((record) => record.get("choices").properties)
    const isEmptyChoice = choicesResponse.length === 0 || (choicesResponse.length === 1 && choicesResponse[0] === undefined) || (choicesResponse.length === 1 && Object.keys(JSON.parse(choicesResponse[0].choice)).length === 0)

    if (filteredResponses.length === 0 || isEmptyChoice) {
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

    // TODO: Handle cases when choices is empty object

    let choices: StoryChoice[] = []
    if (!isLeaf) {
      const choicesResponse = filteredResponses
        .map((record) => record.get("choices").properties)
        .filter(
          (choice) => choice !== undefined && Object.keys(choice).length !== 0,
        )
        .map((choice) => JSON.parse(choice.choice))

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
export const getNextStoryChunkIdByChoiceId = async (
  currentChunkId: string,
  choiceId: number,
) => {
  const getNextStoryChunkIdByChoiceIdQuery = `MATCH (:StoryChunk { id: $currentChunkId })-[b:BRANCHED_TO]->(chunk:StoryChunk) WHERE b.choice CONTAINS '"id":${choiceId}' RETURN chunk.id LIMIT 1`;

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