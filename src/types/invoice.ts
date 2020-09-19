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
    dueDate: string
    type: InvoiceType
    status: InvoiceStatus
    number: string
    deposit: number
    promotion: number
    additional_text: string
}

export interface InvoiceOutput extends Invoice {
    createdAt: number
    updatedAt: number
    no_vat: number
    vat: number
    total: number
    _promotion: number
    final: number
} 