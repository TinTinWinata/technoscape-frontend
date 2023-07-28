import { ChangeEvent } from "react";
import { MdEmail } from "react-icons/md";
import Form from "../components/form";
import Input from "../components/input";
import useLoading from "../hooks/useLoading";
import { endpoints } from "../settings/endpoint";
import Service from "../utils/service";
import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import {
    toastLoading,
    toastUpdateFailed,
    toastUpdateSuccess,
} from "../settings/toast-setting";

export default function ForgetPassword() {
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        const toastId = toastLoading("Mohon ditunggu");
        e.preventDefault();
        const { email } = e.target;
        const service = new Service();
        const data = {
            email: email.value,
        };

        const response = await service.request<IBackendInterface<any>>(
            endpoints.user.changeForgotPassword,
            "",
            data
        );

        if (response.success) {
            toastUpdateSuccess(toastId, "Berhasil mengirim email");
        } else {
            toastUpdateFailed(toastId, response.errorMessage);
        }
    };
    return (
        <div className="">
            <Form
                title="Forgot Password"
                subTitle="Send your email and we’ll send you a link to reset a password."
                width="450"
                onSubmit={handleSubmit}
                buttonName="Submit"
            >
                <Input
                    name="email"
                    label="Enter Your Email"
                    icon={<MdEmail />}
                />
            </Form>
        </div>
    );
}
