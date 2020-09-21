import { Address } from "./address";
import { Customer } from "./customer";

export interface Contract {
	id?: string;
	customerID?: string;
	customer?: Customer;
	addressID?: string;
	address?: Address;
	type: string;
	serial: string;
	status: ContractStatus;
	changes: Array<Change>;
	date: string;
}

export interface Change {
	date: string;
	description: string;
}

export enum ContractStatus {
	ongoing = "ongoing",
	canceled = "canceled",
}
