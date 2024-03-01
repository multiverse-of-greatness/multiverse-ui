type CharacterNameProps = {
	characterName: string;
};

export default function CharacterName({
	characterName,
}: Readonly<CharacterNameProps>) {
	return (
		<p className='text-white text-2xl lg:text-3xl 2xl:text-4xl font-bold text-center md:text-start'>
			{characterName}
		</p>
	);
}
