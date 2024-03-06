import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  ClientLoaderFunctionArgs,
  redirect,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { cacheClientLoader, useCachedLoaderData } from "remix-client-cache";
import {
  getNextStoryChunkIdByChoiceId,
  getNextStoryChunkIdByChunkId,
  getStoryChunkByChunkId,
  getStoryDataById,
} from ".server/stories";

import GameScreen from "~/components/GameScreen/GameScreen";
import { StoryChunk } from ".server/models/StoryChunk";
import { StoryData } from ".server/models/StoryData";
import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI - Game" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { storyId, chunkId } = params;
  const storyData = await getStoryDataById(storyId ?? "");
  const storyChunk = await getStoryChunkByChunkId(chunkId ?? "");
  return json({ storyData, storyChunk });
};

export const clientLoader = (args: ClientLoaderFunctionArgs) =>
  cacheClientLoader(args);

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { storyId, chunkId } = params;
  const formData = await request.formData();
  const choiceId = formData.get("choiceId");

  if (Number(choiceId ?? "") === -1) {
    const nextChunkId = await getNextStoryChunkIdByChunkId(chunkId ?? "");

    if (nextChunkId === null) {
      return redirect(`/questionnaires/end`);
    }

    return redirect(`/game/${storyId}/${nextChunkId}`);
  }

  const nextChunkId = await getNextStoryChunkIdByChoiceId(
    chunkId ?? "",
    Number(choiceId ?? ""),
  );

  return redirect(`/game/${storyId}/${nextChunkId}`);
};

clientLoader.hydrate = true;
export default function Game() {
  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();
  const { storyData, storyChunk } = useCachedLoaderData<typeof loader>();

  const onNextDialog = (currentOrder: number) => {
    const params = new URLSearchParams();
    params.set("order", (currentOrder + 1).toString());
    setSearchParams(params);
  };

  const onChapterEnd = () => {
    submit({ choiceId: -1 }, { method: "post" });
  };

  return (
    <>
      <GameScreen
        storyData={storyData as StoryData}
        storyChunk={storyChunk as StoryChunk}
        order={
          searchParams.get("order") ? Number(searchParams.get("order")) : 0
        }
        onChapterEnd={onChapterEnd}
        onNextDialog={onNextDialog}
      />
    </>
  );
}
