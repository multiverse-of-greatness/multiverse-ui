import { createCookie, createFileSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};

const sessionCookie = createCookie("__session", {
  secrets: [process.env.SESSION_SECRET || ''],
  sameSite: true,
})

const { getSession, commitSession, destroySession } =
  createFileSessionStorage<SessionData>({
    dir: 'sessions',
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
