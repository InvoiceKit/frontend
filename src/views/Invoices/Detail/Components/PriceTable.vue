<template>
	<v-card>
		<v-card-title class="overline grey--text"> Prix</v-card-title>

		<v-simple-table>
			<tbody>
			<tr>
				<td>Total H.T.</td>
				<td>{{ invoice.no_vat }} €</td>
			</tr>
			<tr>
				<td>T.V.A.</td>
				<td>{{ invoice.vat }} €</td>
			</tr>
			<tr v-if="invoice._promotion && invoice._promotion !== 0">
				<td>Remise commerciale</td>
				<td>- {{ invoice._promotion }} €</td>
			</tr>
			<tr v-if="invoice.deposit && invoice.deposit !== 0">
				<td>Acompte</td>
				<td>- {{ invoice.deposit }} €</td>
			</tr>
			<tr>
				<td>Total T.T.C.</td>
				<td>{{ invoice.final }} €</td>
			</tr>
			</tbody>
		</v-simple-table>
	</v-card>
</template>

<script lang="ts">
import {mapState} from "vuex";
import {Component, Vue} from "vue-property-decorator";
import {InvoiceOutput} from "@/types";

@Component({
	computed: {
		...mapState("invoices", ["invoice"]),
	}
})
export default class PriceTable extends Vue {
	invoice!: InvoiceOutput
}
</script>
