<template>
	<v-container fluid>
		<v-row class="mb-4">
			<v-col>
				<p class="header">Factures</p>
			</v-col>

			<v-spacer/>

			<v-col align="right" cols="4">
				<v-text-field
					v-model="search"
					hide-details
					label="Chercher une facture"
					single-line
					solo-inverted
				/>
			</v-col>
		</v-row>

		<v-card>
			<v-data-table
				:headers="headers"
				:items="invoiceList"
				:search="search"
				@click:row="open"
			>
				<template #item.name="{ item }">
					<span
						v-if="item.customer.firstName || item.customer.lastName"
					>
						{{ item.customer.firstName }}
						<b>{{ item.customer.lastName }}</b>

						<span v-if="item.customer.company"
						>&nbsp;({{ item.customer.company }})</span
						>
					</span>
					<span v-else>{{ item.customer.company }}</span>
				</template>

				<template #item.status="{ item }">
					<StatusLabel :status="item.status"/>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import {mapState} from "vuex";
import {Component, Mixins} from "vue-property-decorator";
import {InvoiceOutput, Pagination} from "@/types";
import DateMixin from "@/mixins/date"

@Component({
	computed: {
		...mapState("invoices", ["invoices"]),
	}
})
export default class InvoiceList extends Mixins(DateMixin) {
	search = "";
	headers = [
		{
			text: "Nom ou entreprise",
			value: "name",
		},
		{
			text: "Numéro",
			value: "number",
		},
		{
			text: "Dernière modification",
			value: "date",
		},
		{
			text: "Statut",
			value: "status",
		},
	];

	invoices!: Pagination<InvoiceOutput>;

	invoiceList: Array<any> = [];

	async mounted() {
		try {
			await this.$store.dispatch("invoices/fetch");

			for (const invoice of this.invoices.items) {
				let fn = invoice.customer?.firstName || "";
				let ln = invoice.customer?.lastName || "";
				let company = invoice.customer?.company || "";

				this.invoiceList.push({
					name: `${fn} ${ln} ${company}`,
					date: this.getString(new Date(invoice.updatedAt)),
					...invoice,
				});
			}
		} catch (ex) {
			console.log(ex);
		}
	}

	open(row: any) {
		this.$router.push(`/invoices/${row.id}`);
	}
}
</script>
