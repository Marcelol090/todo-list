type InputLabelProps = {
    label: string;
    placeholder?: string;
    id: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  };
  export const InputLabel = ({
    label,
    placeholder,
    id,
    type = "text",
    value,
    onChange,
    required,
  }: InputLabelProps) => {
    return (
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    );
  };