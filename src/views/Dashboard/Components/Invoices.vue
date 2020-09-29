<template>
	<v-card v-if="charts.invoices">
		<v-card-title class="overline grey--text"> Factures </v-card-title>

		<v-card-text>
			<v-row>
				<v-col>
					<span class="value"> {{ charts.invoices.total }} </span>
					<br />
					<span class="overline desc">factures</span>

					<br />
					<br />

					<span class="value"> {{ charts.invoices.canceled }} </span>
					<br />
					<span class="overline desc">factures annulées</span>
				</v-col>
				<v-col>
					<span class="value"> {{ charts.invoices.paid }} </span>
					<br />
					<span class="overline desc">factures payées</span>

					<br />
					<br />

					<span class="value"> {{ charts.invoices.waiting }} </span>
					<br />
					<span class="overline desc">en attente de paiement</span>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "Invoices",
	computed: {
		...mapState("charts", ["charts"]),
	},
};
</script>

<style scoped>
.value {
	font-size: 18pt;
	font-weight: 600;
}

.desc {
	border-top: 2px solid #f94144;
	padding-top: 5px;
	font-size: 9pt !important;
}
</style>
