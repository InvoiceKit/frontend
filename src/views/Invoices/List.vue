<template>
	<div>
		<v-app-bar app>
			<v-toolbar-title>
				Factures
			</v-toolbar-title>

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
			<v-data-table
				:search="search"
				:headers="headers"
				:items="invoiceList"
				@click:row="open"
			>
			
			<template v-slot:item.name="{ item }">
				{{ item.customer.firstName }} <b>{{ item.customer.lastName }}</b>
			</template>

			<template v-slot:item.updatedAt="{ item }">
				{{ new Date(item.updatedAt).toLocaleString() }}
			</template>

			<template v-slot:item.status="{ item }">
				<StatusLabel :status="item.status" />
			</template>

			</v-data-table>
		</v-card>

		<AddInvoice :display.sync="addDialog" />
	</div>
</template>

<script lang="ts">
import AddInvoice from './Dialogs/AddInvoice.vue'
import { mapState } from "vuex";
import { Component, Vue, Watch } from "vue-property-decorator";
import invoices from '@/store/invoices';
import { Invoice } from '@/types';

@Component({
    components: {
        AddInvoice
    },
	computed: {
		...mapState("invoices", ["invoices"]),
	},
	async mounted() {
		this.$store.dispatch("invoices/fetch");
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
			value: "number"
        },
		{
			text: "Dernière modification",
			value: "updatedAt",
		},
		{
			text: "Statut",
			value: "status",
		}
	];

	invoiceList: Array<Invoice> = []

	@Watch('invoices', { deep: true })
	onChange(newValue: any) {
		for(const invoice of newValue.items) {
			this.invoiceList.push({
				name: `${invoice.customer.firstName} ${invoice.customer.lastName}`,
				...invoice
			})
		}
	}

	open(row: any) {
		this.$router.push(`/invoices/${row.id}`);
	}
}
</script>