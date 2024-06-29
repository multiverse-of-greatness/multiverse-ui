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
} from "~/db/stories";

import GameScreen from "~/components/GameScreen/GameScreen";
import { type MetaFunction } from "@remix-run/node";
import { StoryChoice } from "~/models/story/StoryChoice";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI - Game" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { storyId, chunkId } = params;

  const order = Number(new URL(request.url).searchParams.get("order") ?? 0);

  const storyData = await getStoryDataById(storyId ?? "");
  const storyChunk = await getStoryChunkByChunkId(chunkId ?? "");

  const narratives = storyChunk.story.toSorted((a, b) => a.id - b.id);
  const { speakerId, speaker, sceneId, text } = narratives[order];
  const { choices } = storyChunk;

  const character = storyData.mainCharacters.find(
    (character) => character.id === speakerId,
  );
  const characterName = character
    ? // eslint-disable-next-line no-irregular-whitespace
      `${character.firstName} ${character.lastName}`
    : speaker || "Unknown";
  const characterUrl = character?.image
    ? `${character.image}`
    : "/default-character.png";
  const scene = storyData.mainScenes.find((scene) => scene.id === sceneId);
  const sceneUrl = scene
    ? `${scene.image}`
    : "/default-scene.png";
  const isLastNarrative = order >= narratives.length - 1;
  const isNarrator = speakerId === -1;

  return json({
    dialog: text,
    choices,
    characterName,
    characterUrl,
    sceneTitle: scene?.title,
    sceneUrl,
    isLastNarrative,
    isNarrator,
  });
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
      return redirect("/finish");
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
  const {
    dialog,
    choices,
    characterName,
    characterUrl,
    sceneTitle,
    sceneUrl,
    isLastNarrative,
    isNarrator,
  } = useCachedLoaderData<typeof loader>();

  const onNextDialog = async (currentOrder: number) => {
    const params = new URLSearchParams();
    params.set("order", (currentOrder + 1).toString());
    setSearchParams(params);
  };

  const onChapterEnd = () => {
    submit({ choiceId: -1 }, { method: "post" });
  };

  return (
    <GameScreen
      dialog={dialog}
      isNarrator={isNarrator}
      isLastNarrative={isLastNarrative}
      characterName={characterName}
      characterUrl={characterUrl}
      sceneTitle={sceneTitle}
      sceneUrl={sceneUrl}
      choices={choices.map((choice) => StoryChoice.fromJson(choice))}
      order={searchParams.get("order") ? Number(searchParams.get("order")) : 0}
      onChapterEnd={onChapterEnd}
      onNextDialog={onNextDialog}
    />
  );
}
