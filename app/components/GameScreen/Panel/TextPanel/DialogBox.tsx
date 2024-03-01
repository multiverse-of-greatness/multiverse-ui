type DialogBoxProps = {
	dialog: string;
	isNarrator: boolean;
};

export default function DialogBox({
	isNarrator,
	dialog,
}: Readonly<DialogBoxProps>) {
	return (
		<p
			className={`text-white text-lg lg:text-xl 2xl:text-2xl tracking-wide leading-relaxed ${
				isNarrator &&
				'font-bold text-center lg:px-16 text-xl lg:text-2xl 2xl:text-3xl'
			}`}
		>
			{dialog}
		</p>
	);
}
