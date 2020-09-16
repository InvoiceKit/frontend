<template>
	<v-simple-table>
		<tbody>
			<tr>
				<td>Total H.T.</td>
				<td>{{ syncedInvoice.no_vat }} €</td>
			</tr>
			<tr>
				<td>T.V.A.</td>
				<td>{{ syncedInvoice.vat }} €</td>
			</tr>
			<tr v-if="syncedInvoice._promotion && syncedInvoice._promotion != 0">
				<td>Remise commerciale</td>
				<td>- {{ invoice._promotion }} €</td>
			</tr>
			<tr v-if="syncedInvoice.deposit && syncedInvoice.deposit != 0">
				<td>Acompte</td>
				<td>- {{ syncedInvoice.deposit }} €</td>
			</tr>
			<tr>
				<td>Total T.T.C.</td>
				<td>{{ syncedInvoice.final }} €</td>
			</tr>
		</tbody>
	</v-simple-table>
</template>

<script lang="ts">
import { InvoiceOutput } from '@/types'
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class PriceTable extends Vue {
    @PropSync('invoice', { type: Object }) syncedInvoice!: InvoiceOutput
}
</script>