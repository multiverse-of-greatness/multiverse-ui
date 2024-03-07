type CharacterImageProps = {
  characterName: string;
  characterUrl: string;
};

export default function CharacterImage({
  characterName,
  characterUrl,
}: Readonly<CharacterImageProps>) {
  return (
    <div className="flex items-center justify-center md:basis-1/5">
      <img
        className="md:w-54 md:h-54 2xl:w-54 2xl:h-54 border-1 h-40 w-40 rounded-full border-black-75 object-cover text-center drop-shadow-xl"
        src={characterUrl}
        alt={characterName}
      />
    </div>
  );
}
