import Vapi from "vuex-rest-api";
import API from "./api";

export default new Vapi({
    baseURL: API.host,
    state: {
        charts: {},
    },
})
    .get({
        action: "get",
        property: "charts",
        path: "/charts",
    })
    .getStore({
        namespaced: true,
    });
