import { Link, useNavigation } from "@remix-run/react";

import LoadingSpinner from "~/components/LoadingSpinner";

export default function BeginQuestionnaire() {
  const navigation = useNavigation();
  return (
    <Link to="/game">
      <button
        className={`mt-4 rounded-md border-2 border-black px-4 py-2 text-center text-xl transition-all ${navigation.state === "loading" ? "cursor-not-allowed" : "hover:bg-black hover:text-white"}`}
        disabled={navigation.state === "loading"}
      >
        {navigation.state === "loading" && (
          <LoadingSpinner size="sm" position="inline" color="primary" />
        )}
        {navigation.state === "loading" ? "Loading..." : "Start"}
      </button>
    </Link>
  );
}
