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

      <p>Consent + Description</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        accusamus quidem voluptatum pariatur vero! Reiciendis hic blanditiis
        inventore voluptas neque eveniet ad est dolores iure error aspernatur,
        nostrum rem veritatis.
      </p>
      <Link
        className="mt-8 border-b-2 border-indigo-500 text-2xl font-bold text-indigo-500 transition-all hover:border-indigo-700 hover:text-indigo-700"
        to="/questionnaires/begin"
      >
        Participate
      </Link>
    </div>
  );
}
