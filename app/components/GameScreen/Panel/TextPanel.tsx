import CharacterImage from './TextPanel/CharacterImage';
import CharacterName from './TextPanel/CharacterName';
import DialogBox from './TextPanel/DialogBox';

type TextPanelProps = {
	speakerId: number;
	characterName: string;
	characterUrl: string;
	dialog: string;
	onNext: () => void;
};

export default function TextPanel({
	speakerId,
	characterName,
	characterUrl,
	dialog,
	onNext,
}: Readonly<TextPanelProps>) {
	const isNarrator = speakerId === -1;
	return (
		<button
			onClick={onNext}
			className='absolute bottom-0 left-0 w-full h-1/2 md:h-1/4'
		>
			<div
				className={`overflow-auto w-full h-full bg-black-80 hover:bg-black-75 transition-all flex py-8 px-16 2xl:px-48 gap-4 md:gap-12 flex-col md:flex-row items-center text-start ${
					isNarrator && 'justify-center'
				}`}
			>
				{!isNarrator && (
					<CharacterImage
						characterName={characterName}
						characterUrl={characterUrl}
					/>
				)}
				<div className='flex flex-col gap-4 items-center justify-center md:items-start basis-4/5'>
					{!isNarrator && <CharacterName characterName={characterName} />}
					<DialogBox dialog={dialog} isNarrator={isNarrator} />
				</div>
			</div>
		</button>
	);
}
