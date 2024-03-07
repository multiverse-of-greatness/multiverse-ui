import { PropsWithChildren } from "react";

type FormCategoryProps = {
  category: string;
};

export default function FormCategory({
  category,
  children,
}: PropsWithChildren<FormCategoryProps>) {
  return (
    <div className="mb-6 rounded-xl border p-8 pb-6 shadow-md dark:shadow-slate-50">
      <h2 className="mb-2 text-2xl font-bold">{category}</h2>
      <hr className="mb-6 mt-4" />
      {children}
    </div>
  );
}
