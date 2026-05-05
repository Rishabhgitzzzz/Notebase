
interface IconProps {
    size: "sm" | "md" | "lg";
}


const iconSize = {
    sm: "w-4 h-4  ",
    md: "w-5 h-5 ",
    lg: "w-7 h-7  "
}






const PlusIcon = (props: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${iconSize[props.size]} `}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

    )
}

export default PlusIcon