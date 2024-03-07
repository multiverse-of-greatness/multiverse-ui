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
import { saveEvent } from "~/db/firebase";
import { commitSession, getSession } from "~/session";
import { EventType } from "~/types/userEvent";
import { redirectBasedOnStatus } from "~/utils/redirect";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI - Game" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const { storyId, chunkId } = params;
  const userId = session.get("userId")!;
  const savedStoryId = session.get("storyId");
  if (session.has("userId") && session.has("status")) {
    const status = session.get("status")!;
    const pathToRedirect = redirectBasedOnStatus(status);
    if (pathToRedirect) {
      return redirect(pathToRedirect);
    }
  } else if (!userId) {
    return redirect("/");
  } else if (!savedStoryId) {
    return redirect("/game");
  } else if (savedStoryId !== storyId) {
    return redirect("/game");
  }

  const storyData = await getStoryDataById(storyId ?? "");
  const storyChunk = await getStoryChunkByChunkId(chunkId ?? "");

  return json({ storyData, storyChunk, userId });
};

export const clientLoader = (args: ClientLoaderFunctionArgs) =>
  cacheClientLoader(args);

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const { storyId, chunkId } = params;
  const userId = session.get("userId")!;
  if (!userId) {
    return redirect("/");
  }

  const formData = await request.formData();
  const choiceId = formData.get("choiceId");

  if (Number(choiceId ?? "") === -1) {
    const nextChunkId = await getNextStoryChunkIdByChunkId(chunkId ?? "");

    if (nextChunkId === null) {
      await saveEvent({
        userId,
        storyId: storyId ?? "",
        chunkId: chunkId ?? "",
        eventType: EventType.GAME_ENDED,
        eventTime: new Date(),
        data: null,
      });
      session.set("status", EventType.GAME_ENDED);

      return redirect(`/questionnaires/end`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    await saveEvent({
      userId,
      storyId: storyId ?? "",
      chunkId: chunkId ?? "",
      eventType: EventType.CLICKED_NEXT_STORY_CHUNK,
      eventTime: new Date(),
      data: {
        currentStoryChunkId: chunkId ?? "",
        nextStoryChunkId: nextChunkId,
      },
    });

    session.set("chunkId", nextChunkId);
    return redirect(`/game/${storyId}/${nextChunkId}`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const nextChunkId = await getNextStoryChunkIdByChoiceId(
    chunkId ?? "",
    Number(choiceId ?? ""),
  );

  await saveEvent({
    userId,
    storyId: storyId ?? "",
    chunkId: chunkId ?? "",
    eventType: EventType.SELECTED_CHOICE,
    eventTime: new Date(),
    data: {
      selectedChoice: Number(choiceId ?? ""),
      currentStoryChunkId: chunkId ?? "",
      nextStoryChunkId: nextChunkId,
    },
  });

  session.set("chunkId", nextChunkId);
  return redirect(`/game/${storyId}/${nextChunkId}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

clientLoader.hydrate = true;
export default function Game() {
  const submit = useSubmit();
  const [searchParams, setSearchParams] = useSearchParams();
  const { storyData, storyChunk, userId } =
    useCachedLoaderData<typeof loader>();

  const onNextDialog = async (currentOrder: number) => {
    const params = new URLSearchParams();
    params.set("order", (currentOrder + 1).toString());
    await saveEvent({
      userId,
      storyId: storyData.id,
      chunkId: storyChunk.id,
      eventType: EventType.CLICKED_NEXT_DIALOGUE,
      eventTime: new Date(),
      data: {
        currentDialogueId: currentOrder,
        nextDialogueId: currentOrder + 1,
      },
    });
    setSearchParams(params);
  };

  const onChapterEnd = () => {
    submit({ choiceId: -1 }, { method: "post" });
  };

  return (
    <GameScreen
      storyData={storyData as StoryData}
      storyChunk={storyChunk as StoryChunk}
      order={searchParams.get("order") ? Number(searchParams.get("order")) : 0}
      onChapterEnd={onChapterEnd}
      onNextDialog={onNextDialog}
    />
  );
}
