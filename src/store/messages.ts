import Vapi from "vuex-rest-api";
import API from "./api";

export default new Vapi({
    baseURL: API.host,
    state: {
        messages: [],
        message: {},
    },
})
    .get({
        action: "fetch",
        property: "messages",
        path: "/messages?per=1000000",
    })
    .put({
        action: "add",
        property: "message",
        path: "/messages",
    })
    .get({
        action: "get",
        property: "message",
        path: ({id}: any) => `/messages/${id}`,
    })
    .patch({
        action: "update",
        property: "message",
        path: ({id}: any) => `/messages/${id}`,
    })
    .delete({
        action: "delete",
        path: ({id}: any) => `/messages/${id}`,
    })
    .getStore({
        namespaced: true,
    });
