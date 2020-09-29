<template>
	<v-card v-if="charts.prices">
		<v-card-title class="overline grey--text">
			Chiffre d'affaire
		</v-card-title>

		<v-card-text>
			<v-row>
				<v-col>
					<span class="value"> {{ total }} € </span>
					<br />
					<span class="overline desc">Validé et en attente</span>

					<br />
					<br />

					<span class="value">
						{{ charts.prices.canceled.value }} €
					</span>
					<br />
					<span class="overline desc">Factures annulées</span>
				</v-col>
				<v-col>
					<span class="value">
						{{ charts.prices.waiting.value }} €
					</span>
					<br />
					<span class="overline desc">En attente de paiement</span>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "Revenue",
	computed: {
		...mapState("charts", ["charts"]),

		total() {
			return (
				this.charts.prices.paid.value + this.charts.prices.waiting.value
			);
		},
	},
};
</script>

<style scoped>
.value {
	font-size: 18pt;
	font-weight: 600;
}

.desc {
	border-top: 2px solid #2ec4b6;
	padding-top: 5px;
	font-size: 9pt !important;
}
</style>
