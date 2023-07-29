import { ChangeEvent } from "react";
import Button from "./button";
import { Link } from "react-router-dom";

interface IFormProps {
    width: string;
    onSubmit?: (e: ChangeEvent<HTMLFormElement>) => void;
    children?: JSX.Element[] | JSX.Element;
    title?: string;
    subTitle?: string;
    buttonName?: string;
    formType?: FormType;
}

export enum FormType {
    Register = "Register",
    Login = "Login",
}

export default function Form({
    width,
    onSubmit,
    children,
    title,
    subTitle,
    buttonName = "Submit",
    formType,
}: IFormProps) {
    return (
        <form
            onSubmit={onSubmit}
            className={`shadow-md w-[450px] gap-2 flex flex-col justify-center items-center text-center bg-white rounded-md p-10`}
        >
            <h1 className="font-semibold text-2xl">{title}</h1>
            <p className="text-secondaryFont text-sm">{subTitle}</p>
            <div className="pt-8 w-full flex flex-col gap-2">{children}</div>
            <Button className="mt-5" full={true}>
                {buttonName}
            </Button>
            {formType === FormType.Register && (
                <div className="text-sm mt-5 center gap-1">
                    <p className="text-secondaryFont">Sudah punya akun ?</p>
                    <Link
                        to="/login"
                        className="text-primary curosr-pointer font-bold hover:underline"
                    >
                        Login Disini
                    </Link>
                </div>
            )}
        </form>
    );
}
