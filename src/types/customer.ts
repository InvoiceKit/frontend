import {Address} from "./address";
import {Contract} from "./contract";
import {Invoice} from "./invoice";

export interface Customer {
    id?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    email?: string;
    phone?: string;
    addresses?: Array<Address>;
    contracts?: Array<Contract>;
    invoices?: Array<Invoice>;
}
