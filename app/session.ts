import { createCookie, createFileSessionStorage } from "@remix-run/node";

import { EventType } from "./types/userEvent";

type SessionData = {
  userId: string;
  storyId: string;
  chunkId: string;
  status: EventType;
};

const sessionCookie = createCookie("__session", {
  secrets: [process.env.SESSION_SECRET ?? ''],
  sameSite: true,
})

const { getSession, commitSession, destroySession } =
  createFileSessionStorage<SessionData>({
    dir: 'sessions',
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
