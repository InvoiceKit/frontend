<template>
	<v-card>
		<v-card-title>
			Adresses
			<v-spacer/>
			<v-btn color="blue" text @click="display = true">
				<v-icon left>mdi-plus</v-icon>
				Ajouter une adresse
			</v-btn>
		</v-card-title>

		<v-data-table
			:headers="headers"
			:items="customer.addresses"
			no-data-text="Aucune adresse n'à été trouvée pour ce client"
		>
			<template v-slot:item.actions="{ item }">
				<v-btn icon @click="deleteAddress(item)">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</template>
		</v-data-table>

		<AddAddress :display.sync="display"/>
	</v-card>
</template>

<script lang="ts">
import AddAddress from "../Dialogs/AddAddress.vue";
import {mapState} from "vuex";
import {Component, Vue} from "vue-property-decorator";
import {Address, Customer} from "@/types";

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
			await this.$store.dispatch("snackbar/push", {
				message: "Impossible de supprimer cette adresse",
				icon: "alert",
				color: "error"
			})
		}
	}
}
</script>
