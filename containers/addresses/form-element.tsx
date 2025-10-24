import { InputHTMLAttributes } from "react";

type FormElementProps = {
  label: string;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormElement({
                                      label,
                                      placeholder,
                                      ...args
                                    }: FormElementProps) {
  return (
    <div>
      <label className={"block mb-2 ml-2"}>
        {label}
      </label>
      <input className={"block bg-light-green rounded-lg border border-gray-300 w-full py-2 px-4"}
             placeholder={placeholder || label}
             {...args}
      />
    </div>
  );
};