import { Module } from "vuex";

const snackbar: Module<any, any> = {
    namespaced: true,

    state: {
        message: "",
        icon: "",
        color: "",
        display: false
    },

    mutations: {
        SET_MESSAGE(state, payload: any) {
            state.message = payload.message
            state.icon = payload.icon
            state.color = payload.color
            state.display = true
        },

        SET_DISPLAY(state) {
            state.display = !state.display
        }
    },

    actions: {
        push(context, payload: any) {
            context.commit('SET_MESSAGE', payload)
        },

        switch(context) {
            context.commit('SET_DISPLAY')
        }
    }
}

export default snackbar