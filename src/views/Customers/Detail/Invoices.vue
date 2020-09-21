<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="green" icon="receipt" />Factures
			<v-spacer />
			<v-btn @click="display = true" text color="green">
				<v-icon left>mdi-plus</v-icon>Créer une facture
			</v-btn>
		</v-card-title>

		<v-data-table
			no-data-text="Aucune facture n'a été crée pour ce client"
			:items="customer.invoices"
			:headers="headers"
			@click:row="open"
		>
			<template #item.type="{ item }">
				{{
				item.type === "invoice" ? "Facture" : "Devis"
				}}
			</template>
			<template #item.updatedAt="{ item }">
				{{
				new Date(item.updatedAt).toLocaleDateString()
				}}
			</template>
			<template #item.status="{ item }">
				<StatusLabel :status="item.status" />
			</template>
		</v-data-table>

		<AddInvoice :display.sync="display" :customer="customer" />
	</v-card>
</template>

<script lang="ts">
import AddInvoice from "../Dialogs/AddInvoice.vue";
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Address, Customer, Invoice } from "@/types";

@Component({
	components: {
		AddInvoice,
	},
	computed: {
		...mapState("customers", ["customer"]),
	},
})
export default class Invoices extends Vue {
	display = false;

	customer!: Customer;

	headers = [
		{
			text: "Type",
			value: "type",
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

	open(row: Invoice) {
		this.$router.push(`/invoices/${row.id}`);
	}
}
</script>
