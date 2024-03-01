import { getFirstStoryChunkId, getStories } from ".server/stories.server";

import { redirect } from "@remix-run/react";

export const loader = async () => {
  const stories = await getStories();
  let randomStoryId = stories[Math.floor(Math.random() * stories.length)];
  // TODO: Delete
  const allow_ids = [
    "488395e4-d625-11ee-9079-9a01b5b45ca5",
    // '825d3e06-d624-11ee-bc5f-9a01b5b45ca5',
  ];
  while (!allow_ids.includes(randomStoryId)) {
    randomStoryId = stories[Math.floor(Math.random() * stories.length)];
  }

  const firstChunkId = await getFirstStoryChunkId(randomStoryId);
  return redirect(`/game/${randomStoryId}/${firstChunkId}`);
};
