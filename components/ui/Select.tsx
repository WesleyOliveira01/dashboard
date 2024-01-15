import { forwardRef, ReactNode, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  label: string;
  forElement: string;
  label_cn?: string;
  select_cn?: string;
  error_message: string;
};

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { children, forElement, label_cn, select_cn, error_message }: SelectProps,
    ref
  ) => {
    return (
      <>
        <label className={twMerge("",label_cn)} htmlFor={forElement}></label>
        <select className={twMerge("",select_cn)} ref={ref} name={forElement} id={forElement}>
          {children}
        </select>
        <p className="text-rose-500">{error_message}</p>
      </>
    );
  }
);

export default Select;
