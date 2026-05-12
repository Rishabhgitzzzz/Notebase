import type { ReactElement } from "react";

interface buttonprops {
  title: string;
  size: "sm" | "md" | "lg";
  variants: "primary" | "secondary";
  starticon?: string | ReactElement;
  endicon?: string | ReactElement;
  onClick?: () => void;
}

const buttonSize = {
  sm: " py-1 px-4 ",
  md: "py-2 px-6",
  lg: "py-3 px-9 w-full",
};

const VariantsStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-500 ",
};

const defaultStyle =
  "rounded-md mx-3 my-2 flex items-center  gap-2 cursor-pointer";

const Button = (props: buttonprops) => {
  return (
    <button
      className={`${VariantsStyles[props.variants]} ${buttonSize[props.size]} ${defaultStyle}`}
      onClick={props.onClick}
    >
      {props.starticon} {props.title}
    </button>
  );
};

export default Button;
