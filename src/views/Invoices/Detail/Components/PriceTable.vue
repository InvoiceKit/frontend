<template>
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
			<tr v-if="invoice._promotion && invoice._promotion != 0">
				<td>Remise commerciale</td>
				<td>- {{ invoice._promotion }} €</td>
			</tr>
			<tr v-if="invoice.deposit && invoice.deposit != 0">
				<td>Acompte</td>
				<td>- {{ invoice.deposit }} €</td>
			</tr>
			<tr>
				<td>Total T.T.C.</td>
				<td>{{ invoice.final }} €</td>
			</tr>
		</tbody>
	</v-simple-table>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "PriceTable",
	computed: {
		...mapState("invoices", ["invoice"]),
	},
};
</script>