/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  forElement: string;
  label_cn?: string;
  input_cn?: string;
  error_message?:string
  box_cn?:string
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", label, forElement, input_cn, label_cn,error_message,box_cn,...rest }, ref) => {
    return (
      <section className={twMerge("flex flex-col gap-2",box_cn)}>
        <label
          className={twMerge(label_cn, "block font-semibold")}
          htmlFor={forElement}
        >
          {label}
        </label>
        <input
          className={twMerge(
            input_cn,
            "outline-none p-3 focus:border-zinc-200 focus:ring-0 border border-zinc-200 rounded-md"
          )}
          type={type}
          ref={ref}
          {...rest}
        />
        <p className="text-rose-500">
            {error_message}
        </p>
      </section>
    );
  }
);

export default Input