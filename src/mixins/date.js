/**
 * @mixing Date formatting
 */
export default {
	methods: {
		pad(s) {
			return s < 10 ? "0" + s : s;
		},

		getString(d) {
			return [
				this.pad(d.getDate()),
				this.pad(d.getMonth() + 1),
				d.getFullYear(),
			].join("/");
		},

		getMMYYYY(d) {
			return [this.pad(d.getMonth() + 1), d.getFullYear()].join("/");
		},
	},
};
