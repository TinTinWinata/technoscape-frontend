export interface IRequestLoanForm {
    user: number;
    loan_amount: number;
    loan_days_term: number;
}

export interface IAcceptLoan {
    approval: string;
}

export interface IPayLoan {
    load: string;
}

export interface IGetLoan {
    loan_approval: {
        id: string;
        receiverAccountNo: string;
        loan_amount: number;
        loan_days_term: number;
        is_approved: boolean;
        user: number;
    };
    loan: {
        id: string;
        is_payed: boolean;
        approval: string;
    };
}
