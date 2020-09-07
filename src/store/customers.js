import Vapi from 'vuex-rest-api'

export default new Vapi({
    baseURL: 'http://localhost:8080',
    state: {
        customers: [],
        customer: {}
    }
}).get({
    action: 'fetch',
    property: 'customers',
    path: '/customers?per=1000000'
}).put({
    action: 'add',
    property: 'customer',
    path: '/customers'
}).get({
    action: 'get',
    property: 'customer',
    path: ({ id }) => `/customers/${id}`
}).put({
    action: 'addAddress',
    path: ({ id }) => `/customers/${id}/addresses`
}).delete({
    action: 'deleteAddress',
    path: ({ id, address }) => `/customers/${id}/addresses/${address}`
}).getStore({
    namespaced: true
})