<template>
	<v-card v-if="charts.prices">
		<v-card-title class="overline grey--text">
			Chiffre d'affaire
		</v-card-title>

		<v-card-text>
			<v-row>
				<v-col>
					<span class="value"> {{ total }} € </span>
					<br/>
					<span class="overline desc">Validé et en attente</span>

					<br/>
					<br/>

					<span class="value">
						{{ charts.prices.canceled.value }} €
					</span>
					<br/>
					<span class="overline desc">Factures annulées</span>
				</v-col>
				<v-col>
					<span class="value">
						{{ charts.prices.waiting.value }} €
					</span>
					<br/>
					<span class="overline desc">En attente de paiement</span>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import {mapState} from "vuex";
import {Component, Vue} from "vue-property-decorator";
import {Charts} from "@/types";

@Component({
	computed: {
		...mapState("charts", [
			"charts"
		])
	}
})
export default class InvoicesChart extends Vue {
	charts!: Charts

	get total() {
		return (
			this.charts.prices.paid.value + this.charts.prices.waiting.value
		);
	}
}
</script>

<style scoped>
.value {
	font-size: 18pt;
	font-weight: 600;
}

.desc {
	display: inline-block;
	margin-top: 5px;
	border-top: 2px solid #2ec4b6;
	font-size: 9pt !important;
}
</style>
