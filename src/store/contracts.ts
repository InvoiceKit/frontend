import Vapi from "vuex-rest-api";

export default new Vapi({
	baseURL: "http://localhost:8080",
	state: {
		contracts: [],
		contract: {},
	},
})
	.get({
		action: "fetch",
		property: "contracts",
		path: "/contracts?per=1000000",
	})
	.put({
		action: "add",
		property: "contract",
		path: "/contracts",
	})
	.get({
		action: "get",
		property: "contract",
		path: ({ id }: any) => `/contracts/${id}`,
	})
	.patch({
		action: "update",
		property: "contract",
		path: ({ id }: any) => `/contracts/${id}`,
	})
	.delete({
		action: "delete",
		path: ({ id }: any) => `/contracts/${id}`,
	})
	.getStore({
		namespaced: true,
	});
