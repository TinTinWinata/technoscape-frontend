import {
    FcDebt,
    FcMoneyTransfer,
    FcMultipleDevices,
    FcPortraitMode,
    FcViewDetails,
} from "react-icons/fc";
import { useLoan } from "../../hooks/loan-context";
import { useUserAuth } from "../../hooks/user-context";
import HomeIcon from "./home-icon";

export default function HomeIconContainer() {
    const { user } = useUserAuth();
    const { loan } = useLoan();
    const chekcloan = () => {
        return (
            (loan &&
                loan.loan_approval &&
                loan.loan_approval.is_approved === true &&
                loan.loan !== null &&
                loan.loan.is_payed === true) ||
            loan === null
        );
    };
    return (
        <div className="grid sm:flex grid-cols-3 gap-1 sm: sm:grid-cols-none sm:center w-full ">
            <HomeIcon
                link="/transfer"
                color="green"
                icon={
                    <FcMoneyTransfer className="w-full absolute z-10 h-full" />
                }
                name="Transfer"
            />
            <HomeIcon
                link="/request-loan"
                color="red"
                icon={
                    <FcMultipleDevices className="w-full absolute z-10 h-full" />
                }
                active={chekcloan()}
                textNotActive="Anda sudah melakukan permintaan peminjaman."
                name="Peminjaman"
            />
            <HomeIcon
                link="/history-loan"
                color="red"
                icon={<FcViewDetails className="w-full absolute z-10 h-full" />}
                name="Riwayat Peminjaman"
            />
            <HomeIcon
                link="/pay-loan"
                color="blue"
                icon={<FcDebt className="w-full absolute z-10 h-full" />}
                name="Bayar Peminjaman"
            />
            {user && !user.is_approved && (
                <HomeIcon
                    link="/activate-profile"
                    color="blue"
                    icon={
                        <FcPortraitMode className="w-full absolute z-10 h-full" />
                    }
                    name="Validasi Akun"
                />
            )}
        </div>
    );
}
