<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<p class="header">Fiche client</p>
			</v-col>

			<v-spacer />

			<v-col align="right">
				<v-btn to="/customers" exact icon large>
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-btn @click="deleteCustomer" icon large color="red darken-1">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" md="6" sm="12">
				<Profile />
				<br />
				<Invoices />
			</v-col>
			<v-col cols="12" md="6" sm="12">
				<Addresses />
				<br />
				<Contracts />
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import Profile from "./Profile.vue";
import Invoices from "./Invoices.vue";
import Contracts from "./Contracts.vue";
import Addresses from "./Addresses.vue";
import AddAddress from "../Dialogs/AddAddress.vue";
import AddCustomer from "../Dialogs/AddCustomer.vue";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
	components: {
		Profile,
		Addresses,
		Invoices,
		Contracts,
		AddAddress,
		AddCustomer,
	},

	computed: {
		...mapState("customers", ["customer"]),
	},

	async created() {
		try {
			await this.$store.dispatch("customers/get", {
				params: {
					id: this.$route.params.id,
				},
			});
		} catch {
			this.$router.push("/customers");
		}
	},
})
export default class CustomerDetail extends Vue {
	// Address dialog
	address = false;

	// Edition dialog
	edit = false;

	/**
	 * Delete a customer
	 */
	async deleteCustomer() {
		if (
			!confirm(
				"Êtes-vous sur de supprimer ce client? Les factures associées seront supprimées aussi."
			)
		) {
			return;
		}

		try {
			await this.$store.dispatch("customers/delete", {
				params: {
					id: this.$route.params.id,
				},
			});

			this.$router.push("/customers");
		} catch {
			alert("Impossible de supprimer le client.");
		}
	}
}
</script>
