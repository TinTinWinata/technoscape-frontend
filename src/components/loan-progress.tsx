import { useEffect, useState } from "react";
import { useLoan } from "../hooks/loan-context";

export function LoanProgress() {
    const { getLoan } = useLoan();

    useEffect(() => {
        getLoan && getLoan();
        console.log("tester");
    }, []);

    return <div>sadfsafd</div>;
}
