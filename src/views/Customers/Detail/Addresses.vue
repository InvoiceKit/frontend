<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="amber" icon="map" />Adresses
		</v-card-title>

		<v-data-table
			no-data-text="Aucune adresse n'à été trouvée pour ce client"
			:items="customer.addresses"
			:headers="headers"
		>
			<template v-slot:item.actions="{ item }">
				<v-btn icon @click="deleteAddress(item)">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</template>
		</v-data-table>
	</v-card>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Address, Customer } from "@/types";

@Component({
	computed: {
		...mapState("customers", ["customer"]),
	},
})
export default class Addresses extends Vue {
	headers = [
		{
			text: "Adresse",
			value: "line",
		},
		{
			text: "Code postal",
			value: "zip",
		},
		{
			text: "Ville",
			value: "city",
		},
		{
			text: "Actions",
			value: "actions",
		},
	];
	customer!: Customer;

	async deleteAddress(item: Address) {
		try {
			await this.$store.dispatch("customers/deleteAddress", {
				params: {
					id: this.customer.id,
					address: item.id,
				},
			});

			await this.$store.dispatch("customers/get", {
				params: {
					id: this.customer.id,
				},
			});
		} catch {
			alert(
				"Une erreur est survenue pendant la suppression de l'adresse"
			);
		}
	}
}
</script>