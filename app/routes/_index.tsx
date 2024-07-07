import { type MetaFunction } from "@remix-run/node";
import { Form, redirect, useNavigation } from "@remix-run/react";
import LoadingSpinner from "~/components/LoadingSpinner";
import { getFirstStoryChunkId } from "~/db/stories";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export async function action() {
  const storyId = "eb8b2688-3c3e-11ef-a407-9a01b5b45ca4";
  const firstChunkId = await getFirstStoryChunkId(storyId);

  return redirect(`/game/${storyId}/${firstChunkId}`);
}

export default function Index() {
  const navigation = useNavigation();

  return (
    <div className="mx-auto h-screen w-screen flex-col px-16 text-slate-950 lg:w-4/5 lg:px-8 dark:text-slate-100">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          🌌 A Tale Retold 🌠
        </h1>
        <div className="flex flex-col gap-8 md:flex-row">
          <Form action="?index" method="POST" className="self-center">
            <button
              className="rounded border-2 bg-indigo-600 px-4 py-2 text-center text-2xl font-bold text-zinc-100 transition-all hover:border-indigo-700 hover:bg-indigo-700 hover:text-slate-50"
              disabled={navigation.state === "loading"}
            >
              {navigation.state === "loading" && (
                <LoadingSpinner size="sm" position="inline" color="primary" />
              )}{" "}
              Start Game
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
