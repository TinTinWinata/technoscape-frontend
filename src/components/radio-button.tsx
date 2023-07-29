interface IRadioButtonProps {
    names: string[];
    id?: string;
}

export default function RadioButton({
    names,
    id = "blue-jacket",
}: IRadioButtonProps) {
    return (
        <div className="w-full flex gap-1">
            {names.map((name: string) => (
                <div key={name} className="flex accent-primary">
                    <div className="center">
                        <input
                            type="radio"
                            className=""
                            name={id}
                            value={name}
                        ></input>
                    </div>
                    <div className="center ml-1 mr-2">
                        <label className="text-xs xl:text-sm" htmlFor={name}>
                            {name}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
}
