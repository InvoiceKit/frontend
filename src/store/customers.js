import Vapi from 'vuex-rest-api'

export default new Vapi({
    baseURL: 'http://localhost:8080',
    state: {
        customers: []
    }
}).get({
    action: 'get',
    property: 'customers',
    path: '/customers?per=1000000'
}).put({
    action: 'add',
    property: 'customer',
    path: '/customers'
}).getStore({
    namespaced: true
})