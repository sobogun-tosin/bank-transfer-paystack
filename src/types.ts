import { boolean } from "yup";

export interface BankList {
  code: number;
  name: string;
}
export interface BankListData {
  name: string;
  slug: string;
  code: number;
  longcode: string;
  gateway: null;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResolveAccount {
  bank_code: string;
  account_number: string;
}

export interface Recipient {
  type?: string;
  name?: string;
  account_number: string;
  bank_code: string;
  currency?: string;
}

export interface CreateTransfer {
  source?: string;
  amount: string;
  recipient?: string;
  reason: string;
}

export interface ResolvedAccountData {
  account_number: string;
  account_name: string;
  bank_id: number;
}

export interface ResolvedAccountType {
  account_number: string;
  account_name: string;
  bank_id: number;
}

interface Details {
  authorization_code: string | null;
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

export interface RecipientData {
  active: boolean;
  createdAt: string;
  currency: string;
  description: string | null;
  details: Details;
  domain: string;
  email: string | null;
  id: number;
  integration: number;
  isDeleted: boolean;
  is_deleted: boolean;
  metadata: string | null;
  name: string;
  recipient_code: string;
  type: string;
  updatedAt: string;
}

export interface TransferError {
  message: string;
  status: boolean;
}
