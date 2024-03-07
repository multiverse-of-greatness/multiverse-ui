import { getFirstStoryChunkId, getStories } from ".server/stories";

import { redirect } from "@remix-run/react";

import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { saveEvent } from "~/db/firebase";
import { commitSession, getSession } from "~/session";
import { EventType } from "~/types/userEvent";
import { redirectBasedOnStatus } from "~/utils/redirect";

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
  let randomStoryId = stories[Math.floor(Math.random() * stories.length)];
  // TODO: Replace with participants balancing logic
  const allow_ids = [
    "7f75556e-db71-11ee-a160-9a01b5b45ca5",
    "da01e3ac-db81-11ee-a67e-9a01b5b45ca5",
  ];
  while (!allow_ids.includes(randomStoryId)) {
    randomStoryId = stories[Math.floor(Math.random() * stories.length)];
  }
  // END Replace
  // TODO: Update stat for balancing algorithm

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

  return redirect(`/game/${randomStoryId}/${firstChunkId}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
