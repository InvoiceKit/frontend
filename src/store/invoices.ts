import Vapi from 'vuex-rest-api'

export default new Vapi({
    baseURL: 'http://localhost:8080',
    state: {
        invoices: [],
        invoice: {}
    }
}).get({
    action: 'fetch',
    property: 'invoices',
    path: '/invoices?per=1000000'
}).put({
    action: 'add',
    property: 'invoice',
    path: '/invoices'
}).get({
    action: 'get',
    property: 'invoice',
    path: ({ id }: any) => `/invoices/${id}`
}).put({
    action: 'addField',
    path: ({ id }: any) => `/invoices/${id}/fields`
}).delete({
    action: 'deleteField',
    path: ({ id, field }: any) => `/invoices/${id}/fields/${field}`
}).patch({
    action: 'update',
    path: ({ id }: any) => `/invoices/${id}`
}).delete({
    action: 'delete',
    path: ({ id }: any) => `/invoices/${id}` 
}).getStore({
    namespaced: true
})