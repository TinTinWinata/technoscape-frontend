import { ChangeEvent, useState } from "react";
import { MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/form";
import Input from "../components/input";
import useLoading from "../hooks/useLoading";
import { useUserAuth } from "../hooks/user-context";
import { ILoginForm } from "../interfaces/backend/login-form-interface";

export default function Login() {
    const { login } = useUserAuth();
    const { isLoading, onStart, onFinish } = useLoading();
    const navigate = useNavigate();

    const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { username, password } = e.target;
        const dataForm: ILoginForm = {
            password: password.value,
            username: username.value,
        };
        await login(dataForm);
    };

    return (
        <div className="flex flex-col">
            <Form
                title="Selamat Datang"
                subTitle="Masukan kredensial Anda untuk mengakses akun Anda."
                width="450"
                onSubmit={handleLogin}
                buttonName="Masuk"
            >
                <Input
                    icon={<MdPerson />}
                    label="Masukan usernama anda"
                    type="text"
                    name="username"
                />
                <Input
                    icon={<RiLockPasswordFill />}
                    label="Masukan password anda"
                    type="password"
                    name="password"
                />
                <Link
                    to="/forgot-password"
                    className="text-primary curosr-pointer hover:underline text-end"
                >
                    Lupa Password
                </Link>
            </Form>
            <div className="text-sm mt-5 center gap-1">
                <p className="text-secondaryFont">Anda belum punya akun ?</p>
                <Link
                    to="/register"
                    className="text-primary curosr-pointer hover:underline font-bold"
                >
                    Daftar Disini
                </Link>
            </div>
        </div>
    );
}
