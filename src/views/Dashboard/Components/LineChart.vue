<template>
	<v-card>
		<v-card-title>Factures et contrats</v-card-title>

		<v-card-text>
			<Chart
				v-if="loaded"
				:data="data"
				:options="options"
				:height="200"
			/>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapState } from "vuex";
import Chart from "./Chart";

export default {
	components: {
		Chart,
	},

	computed: { ...mapState("charts", ["charts"]) },

	data: () => ({
		loaded: false,
		options: {
			responsive: true,
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							precision: 0,
							min: 0,
							max: 10,
						},
					},
				],
			},
		},
		data: {
			labels: [],
			datasets: [
				{
					label: "Nombre de facture",
					data: [],
					backgroundColor: "#52b788",
				},
				{
					label: "Nombre de contrats",
					data: [],
					backgroundColor: "#f8961e",
				},
			],
		},
	}),

	watch: {
		charts() {
			this.data.datasets[0].data = this.loadInChart(this.charts.daily);
			this.data.datasets[1].data = this.loadInChart(
				this.charts.contracts
			);

			this.loaded = true;
		},
	},

	methods: {
		getDate(date) {
			let parts = date.split("/");

			return new Date(parts[2], parts[1], parts[0]);
		},

		loadInChart(object) {
			// Prepare response
			let ret = [];

			this.data.labels = [];

			// Sort
			Object.keys(object)
				.sort((a, b) => {
					return (
						this.getDate(a).getTime() - this.getDate(b).getTime()
					);
				})
				.forEach((key) => {
					this.data.labels.push(key);

					ret.push(object[key]);
				});

			return ret;
		},
	},
};
</script>
