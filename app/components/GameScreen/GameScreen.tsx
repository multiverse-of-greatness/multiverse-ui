import { StoryChunk } from '.server/models/StoryChunk';
import { StoryData } from '.server/models/StoryData';
import TextPanel from './Panel/TextPanel';
import { useState } from 'react';

type GameScreenProps = {
	storyData: StoryData;
	storyChunk: StoryChunk;
};

export default function GameScreen({
	storyData,
	storyChunk,
}: Readonly<GameScreenProps>) {
	const [order, setOrder] = useState(0);
	const narratives = storyChunk.story.toSorted((a, b) => a.id - b.id);
	const { speakerId, sceneId, text } = narratives[order];
	const character = storyData.mainCharacters.find(
		(character) => character.id === speakerId
	);
	const characterName = `${character?.firstName} ${character?.lastName}`;
	const characterUrl = `data:image/png;base64,${character?.image}`;
	const scene = storyData.mainScenes.find((scene) => scene.id === sceneId);
	const sceneBackgroundUrl = `data:image/png;base64,${scene?.image}`;

	const handleNext = () => {
		setOrder(order + 1);
		if (order === narratives.length - 1) {
			setOrder(0); // TODO: Start the choice screen & Load next chunk etc.
		}
	};

	return (
		<div className='relative w-screen h-screen'>
			<img
				className='relative object-cover w-full h-full brightness-80'
				src={sceneBackgroundUrl}
				alt={storyData.mainScenes[0].title}
			/>
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
