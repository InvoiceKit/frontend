<template>
	<v-dialog v-model="show" max-width="700px" @click:outside="show = false">
		<v-card>
			<v-card-title>Ajouter un contrat d'entretien</v-card-title>

			<v-card-subtitle>Séléctionnez une adresse</v-card-subtitle>

			<v-data-table
				:headers="headers"
				:items="customer.addresses"
				show-select
				single-select
				@item-selected="handle"
			/>

			<v-card-actions>
				<v-spacer/>

				<v-btn color="red" text @click="show = false">Annuler</v-btn>

				<v-btn
					:disabled="!payload.addressID"
					color="green"
					text
					@click="save"
				>Ajouter
				</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue, Watch} from "vue-property-decorator";
import {Contract, ContractStatus, Customer} from "@/types";
import {DataTableHeader} from "vuetify";
import {mapState} from "vuex";

const defaultPayload: Contract = {
	customerID: "",
	addressID: "",
	type: "",
	serial: "",
	status: ContractStatus.ongoing,
	changes: [],
	date: "",
};

@Component({
	computed: {
		...mapState("contracts", ["contract"]),
	},
})
export default class AddContract extends Vue {
	@PropSync("display", {type: Boolean}) show!: boolean;
	@Prop(Object) readonly customer!: Customer;

	contract!: Contract;
	payload: Contract = defaultPayload;

	headers: Array<DataTableHeader> = [
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
	];

	error = false;

	@Watch("display")
	reset() {
		// Reset payload
		this.payload = Object.assign({}, defaultPayload);
		this.error = false;
	}

	handle(address: any) {
		this.payload.addressID = address.value ? address.item.id : null;
	}

	/**
	 * Add a contract
	 */
	async save() {
		try {
			// Set customer
			this.payload.customerID = this.customer.id;

			// Push contract
			await this.$store.dispatch("contracts/add", {
				params: {
					id: this.customer.id,
				},
				data: this.payload,
			});

			// Redirect
			this.$router.push(`/contracts/${this.contract.id}`);
		} catch {
			this.error = true;
		}
	}
}
</script>
