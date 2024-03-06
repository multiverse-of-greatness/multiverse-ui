type TextQuestionProps = {
  id: string;
  label: string;
  subtitle: string | null;
  type?: "text" | "email" | "number";
  required?: boolean;
  minValue?: number;
  maxValue?: number;
};

export default function TextQuestion({
  id,
  label,
  subtitle,
  type = "text",
  required = false,
  minValue,
  maxValue,
}: Readonly<TextQuestionProps>) {
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
      <input
        className="mt-2 rounded border border-zinc-300 bg-zinc-50 p-2 px-3 transition-colors hover:border-indigo-500 dark:border-none dark:bg-zinc-700 dark:hover:bg-zinc-600"
        id={id}
        name={id}
        type={type}
        min={minValue}
        max={maxValue}
        required={required}
      />
    </div>
  );
}
