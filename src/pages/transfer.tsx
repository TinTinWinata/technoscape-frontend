import { ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InsideForm } from "../components/inside-form";
import Navbar from "../components/navbar";
import RpInput from "../components/rp-input";
import { usePin } from "../hooks/pin-context";
import { useUserAuth } from "../hooks/user-context";

export const Transfer = () => {
    const { user, transfer } = useUserAuth();
    const navigate = useNavigate();
    const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { noAccount, amount } = e.target;
        await transfer(noAccount.value, amount.value);
        navigate("/home");
    };
    const { triggerPin } = usePin();

    useEffect(() => {
        triggerPin();
    }, []);

    return (
        <div className="w-full h-full relative">
            <Navbar />
            <InsideForm
                title="Transfer Rekening Lain"
                subTitle="Kirim dengan cepat, aman, dan mudah"
                onSubmit={handleOnSubmit}
                buttonTitle="Transfer"
            >
                <div className="flex flex-col mt-7 gap-2">
                    <label htmlFor="amount" className="font-bold text-font">
                        Ke Rekening
                    </label>
                    <input
                        name="noAccount"
                        type="text"
                        className="rounded-md focus:outline-none py-2 px-4 border border-gray-500 border-opacity-30"
                    />
                </div>
                <div className="flex flex-col mb-4 mt-7 gap-2">
                    <RpInput label="Jumlah Uang" name="amount" />
                </div>
            </InsideForm>
        </div>
    );
};
