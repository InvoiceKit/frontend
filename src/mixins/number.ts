import {Component, Vue} from "vue-property-decorator";

@Component
export default class NumberMixin extends Vue {
    /**
     * Round a number 2 decimals
     *
     * @param num
     * @returns rounded number
     */
    round(num: number) {
        return Math.round(num * 100) / 100
    }
}