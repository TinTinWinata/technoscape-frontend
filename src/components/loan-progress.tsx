import { useEffect, useState } from "react";
import { useLoan } from "../hooks/loan-context";
import { useUserAuth } from "../hooks/user-context";

export function LoanProgress() {
    const { getLoan, loan, acceptLoan, payLoan } = useLoan();
    const { user } = useUserAuth();

    useEffect(() => {
        getLoan && getLoan();
    }, [user]);

    const handleAcceptLoan = async () => {
        if (loan) {
            await acceptLoan(loan?.loan_approval.id);
        }
    };

    return (
        <div>
            <div>
                {loan && (
                    <div>
                        <p>{loan.loan_approval.id}</p>
                        {loan.loan_approval.is_approved && (
                            <button onClick={handleAcceptLoan}>Accept</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
