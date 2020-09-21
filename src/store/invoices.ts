import Vapi from "vuex-rest-api";
import { Invoice, InvoiceOutput } from "@/types";

export default new Vapi({
	baseURL: "http://localhost:8080",
	state: {
		invoices: [] as Array<Invoice>,
		invoice: {} as InvoiceOutput,
	},
})
	.get({
		action: "fetch",
		property: "invoices",
		path: "/invoices?per=1000000",
	})
	.put({
		action: "add",
		property: "invoice",
		path: "/invoices",
	})
	.get({
		action: "get",
		property: "invoice",
		path: ({ id }: any) => `/invoices/${id}`,
	})
	.patch({
		action: "update",
		property: "invoice",
		path: ({ id }: any) => `/invoices/${id}`,
	})
	.delete({
		action: "delete",
		path: ({ id }: any) => `/invoices/${id}`,
	})
	.getStore({
		namespaced: true,
	});
