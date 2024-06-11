import { ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { getFirstStoryChunkId } from "~/db/stories";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const approach = (await request.formData()).get("approach");

  const storyId =
    approach === "baseline"
      ? "d979223f-f4e2-11ee-b819-182649966cd4"
      : "fff66562-f284-11ee-b947-00155d2625d3";
  const firstChunkId = await getFirstStoryChunkId(storyId);

  return redirect(`/game/${storyId}/${firstChunkId}`);
}

export default function Index() {
  return (
    <div className="mx-auto h-screen w-screen flex-col px-16 text-slate-950 lg:w-4/5 lg:px-8 dark:text-slate-100">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          🌌 Multiverse of Greatness 🌠
        </h1>
        <div className="flex flex-col gap-8 md:flex-row">
          <Form action="?index" method="POST" className="self-center">
            <input type="hidden" name="approach" value="baseline" />
            <button className="rounded border-2 border-indigo-500 px-4 py-2 text-center text-2xl font-bold text-indigo-500 transition-all hover:border-indigo-700 hover:bg-indigo-700 hover:text-slate-50">
              Play Best Baseline Story
            </button>
          </Form>
          <Form action="?index" method="POST" className="self-center">
            <input type="hidden" name="approach" value="proposed" />
            <button className="rounded border-2 bg-indigo-600 px-4 py-2 text-center text-2xl font-bold text-zinc-100 transition-all hover:border-indigo-700 hover:bg-indigo-700 hover:text-slate-50">
              Play Best Proposed Story
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
