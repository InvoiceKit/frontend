<template>
	<v-card>
		<v-card-title>
			Adresses
			<v-spacer />
			<v-btn @click="display = true" text color="blue">
				<v-icon left>mdi-plus</v-icon>Ajouter une adresse
			</v-btn>
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

		<AddAddress :display.sync="display" />
	</v-card>
</template>

<script lang="ts">
import AddAddress from "../Dialogs/AddAddress.vue";
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Address, Customer } from "@/types";

@Component({
	components: {
		AddAddress,
	},
	computed: {
		...mapState("customers", ["customer"]),
	},
})
export default class Addresses extends Vue {
	display = false;

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
