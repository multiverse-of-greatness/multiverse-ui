import { getFirstStoryChunkId, getStories } from ".server/stories";

import { redirect } from "@remix-run/react";

import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI - Loading..." },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export const loader = async () => {
  const stories = await getStories();
  let randomStoryId = stories[Math.floor(Math.random() * stories.length)];
  // TODO: Replace with participants balancing logic
  const allow_ids = [
    "488395e4-d625-11ee-9079-9a01b5b45ca5",
    "9400fdb6-d613-11ee-a886-9a01b5b45ca5",
    "825d3e06-d624-11ee-bc5f-9a01b5b45ca5",
  ];
  while (!allow_ids.includes(randomStoryId)) {
    randomStoryId = stories[Math.floor(Math.random() * stories.length)];
  }
  // END Replace

  const firstChunkId = await getFirstStoryChunkId(randomStoryId);
  return redirect(`/game/${randomStoryId}/${firstChunkId}`);
};
