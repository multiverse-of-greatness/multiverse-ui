import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  getNextStoryChunkIdByChoiceId,
  getNextStoryChunkIdByChunkId,
  getStoryChunkByChunkId,
  getStoryDataById,
} from ".server/stories.server";
import { redirect, useLoaderData } from "@remix-run/react";

import GameScreen from "~/components/GameScreen/GameScreen";
import { StoryChunk } from ".server/models/StoryChunk";
import { StoryData } from ".server/models/StoryData";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { storyId, chunkId } = params;
  const storyData = await getStoryDataById(storyId ?? "");
  const storyChunk = await getStoryChunkByChunkId(chunkId ?? "");
  return json({ storyData, storyChunk });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { storyId, chunkId } = params;
  const formData = await request.formData();
  const choiceId = formData.get("choiceId");

  // Chapter end
  if (Number(choiceId ?? "") === -1) {
    const nextChunkId = await getNextStoryChunkIdByChunkId(chunkId ?? "");
    return redirect(`/game/${storyId}/${nextChunkId}`);
  }

  // TODO: Handle game end

  const nextChunkId = await getNextStoryChunkIdByChoiceId(
    chunkId ?? "",
    Number(choiceId ?? ""),
  );
  return redirect(`/game/${storyId}/${nextChunkId}`);
};

export default function Game() {
  const data = useLoaderData<typeof loader>();
  return !data ? (
    <div className="flex h-screen w-screen items-center justify-center">
      <p className="text-center text-xl">Loading...</p>
    </div>
  ) : (
    <>
      <GameScreen
        storyData={data.storyData as StoryData}
        storyChunk={data.storyChunk as StoryChunk}
      />
      {/* <audio autoPlay={true} loop={true}>
				<source src='bgm.wav' type='audio/wav' />
				<track kind="captions" />
			</audio> */}
    </>
  );
}
