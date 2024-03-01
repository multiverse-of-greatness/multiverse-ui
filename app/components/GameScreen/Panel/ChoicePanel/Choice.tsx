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
      className="flex w-full flex-col rounded-lg bg-black-50 px-8 py-4 text-lg text-white transition-all hover:bg-black-75 hover:text-indigo-300"
      name="choiceId"
      value={id}
    >
      <p className="text-xl font-bold">{choice}</p>
      {description && <p>{description}</p>}
    </button>
  );
}
