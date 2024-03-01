type CharacterImageProps = {
	characterName: string;
	characterUrl: string;
};

export default function CharacterImage({
	characterName,
	characterUrl,
}: Readonly<CharacterImageProps>) {
	return (
		<div className='basis-1/5 flex justify-center items-center'>
			<img
				className='w-48 h-48 md:w-54 md:h-54 2xl:w-54 2xl:h-54 rounded-full object-cover border-1 border-black-75 text-center drop-shadow-xl'
				src={characterUrl}
				alt={characterName}
			/>
		</div>
	);
}
