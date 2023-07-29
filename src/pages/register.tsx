import { ChangeEvent } from "react";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { MdEmail, MdPerson, MdPhone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Form, { FormType } from "../components/form";
import Input from "../components/input";
import RadioButton from "../components/radio-button";
import { useUserAuth } from "../hooks/user-context";
import { IRegisterForm } from "../interfaces/backend/register-form-interface";
import useLoading from "../hooks/useLoading";
import { isAlphanumberic } from "../utils/validator";
import { RegisterSlider } from "../components/register-slider";

export default function Register() {
    const { register } = useUserAuth();
    const { onError } = useLoading();

    const handleRegister = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { ktpId, email, password, pin, gender, username, phone } =
            e.target;

        const dataForm: IRegisterForm = {
            birthDate: "12121993",
            email: email.value,
            gender: gender.value === "Male" ? "1" : "0",
            ktpId: ktpId.value,
            loginPassword: password.value,
            phoneNumber: phone.value,
            pin: pin.value,
            username: username.value,
        };

        if (
            (dataForm.pin !== "") !== null &&
            dataForm.pin.toString().length != 6
        ) {
            onError("Pin harus terdiri dari 6 digit");
            return;
        } else if (
            dataForm.loginPassword !== "" &&
            !isAlphanumberic(dataForm.loginPassword)
        ) {
            onError("Kata sandi harus terdiri dari alphanumberic");
            return;
        } else {
            await register(dataForm);
        }
    };

    return (
        <div className="grid grid-cols-3 w-[80%] rounded-lg">
            <RegisterSlider />
            <div className="flex flex-col">
                <Form
                    title="Buat Akun Baru"
                    subTitle="Buat kredensial Anda sendiri untuk mengakses bisa aplikasi kami."
                    width="w-full"
                    onSubmit={handleRegister}
                    buttonName="Create Account"
                    formType={FormType.Register}
                >
                    <Input
                        icon={<MdPerson />}
                        label="Masukan nama pengguna"
                        type="text"
                        name="username"
                    />
                    <Input
                        icon={<MdEmail />}
                        label="Masukan email"
                        type="email"
                        name="email"
                    />
                    <Input
                        icon={<BsFillCreditCard2FrontFill />}
                        label="Masukan KTP ID"
                        type="text"
                        name="ktpId"
                    />
                    <Input
                        icon={<MdPhone />}
                        label="Masukan nomor handphone"
                        type="text"
                        name="phone"
                    />
                    <Input
                        icon={<RiLockPasswordFill />}
                        label="Masukan kata sandi"
                        type="password"
                        name="password"
                    />
                    <Input
                        icon={<RiLockPasswordFill />}
                        label="Masukan pin (6 digit)"
                        type="password"
                        name="pin"
                    />

                    <RadioButton names={["Male", "Female"]} id="gender" />
                </Form>
            </div>
        </div>
    );
}
