<template>
	<v-card>
		<v-card-title class="overline grey--text"> Détails</v-card-title>

		<v-simple-table>
			<tbody>
			<tr>
				<td>Client</td>
				<td>
						<span v-if="invoice.customer.lastName">
							{{ invoice.customer.firstName }}
							{{ invoice.customer.lastName }}

							<span v-if="invoice.customer.company">
								({{ invoice.customer.company }})
							</span>
						</span>

					<span v-else>
							{{ invoice.customer.company }}
						</span>
				</td>
			</tr>
			<tr style="height: 75px">
				<td>Adresse</td>
				<td>
					{{ invoice.address.line }},
					{{ invoice.address.zip }}
					{{ invoice.address.city }}
				</td>
			</tr>

			<tr>
				<td>Statut</td>
				<td>
					<StatusLabel :status="invoice.status"/>
				</td>
			</tr>
			</tbody>
		</v-simple-table>
	</v-card>
</template>

<script lang="ts">
import {mapState} from "vuex";
import {Component, Vue} from "vue-property-decorator";
import {Invoice} from "@/types";

@Component({
	computed: {
		...mapState("invoices", ["invoice"]),
	}
})
export default class PriceTable extends Vue {
	invoice!: Invoice
}
</script>