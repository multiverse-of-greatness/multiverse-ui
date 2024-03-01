import CharacterImage from "./TextPanel/CharacterImage";
import CharacterName from "./TextPanel/CharacterName";
import DialogBox from "./TextPanel/DialogBox";

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
      className="absolute bottom-0 left-0 h-1/2 w-full md:h-1/4"
    >
      <div
        className={`flex h-full w-full flex-col items-center gap-4 overflow-auto bg-black-80 px-16 py-8 text-start transition-all hover:bg-black-75 md:flex-row md:gap-12 2xl:px-48 ${
          isNarrator && "justify-center"
        }`}
      >
        {!isNarrator && (
          <CharacterImage
            characterName={characterName}
            characterUrl={characterUrl}
          />
        )}
        <div className="flex basis-4/5 flex-col items-center justify-center gap-4 md:items-start">
          {!isNarrator && <CharacterName characterName={characterName} />}
          <DialogBox dialog={dialog} isNarrator={isNarrator} />
        </div>
      </div>
    </button>
  );
}
