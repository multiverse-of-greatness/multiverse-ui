type ChoiceQuestionProps = {
  id: string;
  label: string;
  subtitle: string | null;
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
};

export default function ChoiceQuestion({
  id,
  label,
  subtitle,
  options,
  required = false,
}: Readonly<ChoiceQuestionProps>) {
  return (
    <fieldset className="mb-4 flex w-full flex-col">
      <legend className="flex justify-start text-lg font-bold">
        {label}
        {required && (
          <span className="ml-0.5 align-top text-sm  text-red-500">*</span>
        )}
      </legend>
      {subtitle && (
        <p className="text-sm text-slate-600 dark:text-slate-200">{subtitle}</p>
      )}
      <div className="mt-2 flex flex-col">
        {options.map((option) => (
          <div
            className="my-2 flex cursor-pointer rounded-lg border px-4 transition-colors hover:bg-indigo-50 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-100 dark:hover:bg-zinc-700 dark:has-[:checked]:border-indigo-700 dark:has-[:checked]:bg-inherit"
            key={option.value}
          >
            <input
              className="cursor-pointer"
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              required={required}
            />
            <label
              className="ml-4 w-full cursor-pointer py-3"
              htmlFor={`${id}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
