import { getFirstStoryChunkId, getStories } from "~/db/stories";

import { redirect } from "@remix-run/react";

import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { getStatistics, saveEvent, updateStatistics } from "~/db/firebase";
import { commitSession, getSession } from "~/session";
import { EventType } from "~/types/userEvent";
import { redirectBasedOnStatus } from "~/utils/redirect";
import { selectRandomStoryId } from "~/utils/storySelection";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI - Loading..." },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId")!;
  if (session.has("userId") && session.has("status")) {
    const status = session.get("status")!;
    const pathToRedirect = redirectBasedOnStatus(status);
    if (pathToRedirect && pathToRedirect !== "/game") {
      return redirect(pathToRedirect);
    }
  } else if (session.has("storyId") && session.has("chunkId")) {
    const storyId = session.get("storyId")!;
    const chunkId = session.get("chunkId")!;

    return redirect(`/game/${storyId}/${chunkId}`);
  } else if (!userId) {
    return redirect("/");
  }

  const stories = await getStories();
  const statistics = await getStatistics();
  const baselineStories = stories.filter(
    (story) => story.approach === "baseline",
  );
  const proposedStories = stories.filter(
    (story) => story.approach === "proposed",
  );

  const { randomStoryId, selectedApproach } = selectRandomStoryId(
    baselineStories,
    proposedStories,
    statistics,
  );

  const firstChunkId = await getFirstStoryChunkId(randomStoryId);
  session.set("storyId", randomStoryId);
  session.set("chunkId", firstChunkId);

  await saveEvent({
    userId,
    storyId: randomStoryId,
    chunkId: firstChunkId,
    eventType: EventType.GAME_STARTED,
    eventTime: new Date(),
    data: null,
  });
  session.set("status", EventType.GAME_STARTED);

  await updateStatistics(randomStoryId, selectedApproach);

  return redirect(`/game/${randomStoryId}/${firstChunkId}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
