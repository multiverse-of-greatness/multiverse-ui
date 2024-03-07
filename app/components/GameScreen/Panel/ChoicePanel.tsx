import Choice from "./ChoicePanel/Choice";
import LoadingSpinner from "~/components/LoadingSpinner";
import { StoryChoice } from "~/models/story/StoryChoice";
import { useNavigation } from "@remix-run/react";

type ChoicePanelProps = {
  choices: StoryChoice[];
};

export default function ChoicePanel({ choices }: Readonly<ChoicePanelProps>) {
  const navigation = useNavigation();
  return (
    <div className="absolute bottom-0 left-0 z-10 flex h-fit w-full pt-4 md:right-0 md:top-0 md:h-3/4 md:items-center md:justify-center">
      <div className="relative mx-auto flex flex-col justify-between gap-8 rounded-xl bg-black-90 px-8 py-6 md:bg-black-80 md:px-12 md:py-8 lg:px-16 lg:py-12">
        {navigation.state === "loading" && (
          <LoadingSpinner size="md" position="absolute" color="white" />
        )}
        <p className="text-center text-xl font-bold text-white md:text-3xl">
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
    </div>
  );
}
