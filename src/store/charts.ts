import Vapi from 'vuex-rest-api'

export default new Vapi({
    baseURL: 'http://localhost:8080',
    state: {
        charts: {}
    }
}).get({
    action: 'get',
    property: 'charts',
    path: '/charts'
}).getStore({
    namespaced: true
})