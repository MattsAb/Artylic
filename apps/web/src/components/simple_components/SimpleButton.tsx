
type SimpleButtonProps = {
    label: string
    onClick: () => void;
    mode?: 'default' | 'artylic'
}

function SimpleButton ({label, onClick, mode = 'default'}: SimpleButtonProps) {

    return (
        <button 
            className={` py-2 px-3 rounded-full ${mode == 'artylic' ? 'bg-rose-800 hover:bg-rose-700 font-bold' : 'dark:bg-mist-700 hover:dark:bg-mist-600'}  cursor-pointer`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
export default SimpleButton