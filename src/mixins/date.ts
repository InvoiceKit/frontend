import {Component, Vue} from 'vue-property-decorator'

@Component
export default class DateMixin extends Vue {
    /**
     * Pad a number
     *
     * @param s
     */
    pad(s: number) {
        return s < 10 ? "0" + s : s;
    }

    /**
     * Get formatted date as DD/MM/YYYY
     *
     * @param date
     * @returns {string}
     */
    getString(date: Date) {
        return [
            this.pad(date.getDate()),
            this.pad(date.getMonth() + 1),
            date.getFullYear(),
        ].join("/");
    }

    /**
     * Get formatted date as MM/YYYY
     *
     * @param date
     * @returns {string}
     */
    getMMYYYY(date: Date) {
        return [this.pad(date.getMonth() + 1), date.getFullYear()].join("/");
    }
}