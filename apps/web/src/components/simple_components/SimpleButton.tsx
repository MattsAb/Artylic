
type SimpleButtonProps = {
    label: string
    onClick: () => void;
}

function SimpleButton ({label, onClick}: SimpleButtonProps) {

    return (
        <button 
            className="dark:bg-mist-700 py-2 px-3 rounded-full hover:dark:bg-mist-600 cursor-pointer"
            onClick={onClick}
        >
            {label}
        </button>
    )
}
export default SimpleButton