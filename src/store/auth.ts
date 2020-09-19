import Vapi from 'vuex-rest-api'

export default new Vapi({
    baseURL: 'http://localhost:8080',
    state: {
        token: localStorage.getItem('token'),
        isLogged: localStorage.getItem('token') !== null,
        team: {},
        image: null
    }
}).put({
    action: 'register',
    path: '/teams/register',
    onSuccess: (state: any, payload: any) => {
        // Store token
        localStorage.setItem('token', payload.data.token)
    }
}).post({
    action: 'login',
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
    path: ({ id }: any) => `/teams/${id}`
}).post({
    action: 'setImage',
    property: 'team',
    path: ({ id }: any) => `/teams/${id}/image`
}).getStore({
    namespaced: true
})