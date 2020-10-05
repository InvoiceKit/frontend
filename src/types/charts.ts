import { Dictionary } from "vue-router/types/router";

export interface Charts {
	daily: object;
	contracts: object;
	invoice: InvoiceStats;
	price: InvoicePrices;
	customer: number;
	contracts_count: number;
}

export interface InvoiceStats {
	total: number;
	waiting: number;
	paid: number;
	canceled: number;
}

export interface InvoicePrices {
	waiting: InvoicePrice;
	paid: InvoicePrice;
	canceled: InvoicePrice;
}

export interface InvoicePrice {
	value: number;
	total: number;
	tax: number;
}
