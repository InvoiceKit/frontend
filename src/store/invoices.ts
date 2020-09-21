import Vapi from "vuex-rest-api";
import API from './api'

export default new Vapi({
	baseURL: API.host,
	state: {
		invoices: [],
		invoice: {},
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
