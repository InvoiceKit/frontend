<template>
	<v-dialog v-model="show" @click:outside="show = false" max-width="700px">
		<v-card>
			<v-card-title>Créer une facture</v-card-title>

			<v-card-subtitle>Séléctionnez une adresse</v-card-subtitle>

			<v-data-table
				show-select
				single-select
				@item-selected="handle"
				:items="customer.addresses"
				:headers="headers"
			/>

			<v-card-actions>
				<v-spacer />

				<v-btn text color="red" @click="show = false">Annuler</v-btn>

				<v-btn text color="green" :disabled="!payload.addressID" @click="save">Ajouter</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import {
	Address,
	Customer,
	Invoice,
	InvoiceStatus,
	InvoiceType,
} from "@/types";
import { DataTableHeader } from "vuetify";
import { mapState } from "vuex";

const defaultPayload: Invoice = {
	customerID: "",
	addressID: "",
	type: InvoiceType.invoice,
	status: InvoiceStatus.waiting,
	dueDate: "",
	number: "",
	promotion: 0,
	deposit: 0,
	additional_text: "",
	fields: [],
};

@Component({
	computed: {
		...mapState("invoices", ["invoice"]),
	},
})
export default class AddInvoice extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;
	@Prop(Object) readonly customer!: Customer;

	invoice!: Invoice;
	payload: Invoice = defaultPayload;

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
			await this.$store.dispatch("invoices/add", {
				params: {
					id: this.customer.id,
				},
				data: this.payload,
			});

			// Redirect
			this.$router.push(`/invoices/${this.invoice.id}`);
		} catch {
			this.error = true;
		}
	}
}
</script>
