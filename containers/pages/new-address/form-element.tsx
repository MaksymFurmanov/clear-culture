export default function FormElement({ label, name, placeholder }: {
  label: string,
  name: string,
  placeholder?: string
}) {
  return (
    <div>
      <label className={"block mb-2 ml-2"}
             htmlFor={name}
      >
        {label}
      </label>
      <input className={"block bg-light-green rounded-lg border border-gray-300 w-full py-2 px-4"}
             placeholder={placeholder || label}
             name={name}
      />
    </div>
  );
};