<template>
	<div>
		<v-app-bar app>
			<v-toolbar-title>Factures</v-toolbar-title>

			<v-spacer />

			<v-text-field
				hide-details
				single-line
				solo-inverted
				label="Chercher une facture ou un devis"
				v-model="search"
			/>

			<v-spacer />

			<v-btn icon @click="addDialog = true" large>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-app-bar>

		<v-card>
			<v-data-table :search="search" :headers="headers" :items="invoiceList" @click:row="open">
				<template #item.name="{ item }">
					<span v-if="item.customer.firstName || item.customer.lastName">
						{{ item.customer.firstName }}
						<b>{{ item.customer.lastName }}</b>

						<span v-if="item.customer.company">&nbsp;({{item.customer.company}})</span>
					</span>
					<span v-else>{{item.customer.company}}</span>
				</template>

				<template #item.updatedAt="{ item }">{{ new Date(item.updatedAt).toLocaleString() }}</template>

				<template #item.status="{ item }">
					<StatusLabel :status="item.status" />
				</template>
			</v-data-table>
		</v-card>

		<AddInvoice :display.sync="addDialog" />
	</div>
</template>

<script lang="ts">
import AddInvoice from "./Dialogs/AddInvoice.vue";
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Invoice, Pagination } from "@/types";

@Component({
	components: {
		AddInvoice,
	},

	computed: {
		...mapState("invoices", ["invoices"]),
	},
})
export default class InvoiceList extends Vue {
	addDialog = false;
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
			value: "updatedAt",
		},
		{
			text: "Statut",
			value: "status",
		},
	];

	invoices!: Pagination<Invoice>;

	invoiceList: Array<Invoice> = [];

	async mounted() {
		try {
			await this.$store.dispatch("invoices/fetch");

			for (const invoice of this.invoices.items) {
				this.invoiceList.push({
					name: `${invoice.customer?.firstName} ${invoice.customer?.lastName} ${invoice.customer?.company}`,
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