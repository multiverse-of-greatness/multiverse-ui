type SelectQuestionProps = {
  id: string;
  label: string;
  subtitle: string | null;
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
};

export default function SelectQuestion({
  id,
  label,
  subtitle,
  options,
  required = false,
}: Readonly<SelectQuestionProps>) {
  return (
    <div className="mb-4 flex w-full flex-col">
      <label className="flex justify-start text-lg font-bold" htmlFor={id}>
        {label}
        {required && (
          <span className="ml-0.5 align-top text-sm text-red-500">*</span>
        )}
      </label>
      {subtitle && (
        <p className="text-sm text-slate-600 dark:text-slate-200">{subtitle}</p>
      )}
      <div className="flex w-full items-center">
        <select
          className="mt-2 w-full rounded border border-zinc-300 p-2 px-2 dark:border-none hover:bg-zinc-600 dark:bg-zinc-700"
          id={id}
          name={id}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
