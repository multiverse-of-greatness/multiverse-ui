import CharacterImage from "./TextPanel/CharacterImage";
import CharacterName from "./TextPanel/CharacterName";
import DialogBox from "./TextPanel/DialogBox";
import LoadingSpinner from "~/components/LoadingSpinner";

type TextPanelProps = {
  speakerId: number;
  characterName: string;
  characterUrl: string;
  dialog: string;
  isLoading: boolean;
  haveChoicesShown: boolean;
  onNext: () => void;
};

export default function TextPanel({
  speakerId,
  characterName,
  characterUrl,
  dialog,
  isLoading,
  haveChoicesShown,
  onNext,
}: Readonly<TextPanelProps>) {
  const isNarrator = speakerId === -1;
  const isDisableClicked = isLoading || haveChoicesShown;

  return (
    <button
      onClick={onNext}
      className={`${haveChoicesShown && "hidden md:block"} absolute bottom-0 left-0 h-2/5 w-full md:h-1/4 ${isDisableClicked ? "cursor-not-allowed" : "cursor-pointer"}`}
      disabled={isDisableClicked}
    >
      {isLoading && (
        <LoadingSpinner size="md" position="absolute" color="white" />
      )}
      <div
        className={`flex h-full w-full flex-col items-center gap-4 overflow-auto bg-black-80 px-8 py-4 text-start transition-all md:flex-row md:gap-12 md:px-16 md:py-8 2xl:px-48 ${
          isNarrator && "justify-center"
        } ${!isDisableClicked && "hover:bg-black-75"}`}
      >
        {!isNarrator && (
          <CharacterImage
            characterName={characterName}
            characterUrl={characterUrl}
          />
        )}
        <div className="flex flex-col items-center justify-center gap-4 md:basis-4/5 md:items-start">
          {!isNarrator && <CharacterName characterName={characterName} />}
          <DialogBox dialog={dialog} isNarrator={isNarrator} />
        </div>
        {!haveChoicesShown && (
          <div className="absolute bottom-6 right-6 flex items-center rounded-full border border-slate-400 px-4 py-1 text-lg text-zinc-300 shadow transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-2 group-hover:bg-zinc-950 lg:text-2xl">
            <p>Next</p>
            <p className="arrow-right" />
          </div>
        )}
      </div>
    </button>
  );
}
