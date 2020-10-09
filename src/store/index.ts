import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import customers from "./customers";
import invoices from "./invoices";
import charts from "./charts";
import contracts from "./contracts";
import messages from "./messages";
import snackbar from "@/store/snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: <any>{
        charts,
        auth,
        customers,
        invoices,
        contracts,
        messages,
        snackbar
    },
});
