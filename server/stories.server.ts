import { getSession } from "./db/neo4j";

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
