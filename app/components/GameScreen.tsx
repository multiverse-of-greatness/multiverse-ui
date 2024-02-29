import { StoryChunk } from '.server/models/StoryChunk';
import { StoryData } from '.server/models/StoryData';
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
	const characterName = `${storyData.mainCharacters[0].firstName} ${storyData.mainCharacters[0].lastName}`;
	const sceneBackgroundUrl = `data:image/png;base64,${storyData.mainScenes[0].image}`;
	const characterUrl = `data:image/png;base64,${storyData.mainCharacters[0].image}`;
	const narratives = storyChunk.story.sort((a, b) => a.id - b.id);
	const currentNarrative = narratives[order];

	const handleNext = () => {
		setOrder(order + 1);
	};

	return (
		<div className='relative w-screen h-screen'>
			<img
				className='relative object-cover w-full h-full brightness-80'
				src={sceneBackgroundUrl}
				alt={storyData.mainScenes[0].title}
			/>
			<button onClick={handleNext}>
				<div
					className={`absolute overflow-auto bottom-0 left-0 w-full h-1/2 md:h-1/4 bg-black-75 transition-opacity flex py-8 px-16 2xl:px-48 gap-4 md:gap-12 flex-col md:flex-row items-center text-start ${
						currentNarrative.speaker_id === -1 && 'justify-center'
					}`}
				>
					{currentNarrative.speaker_id !== -1 && (
						<div className='basis-1/4'>
							<img
								className='h-auto w-auto md:h-full md:max-w-none max-h-4'
								src={characterUrl}
								alt={`${storyData.mainCharacters[0].firstName} ${storyData.mainCharacters[0].lastName}`}
							/>
						</div>
					)}
					<div className='flex flex-col gap-4 items-center basis-3/4'>
						{currentNarrative.speaker_id !== -1 && (
							<p className='text-white text-2xl lg:text-3xl 2xl:text-4xl font-bold text-center md:text-start'>
								{characterName}
							</p>
						)}
						<p
							className={`text-white text-lg lg:text-xl 2xl:text-2xl tracking-wide leading-relaxed ${
								currentNarrative.speaker_id === -1 &&
								'font-bold text-center lg:px-16 text-xl lg:text-2xl 2xl:text-3xl'
							}`}
						>
							{currentNarrative.text}
						</p>
					</div>
				</div>
			</button>
		</div>
	);
}
