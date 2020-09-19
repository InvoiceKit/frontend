<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="green" icon="receipt" />Factures
		</v-card-title>

		<v-data-table
			no-data-text="Aucune facture n'a été crée pour ce client"
			:items="customer.invoices"
			:headers="headers"
			@click:row="open"
		>
			<template #item.type="{ item }">{{ item.type === "invoice" ? "Facture" : "Devis" }}</template>
			<template #item.updatedAt="{ item }">{{ new Date(item.updatedAt).toLocaleDateString() }}</template>
			<template #item.status="{ item }">
				<StatusLabel :status="item.status" />
			</template>
		</v-data-table>
	</v-card>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Address, Customer, Invoice } from "@/types";

@Component({
	computed: {
		...mapState("customers", ["customer"]),
	},
})
export default class Invoices extends Vue {
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