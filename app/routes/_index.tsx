import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <p className="text-center text-4xl font-bold">Multiverse UI</p>
      <Link
        className="mt-4 rounded-md border-2 border-black px-4 py-2 text-center text-xl transition-all hover:bg-black hover:text-white"
        to="/game"
      >
        Start
      </Link>
    </div>
  );
}
