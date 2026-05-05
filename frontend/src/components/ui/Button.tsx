import type { ReactElement } from "react";


interface buttonprops {
    title: string;
    size: "sm" | "md" | "lg";
    variants: "primary" | "secondary";
    starticon?: string | ReactElement;
    endicon?: string | ReactElement
}

const buttonSize = {
    sm: " py-1 px-4 ",
    md: "py-2 px-6",
    lg: "py-3 px-8"
}

const VariantsStyles = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-300 text-purple-500",
}

const defaultStyle = "rounded-md mx-3 my-2 flex items-center justify-center gap-2"


const Button = (props: buttonprops) => {
    return (
        <button className={`${VariantsStyles[props.variants]} ${buttonSize[props.size]} ${defaultStyle}`}>{props.starticon} {props.title}</button >
    )
}

export default Button