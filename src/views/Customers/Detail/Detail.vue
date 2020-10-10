<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<p class="header">Fiche client</p>
			</v-col>

			<v-spacer/>

			<v-col class="text-right">
				<v-btn exact icon large to="/customers">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-btn color="red darken-1" icon large @click="deleteDialog = true">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" md="6" sm="12">
				<Profile/>
				<br/>
				<Invoices/>
			</v-col>
			<v-col cols="12" md="6" sm="12">
				<Addresses/>
				<br/>
				<Contracts/>
			</v-col>
		</v-row>

		<Dialog
			:show.sync="deleteDialog"
			title="Confirmation"
			text="Êtes-vous sur de vouloir supprimer ce client ?"
			button="Supprimer"
			:destructive="true"
			:method="deleteCustomer"
		/>
	</v-container>
</template>

<script lang="ts">
import Profile from "./Profile.vue";
import Invoices from "./Invoices.vue";
import Contracts from "./Contracts.vue";
import Addresses from "./Addresses.vue";
import AddAddress from "../Dialogs/AddAddress.vue";
import AddCustomer from "../Dialogs/AddCustomer.vue";
import {Component, Vue} from "vue-property-decorator";
import {mapState} from "vuex";
import Dialog from "@/components/Dialog.vue";

@Component({
	components: {
		Dialog,
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
			await this.$store.dispatch("snackbar/push", {
				message: "Ce client n'existe pas",
				icon: "alert",
				color: "error"
			})

			this.$router.push("/customers");
		}
	},
})
export default class CustomerDetail extends Vue {
	address = false;
	deleteDialog = false

	/**
	 * Delete a customer
	 */
	async deleteCustomer() {
		try {
			await this.$store.dispatch("customers/delete", {
				params: {
					id: this.$route.params.id,
				},
			});

			await this.$router.push("/customers");
		} catch {
			await this.$store.dispatch("snackbar/push", {
				message: "Impossible de supprimer le client",
				icon: "alert",
				color: "error"
			})
		}
	}
}
</script>
