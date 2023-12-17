import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  forElement: string;
  label_cn?: string;
  input_cn?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", label, forElement, input_cn, label_cn,...rest }, ref) => {
    return (
      <section className="flex flex-col gap-2">
        <label
          className={twMerge(label_cn, "block font-semibold")}
          htmlFor={forElement}
        >
          {label}
        </label>
        <input
          className={twMerge(
            input_cn,
            "outline-none p-3 border border-zinc-200 rounded-md"
          )}
          type={type}
          ref={ref}
          {...rest}
        />
      </section>
    );
  }
);

export default Input