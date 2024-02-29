import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getStories } from 'server/stories.server';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export const loader = async () => {
	const stories = await getStories();
	const randomStory = stories[Math.floor(Math.random() * stories.length)];
	return json({ story: randomStory });
};

export default function Index() {
	const data = useLoaderData<typeof loader>();

	return <p>{data.story}</p>;
}
