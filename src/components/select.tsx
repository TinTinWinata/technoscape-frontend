import { useEffect, useState } from "react";
import Select from "react-select";
import { useUserAuth } from "../hooks/user-context";
import Service from "../utils/service";
import { IBackendInterface } from "../interfaces/backend/backend-response-interface";
import { endpoints } from "../settings/endpoint";

export interface UserConnectedAccounts {
    value: string;
    label: string;
    // receiverAccountUsername: string;
    // receiverAccountNo: string;
}

export function SelectRekening() {
    const { user, bankInfo } = useUserAuth();
    const [userConnectedAccounts, setUserConnectedAccounts] = useState<
        UserConnectedAccounts[]
    >([]);

    const getUserConnectedAccounts = async () => {
        const service = new Service(user?.accessToken);
        const response = await service.request<UserConnectedAccounts[]>(
            endpoints.user.getConnectedUserAccount,
            "",
            { accountNo: bankInfo?.accountNo }
        );
        console.log(response);
        if (response.success) {
            setUserConnectedAccounts(response.data);
        }
    };

    useEffect(() => {
        if (user && bankInfo) {
            getUserConnectedAccounts();
        }
    }, [user]);

    return (
        <Select
            className="basic-single w-[85%]"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="reciverAccount"
            defaultValue={userConnectedAccounts[0]}
            options={userConnectedAccounts}
            placeholder="Pilih Rekening"
        />
    );
}
