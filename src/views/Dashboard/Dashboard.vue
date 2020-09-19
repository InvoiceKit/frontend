<template>
	<v-row>
		<v-col cols="12" lg="4" md="4" sm="12">
			<v-card class="mt-4">
				<v-card-title>
					<CardIcon color="blue" icon="receipt" />Factures
				</v-card-title>
				<v-card-text>
					<ApexCharts type="donut" :options="options" :series="series" />
				</v-card-text>
			</v-card>
		</v-col>
		<v-col cols="12" lg="4" md="4" sm="12">
			<v-card class="mt-4">
				<v-card-title>
					<CardIcon color="teal accent-3" icon="check-bold" />Chiffre d'affaire
				</v-card-title>
				<v-card-text align="center" class="white--text">
					<h1 class="display-1">{{ charts.prices.paid.value }} €</h1>
					<span class="overline">+ {{ charts.prices.paid.tax }} € de T.V.A.</span>
				</v-card-text>
			</v-card>

			<br />

			<v-card class="mt-4">
				<v-card-title>
					<CardIcon color="amber accent-4" icon="clock" />En attente de paiement
				</v-card-title>
				<v-card-text align="center" class="white--text">
					<h1 class="display-1">{{ charts.prices.waiting.value }} €</h1>
					<span class="overline">+ {{ charts.prices.waiting.tax }} € de T.V.A.</span>
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
		<v-col cols="12" lg="4" md="4" sm="12">
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

	async mounted() {
		try {
			await this.$store.dispatch("charts/get");

			this.series = [
				this.charts.invoices.paid,
				this.charts.invoices.waiting,
				this.charts.invoices.canceled,
			];
		} catch (ex) {
			console.log(ex);
		}
	},
};
</script>