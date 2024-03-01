import Choice from "./ChoicePanel/Choice";
import { StoryChoice } from ".server/models/story/StoryChoice";

type ChoicePanelProps = {
  choices: StoryChoice[];
};

export default function ChoicePanel({ choices }: Readonly<ChoicePanelProps>) {
  //TODO: Automatically select the next chapter if there are no choices
  let content = (
    <form method="POST" className="rounded-xl bg-black-80">
      <Choice id={-1} choice="Next Chapter" description="" />
    </form>
  );

  if (choices.length > 0) {
    content = (
      <div className="mx-auto flex flex-col justify-between gap-8 rounded-xl bg-black-80 px-16 py-12">
        <p className="text-center text-3xl font-bold text-white">
          What will you do?
        </p>
        <form
          method="POST"
          className="flex flex-col items-center justify-center gap-4"
        >
          {choices
            .toSorted(() => Math.random() - 0.5)
            .map((choice) => (
              <Choice
                key={choice.id}
                id={choice.id}
                choice={choice.choice}
                description={choice.description}
              />
            ))}
        </form>
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-0 flex h-1/2 w-full items-center justify-center md:h-3/4">
      {content}
    </div>
  );
}
