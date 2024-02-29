import { StoryChunk } from '.server/models/StoryChunk';
import { StoryData } from '.server/models/StoryData';
import {
	getFirstStoryChunk,
	getStories,
	getStoryDataById,
} from '.server/stories.server';
import { type MetaFunction } from '@remix-run/node';

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import GameScreen from '~/components/GameScreen';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Multiverse UI' },
		{ name: 'description', content: 'Infinite Possibilities' },
	];
};

export const loader = async () => {
	const stories = await getStories();
	let randomStoryId = stories[Math.floor(Math.random() * stories.length)];
	// TODO: Delete
	const allow_ids = [
		'488395e4-d625-11ee-9079-9a01b5b45ca5',
		// '825d3e06-d624-11ee-bc5f-9a01b5b45ca5',
	];
	while (!allow_ids.includes(randomStoryId)) {
		randomStoryId = stories[Math.floor(Math.random() * stories.length)];
	}

	const storyData = await getStoryDataById(randomStoryId);
	const storyChunk = await getFirstStoryChunk(randomStoryId);
	return json({ storyData, storyChunk });
};

export default function Index() {
	const data = useLoaderData<typeof loader>();
	return !data ? (
		<div className='h-screen w-screen flex justify-center items-center'>
			<p className='text-xl text-center'>Loading...</p>
		</div>
	) : (
		<GameScreen
			storyData={data.storyData as StoryData}
			storyChunk={data.storyChunk as StoryChunk}
		/>
	);
}
