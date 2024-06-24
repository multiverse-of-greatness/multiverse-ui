import ChoicePanel from "./Panel/ChoicePanel";
import { StoryChoice } from "~/models/story/StoryChoice";
import TextPanel from "./Panel/TextPanel";
import { useNavigation } from "@remix-run/react";
import { useState } from "react";

type GameScreenProps = {
  dialog: string;
  isNarrator: boolean;
  characterName: string;
  characterUrl: string;
  sceneTitle?: string;
  sceneUrl: string;
  isLastNarrative: boolean;
  choices: StoryChoice[];
  order: number;
  onChapterEnd: () => void;
  onNextDialog: (currentOrder: number) => void;
};

export default function GameScreen({
  dialog,
  isNarrator,
  characterName,
  characterUrl,
  sceneTitle,
  sceneUrl,
  choices,
  isLastNarrative,
  order,
  onChapterEnd,
  onNextDialog,
}: Readonly<GameScreenProps>) {
  const navigation = useNavigation();
  const [showChoice, setShowChoice] = useState(false);

  const handleNext = () => {
    if (isLastNarrative) {
      if (choices.length > 0) {
        setShowChoice(true);
      } else {
        onChapterEnd();
      }
    } else {
      onNextDialog(order);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <img
        className="brightness-80 bg-slate relative h-full w-full border-none object-cover"
        src={sceneUrl}
        alt={sceneTitle ?? "No image available."}
      />
      {showChoice && choices.length > 0 && <ChoicePanel choices={choices} />}
      <TextPanel
        isNarrator={isNarrator}
        characterName={characterName}
        characterUrl={characterUrl}
        dialog={dialog}
        isLoading={navigation.state === "loading"}
        haveChoicesShown={showChoice}
        onNext={handleNext}
      />
    </div>
  );
}
