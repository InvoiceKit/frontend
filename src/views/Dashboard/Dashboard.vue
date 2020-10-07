<template>
	<v-container fluid>
		<v-row>
			<v-col cols="10">
				<p class="header">
					Bienvenue sur votre tableau de bord
					<br/>
					<span class="overline">Résumé de l'activité</span>
				</p>
			</v-col>

			<v-col class="text-right" cols="2">
				<v-btn color="orange darken-1" icon large to="/settings">
					<v-icon>mdi-cog</v-icon>
				</v-btn>

				<v-btn color="red" icon large @click="logout">
					<v-icon>mdi-logout-variant</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" lg="8" md="8" sm="12">
				<LineChart/>
			</v-col>

			<v-col cols="12" lg="4" md="4" sm="12">
				<Revenue/>

				<br/>

				<Invoices/>

				<br/>

				<Other/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import LineChart from "./Components/LineChart.vue";
import Revenue from "./Components/Revenue.vue";
import Invoices from "./Components/Invoices.vue";
import Other from "./Components/Other.vue";

export default {
	components: {
		LineChart,
		Revenue,
		Invoices,
		Other,
	},

	async mounted() {
		try {
			await this.$store.dispatch("charts/get");
		} catch (ex) {
			console.log(ex);
		}
	},

	methods: {
		logout() {
			localStorage.removeItem("token");

			window.location.reload();
		},
	},
};
</script>
