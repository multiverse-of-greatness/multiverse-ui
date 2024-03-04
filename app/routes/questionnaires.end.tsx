import LoadingSpinner from "~/components/LoadingSpinner";
import { type MetaFunction } from "@remix-run/node";
import { useNavigation } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI - Questionnaire - Begin" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export default function EndQuestionnaire() {
  const navigation = useNavigation();

  return (
    <div className="mx-auto my-12 flex flex-col items-center justify-center text-slate-950 dark:text-slate-100">
      <h1 className="text-4xl text-red-500">Questionnaire goes here</h1>
      {/* TODO: Change Link to a form */}
      <button
        className={`mt-4 rounded border-2 border-indigo-500 px-4 py-2 text-center text-2xl font-bold text-indigo-500 transition-all ${navigation.state === "loading" ? "cursor-not-allowed" : "hover:border-indigo-700 hover:bg-indigo-700 hover:text-slate-50"}`}
        disabled={navigation.state === "loading"}
      >
        {navigation.state === "loading" && (
          <LoadingSpinner size="sm" position="inline" color="primary" />
        )}
        {navigation.state === "loading" ? "Saving..." : "Submit"}
      </button>
    </div>
  );
}
