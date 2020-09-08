import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import customers from './customers'
import invoices from './invoices'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: <any>{
        auth,
        customers,
        invoices
    }
})