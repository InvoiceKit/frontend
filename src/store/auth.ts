import Vapi from 'vuex-rest-api'

export default new Vapi({
    baseURL: 'http://localhost:8080',
    state: {
        token: localStorage.getItem('token'),
        isLogged: localStorage.getItem('token') !== null,
        team: {}
    }
}).put({
    action: 'register',
    property: 'team',
    path: '/teams/register',
    onSuccess: (state: any, payload: any) => {
        // Store token
        localStorage.setItem('token', payload.data.token)
    }
}).post({
    action: 'login',
    property: 'team',
    path: '/teams/login',
    onSuccess: (state: any, payload: any) => {
        // Store the token
        localStorage.setItem('token', payload.data.token)
    }
}).get({
    action: 'get',
    property: 'team',
    path: '/teams'
}).patch({
    action: 'save',
    property: 'team',
    path: '/teams'
}).getStore({
    namespaced: true
})