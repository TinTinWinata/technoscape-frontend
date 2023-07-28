import { ChangeEvent, useEffect } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/form";
import Input from "../components/input";
import useLoading from "../hooks/useLoading";
import { useUserAuth } from "../hooks/user-context";
import Service from "../utils/service";
import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import { endpoints } from "../settings/endpoint";
import { IRegisterForm } from "../interfaces/backend/register-form-interface";
import { IResetPassword } from "../interfaces/user-interface";
import {
    toastLoading,
    toastUpdateFailed,
    toastUpdateSuccess,
} from "../settings/toast-setting";

export default function ResetPassword() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checkId();
    }, [id]);

    const checkId = async () => {
        const service = new Service();

        const response = await service.request<IBackendInterface<any>>(
            endpoints.user.validateForgotPassword,
            "",
            { forgot_password_link_id: id }
        );

        if (response.success === false) {
            navigate("/");
        }
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toastLoading("Mohon ditunggu");
        const { newPassword, confirmPassword } = e.target;

        if (newPassword.value === confirmPassword.value) {
            const data: IResetPassword = {
                current_password: newPassword.value,
                forgot_password_link_id: id,
            };

            const service = new Service();

            const response = await service.request<IBackendInterface<any>>(
                endpoints.user.changePassword,
                "",
                data
            );

            if (response.success) {
                toastUpdateSuccess(toastId, "Berhasil mengganti kata sandi");
                navigate("/");
            } else {
                toastUpdateFailed(toastId, response.errorMessage);
            }
        } else {
            toastUpdateFailed(toastId, "Konfimasi kata sandi tidak sesuai");
        }
    };
    return (
        <div className="">
            <Form
                title="Reset Password"
                subTitle="Create a new password that is at least 8 characters long and password must be alphanumberic."
                width="450"
                onSubmit={handleSubmit}
                buttonName="Submit"
            >
                <Input
                    name="newPassword"
                    label="Enter Your New Password"
                    icon={<RiLockPasswordFill />}
                    type="password"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    icon={<RiLockPasswordFill />}
                />
            </Form>
        </div>
    );
}
