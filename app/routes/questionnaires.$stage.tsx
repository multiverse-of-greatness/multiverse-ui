import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import questionnaires from "~/data/questionnaires";
import {
  LoaderFunctionArgs,
  redirect,
  type MetaFunction,
  json,
} from "@remix-run/node";

import LoadingSpinner from "~/components/LoadingSpinner";
import { Question } from "~/types/questionnaire";
import { commitSession, getSession } from "~/session";
import TextQuestion from "~/components/ui/forms/TextQuestion";
import FormCategory from "~/components/ui/forms/FormCategory";
import SelectQuestion from "~/components/ui/forms/SelectQuestion";
import languages from "~/data/languages";
import ChoiceQuestion from "~/components/ui/forms/ChoiceQuestion";
import LikertQuestion from "~/components/ui/forms/LikertQuestion";
import { saveEvent, saveQuestionnaire } from "~/db/firebase";
import { EventType } from "~/types/userEvent";
import { redirectBasedOnStatus } from "~/utils/redirect";
import { generateSchema } from "~/utils/formValidation";

export const meta: MetaFunction = () => {
  return [
    { title: "Multiverse UI - Questionnaire - Begin" },
    { name: "description", content: "Infinite Possibilities" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { stage } = params;
  if (!stage || !(stage in questionnaires)) {
    return redirect("/");
  }

  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (session.has("userId") && session.has("status")) {
    const status = session.get("status")!;
    const pathToRedirect = redirectBasedOnStatus(status);
    if (pathToRedirect && pathToRedirect !== `/questionnaires/${stage}`) {
      return redirect(pathToRedirect);
    }
  } else if (!userId) {
    return redirect("/");
  }

  const beginQuestionnaires =
    questionnaires[stage as keyof typeof questionnaires];
  const languageList = languages.map((language) => ({
    value: language.code,
    label: language.name,
  }));

  return json({ userId, beginQuestionnaires, languageList });
}

export const action = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const { stage } = params;
  if (!stage || !(stage in questionnaires)) {
    return redirect("/");
  }

  const formData = await request.formData();
  const userId = formData.get("userId")?.toString() ?? "";
  const data: { [key: string]: string | number } = {};
  for (const key of formData.keys()) {
    data[key.toString()] = formData.get(key)?.toString().trim() ?? "";
    if (!isNaN(Number(data[key.toString()]))) {
      data[key.toString()] = Number(data[key.toString()]);
    }
  }
  const schema = generateSchema(
    questionnaires[stage as keyof typeof questionnaires],
    languages.map((language) => language.code),
  );
  const parsedData = schema.parse(data);

  await saveQuestionnaire(
    userId,
    stage as keyof typeof questionnaires,
    parsedData,
  );

  if (stage === "begin") {
    await saveEvent({
      userId,
      storyId: "begin",
      chunkId: "begin",
      eventType: EventType.COMPLETED_BEGIN_QUESTIONNAIRE,
      eventTime: new Date(),
      data: null,
    });
    session.set("status", EventType.COMPLETED_BEGIN_QUESTIONNAIRE);

    return redirect("/game", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else if (stage === "end") {
    await saveEvent({
      userId,
      storyId: "end",
      chunkId: "end",
      eventType: EventType.COMPLETED_END_QUESTIONNAIRE,
      eventTime: new Date(),
      data: null,
    });
    session.set("status", EventType.COMPLETED_END_QUESTIONNAIRE);

    return redirect("/finish", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const mapQuestionToComponent = (
  question: Question,
  languageList: {
    value: string;
    label: string;
  }[],
) => {
  let fieldType: "text" | "email" | "number" = "text";

  if (question.type === "email") {
    fieldType = "email";
  } else if (question.type === "number") {
    fieldType = "number";
  }

  if (question.type === "select") {
    return (
      <SelectQuestion
        id={question.question}
        label={question.question}
        subtitle={question.description}
        required={true}
        options={
          question?.options?.map((opt) => ({
            label: opt,
            value: opt.toLowerCase(),
          })) ?? languageList
        }
      />
    );
  }

  if (question.type === "choice") {
    return (
      <ChoiceQuestion
        id={question.question}
        label={question.question}
        subtitle={question.description}
        required={true}
        options={question.options.map((option) => ({
          value: option.toLowerCase(),
          label: option,
        }))}
      />
    );
  }

  if (question.type === "likert") {
    // Special for Manikin
    if (question.subtype === 9) {
      return (
        <LikertQuestion
          id={question.question}
          label={question.question}
          subtitle={question.description}
          required={true}
          scale={question.subtype}
          minValue={question.minValue}
          maxValue={question.maxValue}
        >
          <img
            src={`/${question.question.toLowerCase()}.png`}
            alt={`${question.question} scale`}
            className="mx-auto mt-4 w-full"
          />
        </LikertQuestion>
      );
    }
    return (
      <LikertQuestion
        id={question.question}
        label={question.question}
        subtitle={question.description}
        required={true}
        scale={question.subtype}
        minValue={question.minValue}
        maxValue={question.maxValue}
      />
    );
  }

  if (question.type === "number") {
    return (
      <TextQuestion
        id={question.question}
        label={question.question}
        subtitle={question.description}
        required={true}
        type={fieldType}
        minValue={question.minValue}
        maxValue={question.maxValue}
      />
    );
  }

  return (
    <TextQuestion
      id={question.question}
      label={question.question}
      subtitle={question.description}
      required={true}
      type={fieldType}
    />
  );
};

export default function BeginQuestionnaire() {
  const navigation = useNavigation();
  const { userId, beginQuestionnaires, languageList } =
    useLoaderData<typeof loader>();

  return (
    <div className="mx-auto my-12 flex flex-col items-center justify-center text-slate-950 dark:text-slate-100">
      <h1 className="mb-8 text-4xl font-bold">Questionnaires</h1>
      <Form className="w-4/5 md:w-3/5 xl:w-5/12" method="POST">
        <input type="hidden" name="userId" value={userId} />
        {beginQuestionnaires.map(({ category, questions }) => (
          <FormCategory category={category} key={category}>
            {...questions.map((question) =>
              mapQuestionToComponent(question, languageList),
            )}
          </FormCategory>
        ))}
        <button
          className={`mt-4 w-full rounded border-2 border-indigo-500 px-4 py-2 text-center text-2xl font-bold text-indigo-500 transition-all ${navigation.state === "loading" ? "cursor-not-allowed" : "hover:border-indigo-700 hover:bg-indigo-700 hover:text-slate-50"}`}
          disabled={navigation.state === "loading"}
          type="submit"
        >
          {navigation.state === "loading" && (
            <LoadingSpinner size="sm" position="inline" color="primary" />
          )}
          {navigation.state === "loading" ? "Saving..." : "Submit"}
        </button>
      </Form>
    </div>
  );
}
