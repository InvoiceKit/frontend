export enum InvoiceType {
    invoice = "invoice",
    quote = "quote"
}

export enum InvoiceStatus {
    paid = "paid",
    waiting = "waiting",
    canceled = "canceled"
}

export interface Invoice {
    id?: string
    customerID?: string
    addressID?: string
    type: InvoiceType,
    status: InvoiceStatus,
    number?: string,
    deposit?: number,
    promotion?: number
}