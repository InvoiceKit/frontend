import { Address } from "./address";
import { Customer } from "./customer";
import { Field } from "./field";

export enum InvoiceType {
	invoice = "invoice",
	quote = "quote",
}

export enum InvoiceStatus {
	paid = "paid",
	waiting = "waiting",
	canceled = "canceled",
}

export interface Invoice {
	id?: string;
	customerID?: string;
	customer?: Customer;
	addressID?: string;
	address?: Address;
	updatedAt: string;
	createdAt: string;
	dueDate: string;
	type: InvoiceType;
	status: InvoiceStatus;
	fields: Array<Field>;
	number: string;
	deposit: number;
	promotion: number;
	additional_text: string;
}

export interface InvoiceOutput extends Invoice {
	no_vat: number;
	vat: number;
	total: number;
	_promotion: number;
	final: number;
}
