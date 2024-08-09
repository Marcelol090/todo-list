export type ButtonVariant = "filled" | "outlined" | "text";

export type ButtonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

export const Button = ({
  variant = "filled",
  children,
  ...props
}: ButtonProps) => {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-md transition duration-150 ease-in-out ";

  const variantClass = {
    filled:
      "bg-primary-500 text-white hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 focus:ring-opacity-50 text-sm px-4 py-2.5",
    outlined:
      "border border-primary-500 text-primary-500 hover:bg-primary-50 hover:text-primary-600 focus:ring-4 focus:ring-primary-300 focus:ring-opacity-50 text-sm px-4 py-2.5",
    text: "text-primary-500 hover:bg-primary-50 hover:text-primary-600 focus:ring-4 focus:ring-primary-300 focus:ring-opacity-50 text-sm px-4 py-2.5",
  };

  return (
    <button
      type="button"
      className={`${baseClass} ${variantClass[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
