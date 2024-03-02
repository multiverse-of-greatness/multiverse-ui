type CharacterNameProps = {
  characterName: string;
};

export default function CharacterName({
  characterName,
}: Readonly<CharacterNameProps>) {
  return (
    <p className="text-center text-2xl font-bold text-slate-50 md:text-start lg:text-3xl 2xl:text-4xl">
      {characterName}
    </p>
  );
}
