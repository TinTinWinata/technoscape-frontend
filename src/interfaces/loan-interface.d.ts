export interface IRequestLoanForm {
  user: number;
  loan_amount: number;
  loan_days_term: number;
}

export interface IRequestLoan {
  prediction: number;
}

export interface IAcceptLoan {
  approval: string;
}

export interface IPayLoan {
  load: string;
}

export interface IGetLoan {
  loan_approval: {
    created_at: Date;
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

export interface IGetLoanApproval {
  id: string;
  user: number;
  loan_amount: number;
  loan_days_term: number;
  receiverAccountNo: string;
  is_approved: boolean | null;
  create_at: string;
  user_data: {
    uid: string;
    username: string;
    email: string;
    gender: 1;
    role: string;
    user_approval: 6;
  };
}

export interface IApproveLoanApprovalForm {
  loan_approval_id: string;
  user_id: number;
}
