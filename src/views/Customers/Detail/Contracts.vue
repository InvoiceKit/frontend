<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="red" icon="text-box-outline" />Contrats
			<v-spacer />
			<v-btn text color="red" @click="display = true">
				<v-icon left>mdi-plus</v-icon>Ajouter un contrat
			</v-btn>
		</v-card-title>

		<v-data-table
			no-data-text="Aucun contrats n'a été crée pour ce client"
			:items="customer.contracts"
			:headers="headers"
			@click:row="open"
		>
			<template #item.updatedAt="{ item }">
				{{
				new Date(item.updatedAt).toLocaleDateString()
				}}
			</template>
			<template #item.status="{ item }">
				<StatusLabel :status="item.status" />
			</template>
		</v-data-table>

		<AddContract :display.sync="display" :customer="customer" />
	</v-card>
</template>

<script lang="ts">
import AddContract from "../Dialogs/AddContract.vue";
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Customer } from "@/types";

@Component({
	components: {
		AddContract,
	},

	computed: {
		...mapState("customers", ["customer"]),
	},
})
export default class Contracts extends Vue {
	display = false;

	customer!: Customer;

	headers = [
		{
			text: "Numéro de série",
			value: "serial",
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

	open(row: any) {
		this.$router.push(`/contracts/${row.id}`);
	}
}
</script>
