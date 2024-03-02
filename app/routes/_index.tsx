import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/react";
import { commitSession, getSession } from "~/session";
import { v4 as uuidv4 } from "uuid";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return redirect("/questionnaires/begin"); //TODO: Redirect to the last visited page
  }

  return json(null, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const userId = uuidv4();
  await session.set("userId", userId);
  return redirect("/questionnaires/begin", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  }); //TODO: Save to DB
}

export default function Index() {
  return (
    <div className="mx-auto my-12 flex flex-col px-16 text-slate-950 lg:w-4/5 lg:px-8 xl:w-2/3 2xl:w-1/2 dark:text-slate-100">
      <h1 className="mb-8 text-center text-4xl font-bold">
        🌌 Multiverse of Greatness 🌠
      </h1>
      <p className="mb-2">
        We will carry out this research as follows. If you understand the
        purpose as well as the content of the research, and you can participate
        in this research, please accept the following consent form.
      </p>
      <p>
        Even if you do not participate in the research or do decide to
        participate but decline in the middle, you will not suffer any
        disadvantage. We would be pleased if you could attend the research at
        your will.
      </p>
      <h2 className="mb-2 mt-4 text-2xl font-bold">Objective</h2>
      <p>
        The goal of this study is to{" "}
        <em>evaluate visual novel games through players&apos; feedback</em>.
      </p>
      <h2 className="mb-2 mt-6 text-2xl font-bold">
        Consent and Privacy Policy
      </h2>
      <p>
        The information you will share with us if you participate in this study
        will be kept completely confidential to the full extent of the law. All
        information are anonymized and will be used for research purposes only.
        Therefore, I acknowledge that:
      </p>
      <ul className="mt-2 flex list-inside list-disc flex-col gap-1">
        <li>
          I have been advised of the potential risks and burdens associated with
          this research, which includes identifying the most significant risks
          or burdens and have had an opportunity to ask the researchers for any
          questions I may have about the research and my participation.
        </li>
        <li>
          I understand that if I consent to participate in this project, I will
          be asked to allow copies of my print and experimental data to be used
          in the study.
        </li>
        <li>
          I understand that my participation in this research is voluntary, I am
          free to refuse to participate and I am free to withdraw from the
          research at any time.
        </li>
      </ul>
      <h2 className="mb-2 mt-6 text-2xl font-bold">
        Researchers and contact information
      </h2>
      <p>The following members will conduct this research.</p>
      <ul className="my-2 flex list-inside list-disc flex-col gap-1">
        <li>
          <strong>Supervisor</strong>: Prof. Ruck Thawonmas,
          ruck@is.ritsumei.ac.jp
        </li>
        <li>
          <strong>Researcher</strong>: Pittawat Taveekitworachai,
          gr0609fv@ed.ritsumei.ac.jp
        </li>
        <li>
          <strong>Researcher</strong>: Chollakorn Nimpattanavong,
          gr0608sp@ed.ritsumei.ac.jp
        </li>
        <li>
          <strong>Researcher</strong>: Mustafa Can Gursesli,
          mustafacan.gursesli@unifi.it
        </li>
      </ul>
      <p>
        Please contact the researchers if you have any questions, requests, or
        concerns.
      </p>
      <hr className="my-6 border border-slate-950 border-opacity-50 dark:border-slate-50" />
      <form action="?index" method="POST" className="self-center">
        <button className="rounded border-2 border-indigo-500 px-4 py-2 text-center text-2xl font-bold text-indigo-500 transition-all hover:border-indigo-700 hover:bg-indigo-700 hover:text-slate-50">
          Agree and Participate
        </button>
      </form>
    </div>
  );
}
