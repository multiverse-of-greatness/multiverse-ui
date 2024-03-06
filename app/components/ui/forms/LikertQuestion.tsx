import { PropsWithChildren } from "react";

type LikertQuestionProps = {
  id: string;
  label: string;
  scale: number;
  subtitle: string | null;
  required?: boolean;
  minValue: string;
  maxValue: string;
};

export default function LikertQuestion({
  id,
  label,
  subtitle,
  required,
  scale,
  minValue,
  maxValue,
  children,
}: PropsWithChildren<LikertQuestionProps>) {
  const options = Array.from({ length: scale }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));
  return (
    <fieldset className="mb-4 flex w-full flex-col">
      <legend className=" text-lg font-bold">
        {label}
        {required && <span className="align-top text-sm text-red-500">*</span>}
      </legend>
      {subtitle && (
        <p className="text-sm text-slate-600 dark:text-slate-200">{subtitle}</p>
      )}
      {children}
      <div className="mt-6 flex w-full items-start justify-between">
        <p className="basis-1/6 text-right">{minValue}</p>
        {options.map((option) => (
          <div className="flex flex-col items-center" key={option.value}>
            <input
              className="cursor-pointer"
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              required={required}
            />
            <label
              className="cursor-pointer px-4 py-1"
              htmlFor={`${id}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
        <p className="basis-1/6 text-left">{maxValue}</p>
      </div>
    </fieldset>
  );
}
