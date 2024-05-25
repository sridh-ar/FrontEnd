import { XMarkIcon } from "@heroicons/react/24/solid";

export default function CloseIcon({ className = "", onClick }) {
    return (
        <div className={`bg-gray-300 shadow flex items-center justify-center rounded-full absolute cursor-pointer w-7 h-7 z-50 ${className}`}>
            <XMarkIcon
                width={20}
                height={20}
                color="gray"
                onClick={onClick}
            />
        </div>
    )
}