import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: "primary" | "secondary" | "success" | "warning";
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  children,
  color = "primary",
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      className={`btn btn-sm btn-outline-${color}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
