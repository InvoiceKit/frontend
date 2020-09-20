<template>
	<v-row>
		<v-col cols="12" lg="4" md="4" sm="12">
			<v-card class="mt-4">
				<v-card-title>
					<CardIcon color="blue" icon="receipt" />Factures
				</v-card-title>
				<v-card-text>
					<ApexCharts type="donut" height="350" :options="options" :series="series" />
				</v-card-text>
			</v-card>

			<br />

			<v-card class="mt-4">
				<v-card-title>
					<CardIcon color="teal accent-3" icon="check-bold" />Chiffre d'affaire
				</v-card-title>
				<v-card-text align="center" class="white--text">
					<h1 class="display-1">{{ charts.prices.paid.value + charts.prices.waiting.value }} €</h1>
					<span class="overline">+ {{ charts.prices.paid.tax + charts.prices.waiting.tax }} € de T.V.A.</span>
				</v-card-text>
			</v-card>

			<br />

			<v-card class="mt-4">
				<v-card-title>
					<CardIcon color="red" icon="close" />Factures annulées
				</v-card-title>
				<v-card-text align="center" class="white--text">
					<h1 class="display-1">{{ charts.prices.canceled.value }} €</h1>
					<span class="overline">+ {{ charts.prices.canceled.tax }} € de T.V.A.</span>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col cols="12" lg="8" md="8" sm="12">
			<v-card class="mt-4">
				<v-card-title>
					<CardIcon color="light-blue darken-4" icon="chart-line-variant" />Nombre de factures et de contrats
				</v-card-title>

				<ApexCharts type="line" height="350" :options="days.options" :series="days.series" />
			</v-card>

			<br />

			<v-row>
				<v-col cols="12" lg="6" md="6" sm="12">
					<v-card class="mt-4">
						<v-card-title>
							<CardIcon color="amber accent-4" icon="clock" />Factures en attente
						</v-card-title>
						<v-card-text align="center" class="white--text">
							<h1 class="display-1">{{ charts.prices.waiting.value }} €</h1>
							<span class="overline">+ {{ charts.prices.waiting.tax }} € de T.V.A.</span>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12" lg="6" md="6" sm="12">
					<v-card class="mt-4">
						<v-card-title>
							<CardIcon color="indigo" icon="account-group" />Clients
						</v-card-title>
						<v-card-text align="center" class="white--text">
							<h1 class="display-1">{{ charts.customers }}</h1>
							<span class="overline">Clients enregistrés</span>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { mapState } from "vuex";
import ApexCharts from "vue-apexcharts";

export default {
	name: "Dashboard",

	components: {
		ApexCharts,
	},

	data: () => ({
		series: [],
		days: {
			options: {
				stroke: {
					curve: "smooth",
				},
				theme: {
					mode: "dark",
					palette: "palette3",
				},
				xaxis: {
					categories: [],
				},
			},
			series: [
				{
					name: "Nombre de factures",
					data: [],
				},
				{
					name: "Nombre de contrats",
					data: [],
				},
			],
		},
		options: {
			labels: ["Payé", "En attente", "Annulé"],
			legend: {
				labels: {
					colors: "#fff",
				},
				show: true,
			},
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							total: {
								show: true,
								color: "#fff",
							},
							value: {
								color: "#fff",
								fontSize: "32",
							},
						},
					},
				},
			},
		},
	}),

	computed: {
		...mapState("charts", ["charts"]),
	},

	watch: {
		charts: {
			deep: true,
			immediate: true,
			handler: "onLoad",
		},
	},

	async mounted() {
		try {
			await this.$store.dispatch("charts/get");
		} catch (ex) {
			console.log(ex);
		}
	},

	methods: {
		dateConverter(date) {
			var dateParts = date.split("/");
			var dateObject = new Date(
				+dateParts[2],
				dateParts[1] - 1,
				+dateParts[0]
			);
			return dateObject;
		},

		onLoad(newValue) {
			// Add series
			this.series = [
				newValue.invoices.paid,
				newValue.invoices.waiting,
				newValue.invoices.canceled,
			];

			// Sort dates
			var invoices = {};
			Object.keys(newValue.daily)
				.sort((a, b) => {
					return this.dateConverter(a) - this.dateConverter(b);
				})
				.forEach((key) => {
					invoices[key] = newValue.daily[key];
				});

			var contracts = {};
			Object.keys(newValue.contracts)
				.sort((a, b) => {
					return this.dateConverter(a) - this.dateConverter(b);
				})
				.forEach((key) => {
					contracts[key] = newValue.contracts[key];
				});

			// Delete series
			this.days.options.xaxis.categories = [];
			this.days.series[0].data = [];
			this.days.series[1].data = [];

			// Set dates
			for (let [key, value] of Object.entries(invoices)) {
				this.days.options.xaxis.categories.push(key);
				this.days.series[0].data.push(value);
			}

			for (let [key, value] of Object.entries(contracts)) {
				this.days.series[1].data.push(value);
			}
		},
	},
};
</script>