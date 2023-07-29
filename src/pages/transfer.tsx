import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InsideForm } from "../components/inside-form";
import Navbar from "../components/navbar";
import RpInput from "../components/rp-input";
import { usePin } from "../hooks/pin-context";
import { useUserAuth } from "../hooks/user-context";
import { SelectRekening } from "../components/select";

export const Transfer = () => {
    const { user, transfer } = useUserAuth();
    const [chooseAccount, setChooseAccount] = useState<boolean>(false);

    const navigate = useNavigate();
    const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { reciverAccount, amount } = e.target;
        console.log(reciverAccount.value, amount.value);
        await transfer(reciverAccount.value, amount.value);
        navigate("/home");
    };

    const { triggerPin } = usePin();

    useEffect(() => {
        triggerPin();
    }, []);

    const toogleChooseAccount = () => {
        setChooseAccount(!chooseAccount);
    };

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
                    <div className="w-full gap-2 flex justify-between">
                        {chooseAccount ? (
                            <SelectRekening />
                        ) : (
                            <input
                                name="reciverAccount"
                                type="text"
                                className="rounded-md focus:outline-none py-2 px-4 border border-gray-500 border-opacity-30 w-[85%]"
                            />
                        )}
                        <button
                            type="button"
                            className="bg-primary p-2 rounded-md w-[10%] text-white hover:bg-darkPrimary"
                            onClick={() => toogleChooseAccount()}
                        >
                            {chooseAccount ? (
                                <p>Akun Baru</p>
                            ) : (
                                <p>Pilih Rekening</p>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col mb-4 mt-7 gap-2">
                    <RpInput label="Jumlah Uang" name="amount" />
                </div>
            </InsideForm>
        </div>
    );
};
