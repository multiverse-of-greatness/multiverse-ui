type ChoiceProps = {
  id: number;
  choice: string;
  description: string;
};

export default function Choice({
  id,
  choice,
  description,
}: Readonly<ChoiceProps>) {
  return (
    <button
      className="flex w-full flex-col rounded-lg border border-white-50 bg-black-50 px-8 py-4 text-start text-lg text-indigo-300 drop-shadow-sm transition-all hover:border-indigo-900 hover:bg-indigo-900 hover:text-white"
      name="choiceId"
      value={id}
    >
      <p className="mb-2 text-xl font-bold md:mb-0 md:text-2xl">{choice}</p>
      {description && <p className="text-md text-white">{description}</p>}
    </button>
  );
}
