import ChoicePanel from "./Panel/ChoicePanel";
import { StoryChunk } from ".server/models/StoryChunk";
import { StoryData } from ".server/models/StoryData";
import TextPanel from "./Panel/TextPanel";
import { useState } from "react";

type GameScreenProps = {
  storyData: StoryData;
  storyChunk: StoryChunk;
};

export default function GameScreen({
  storyData,
  storyChunk,
}: Readonly<GameScreenProps>) {
  const [order, setOrder] = useState(0);
  const [showChoice, setShowChoice] = useState(false);
  const narratives = storyChunk.story.toSorted((a, b) => a.id - b.id);
  const { speakerId, sceneId, text } = narratives[order];
  const { choices } = storyChunk;
  const character = storyData.mainCharacters.find(
    (character) => character.id === speakerId,
  );
  const characterName = `${character?.firstName} ${character?.lastName}`;
  const characterUrl = `data:image/png;base64,${character?.image}`;
  const scene = storyData.mainScenes.find((scene) => scene.id === sceneId);
  const sceneBackgroundUrl = `data:image/png;base64,${scene?.image}`;

  const handleNext = () => {
    if (order === narratives.length - 1) {
      setShowChoice(true);
    } else {
      setOrder(order + 1);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <img
        className="brightness-80 relative h-full w-full object-cover"
        src={sceneBackgroundUrl}
        alt={storyData.mainScenes[0].title}
      />
      {showChoice && <ChoicePanel choices={choices} />}
      <TextPanel
        speakerId={speakerId}
        characterName={characterName}
        characterUrl={characterUrl}
        dialog={text}
        onNext={handleNext}
      />
    </div>
  );
}
