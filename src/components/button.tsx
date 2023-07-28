import { Player } from "@lottiefiles/react-lottie-player";

export enum ButtonType {
    Active,
    Deactivated,
    Outline,
}

interface IButtonProps {
    children?: JSX.Element | string;
    type?: "button" | "submit" | "reset" | undefined;
    buttonType?: ButtonType;
    full?: boolean;
    padding?: number;
    width?: number;
    className?: string;
    onClick?: () => void;
    isLoading?: boolean;
}

export default function Button({
    onClick = () => {},
    children = <></>,
    buttonType = ButtonType.Active,
    type = "submit",
    full = true,
    padding = 2,
    className = "",
    width,
    isLoading = false,
}: IButtonProps) {
    const baseClass =
        "transition-all transition:all hover:bg-darkPrimary focus:outline-none font-medium text-sm rounded-md  cursor-pointer ";
    const getClass = () => {
        let thisClass = baseClass;
        if (buttonType === ButtonType.Active) {
            thisClass += "bg-primary text-white ";
        } else if (buttonType === ButtonType.Deactivated) {
            thisClass += "text-gray-500 bg-gray-300 ";
        } else if (buttonType === ButtonType.Outline) {
            thisClass += "border border-primary text-primary bg-white ";
        }
        thisClass += className + " ";
        thisClass += `py-${padding} px-${padding + 2} `;
        if (width) thisClass += `w-${width}`;
        if (full) thisClass += "w-full";
        return thisClass;
    };
    return (
        <div className="relative w-full">
            {isLoading && (
                <div className="absolute right-0 h-full">
                    <div className="center h-full">
                        <Player
                            src="./animation/loading-3.json"
                            className="w-10 h-10"
                            autoplay
                            loop
                        />
                    </div>
                </div>
            )}
            <button
                disabled={isLoading}
                onClick={onClick}
                type={type}
                className={getClass()}
            >
                {children.toString()}
            </button>
        </div>
    );
}
