<template>
	<v-card>
		<v-card-title class="overline grey--text"> Prix</v-card-title>

		<v-simple-table>
			<tbody>
			<tr>
				<td>Total H.T.</td>
				<td>{{ round(invoice.no_vat) }} €</td>
			</tr>
			<tr>
				<td>T.V.A.</td>
				<td>{{ round(invoice.vat) }} €</td>
			</tr>
			<tr v-if="invoice._promotion && invoice._promotion !== 0">
				<td>Remise commerciale</td>
				<td>- {{ round(invoice._promotion) }} €</td>
			</tr>
			<tr v-if="invoice.deposit && invoice.deposit !== 0">
				<td>Acompte</td>
				<td>- {{ round(invoice.deposit) }} €</td>
			</tr>
			<tr>
				<td>Total T.T.C.</td>
				<td>{{ round(invoice.final) }} €</td>
			</tr>
			</tbody>
		</v-simple-table>
	</v-card>
</template>

<script lang="ts">
import {mapState} from "vuex";
import {Component, Mixins} from "vue-property-decorator";
import {InvoiceOutput} from "@/types";
import NumberMixin from "@/mixins/number";

@Component({
	computed: {
		...mapState("invoices", ["invoice"]),
	}
})
export default class PriceTable extends Mixins(NumberMixin) {
	invoice!: InvoiceOutput
}
</script>
