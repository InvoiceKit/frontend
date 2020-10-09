import Vapi from "vuex-rest-api";
import API from "./api";

function setToken(state: any, payload: any) {
    localStorage.setItem("token", payload.data.token)
}

export default new Vapi({
    baseURL: API.host,
    state: {
        token: localStorage.getItem("token"),
        isLogged: localStorage.getItem("token") !== null,
        team: {},
        image: null,
    },
})
    .put({
        action: "register",
        path: "/teams",
        onSuccess: setToken,
    })
    .post({
        action: "login",
        path: "/teams/login",
        onSuccess: setToken,
    })
    .get({
        action: "get",
        property: "team",
        path: "/teams",
    })
    .patch({
        action: "save",
        property: "team",
        path: ({id}: any) => `/teams/${id}`,
    })
    .post({
        action: "setImage",
        property: "team",
        path: ({id}: any) => `/teams/${id}/image`,
    })
    .getStore({
        namespaced: true,
    });
