import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import customers from "./customers";
import invoices from "./invoices";
import charts from "./charts";
import contracts from "./contracts";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		'host': 'http://localhost:8080'
	},
	modules: <any>{
		charts,
		auth,
		customers,
		invoices,
		contracts,
	},
});
