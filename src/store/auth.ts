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
    path: '/teams/register'
}).post({
    action: 'login',
    property: 'team',
    path: '/teams/login',
    headers: ({ username, password }: any) => ({
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    }),
    onSuccess: (state: any, payload: any) => {
        // Store the token
        localStorage.setItem('token', payload.data.token.value)
    }
}).get({
    action: 'get',
    property: 'team',
    path: '/teams/profile'
}).patch({
    action: 'save',
    property: 'team',
    path: '/teams/profile'
}).getStore({
    namespaced: true
})