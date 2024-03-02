import ChoicePanel from "./Panel/ChoicePanel";
import { StoryChunk } from ".server/models/StoryChunk";
import { StoryData } from ".server/models/StoryData";
import TextPanel from "./Panel/TextPanel";
import { useNavigation } from "@remix-run/react";
import { useState } from "react";

type GameScreenProps = {
  storyData: StoryData;
  storyChunk: StoryChunk;
  order: number;
  onChapterEnd: () => void;
  onNextDialog: (currentOrder: number) => void;
};

export default function GameScreen({
  storyData,
  storyChunk,
  order,
  onChapterEnd,
  onNextDialog,
}: Readonly<GameScreenProps>) {
  const navigation = useNavigation();
  const [showChoice, setShowChoice] = useState(false);
  const narratives = storyChunk.story.toSorted((a, b) => a.id - b.id);
  const { speakerId, sceneId, text } = narratives[order];
  const { choices } = storyChunk;
  const character = storyData.mainCharacters.find(
    (character) => character.id === speakerId,
  );
  const characterName = character
    ? `${character.firstName} ${character.lastName}`
    : "Unknown";
  const characterUrl = character
    ? `data:image/png;base64,${character.image}`
    : "/default-character.png";
  const scene = storyData.mainScenes.find((scene) => scene.id === sceneId);
  const sceneBackgroundUrl = scene
    ? `data:image/png;base64,${scene.image}`
    : "https://upload.wikimedia.org/wikipedia/commons/5/50/Black_colour.jpg";

  const handleNext = () => {
    if (order >= narratives.length - 1) {
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
        className="brightness-80 relative h-full w-full border-none bg-slate object-cover"
        src={sceneBackgroundUrl}
        alt={scene?.title ?? "No image available."}
      />
      {showChoice && choices.length > 0 && <ChoicePanel choices={choices} />}
      <TextPanel
        speakerId={speakerId}
        characterName={characterName}
        characterUrl={characterUrl}
        dialog={text}
        isLoading={navigation.state === "loading"}
        haveChoicesShown={showChoice}
        onNext={handleNext}
      />
    </div>
  );
}
