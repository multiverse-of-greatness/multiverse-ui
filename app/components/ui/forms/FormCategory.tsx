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
      <h2 className="text-2xl font-bold mb-2">{category}</h2>
      <hr className="mt-4 mb-6" />
      {children}
    </div>
  );
}
