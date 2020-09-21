import Vapi from "vuex-rest-api";
import API from "./api";

export default new Vapi({
	baseURL: API.host,
	state: {
		customers: [],
		customer: {},
	},
})
	.get({
		action: "fetch",
		property: "customers",
		path: "/customers?per=1000000",
	})
	.put({
		action: "add",
		property: "customer",
		path: "/customers",
	})
	.get({
		action: "get",
		property: "customer",
		path: ({ id }: any) => `/customers/${id}`,
	})
	.put({
		action: "addAddress",
		path: ({ id }: any) => `/customers/${id}/addresses`,
	})
	.delete({
		action: "deleteAddress",
		path: ({ id, address }: any) => `/customers/${id}/addresses/${address}`,
	})
	.patch({
		action: "update",
		path: ({ id }: any) => `/customers/${id}`,
	})
	.delete({
		action: "delete",
		path: ({ id }: any) => `/customers/${id}`,
	})
	.getStore({
		namespaced: true,
	});
