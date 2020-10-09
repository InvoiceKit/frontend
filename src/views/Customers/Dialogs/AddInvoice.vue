<template>
	<v-dialog v-model="show" max-width="700px" @click:outside="show = false">
		<v-card>
			<v-card-title>Créer une facture</v-card-title>

			<v-card-subtitle>Séléctionnez une adresse</v-card-subtitle>

			<v-data-table
				:headers="headers"
				:items="customer.addresses"
				show-select
				single-select
				@item-selected="handle"
			/>

			<v-card-actions>
				<input ref="upload" hidden type="file" @change="importFile"/>
				<v-btn
					:disabled="!payload.addressID"
					color="orange darken-2"
					text
					@click="$refs.upload.click()"
				>
					<v-icon left> mdi-arrow-up</v-icon>
					Importer
				</v-btn>

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
import {Customer, Field, Invoice, InvoiceStatus, InvoiceType,} from "@/types";
import {DataTableHeader} from "vuetify";
import {mapState} from "vuex";

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
	@PropSync("display", {type: Boolean}) show!: boolean;
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

	@Watch("display")
	reset() {
		// Reset payload
		this.payload = Object.assign({}, defaultPayload);
		this.error = false;
	}

	handle(address: any) {
		this.payload.addressID = address.value ? address.item.id : null;
	}

	importFile(event: any) {
		// Init a FileReader
		const reader = new FileReader();

		// Callback
		reader.onload = async (e: any) => {
			// Parse JSON
			const result = JSON.parse(e.target.result);

			// Fill fields
			this.payload.type =
				result.type === "Devis"
					? InvoiceType.quote
					: InvoiceType.invoice;
			this.payload.number = result.number.trim();
			this.payload.deposit = result.acompte.amount * 1;
			this.payload.promotion = result.promotion.percentage * 1;

			// Fill entries
			result.entries.forEach((entry: any) => {
				const field: Field = {
					name: entry.name.trim(),
					price: entry.price * 1,
					vat: entry.tva * 1,
				};

				// Fix old invoice format
				if (field.vat == null) {
					field.vat = (result.tva !== null ? result.tva : 10) * 1;
				}

				this.payload.fields.push(field);
			});

			// Save file
			await this.save();
		};

		// Read file
		reader.readAsText(event.target.files[0]);
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

			await this.$store.dispatch("snackbar/push", {
				message: "La facture a été créée",
				icon: "check",
				color: "success"
			})

			// Redirect
			await this.$router.push(`/invoices/${this.invoice.id}`);
		} catch {
			await this.$store.dispatch("snackbar/push", {
				message: "Impossible de créer la facture",
				icon: "alert",
				color: "error"
			})
		}
	}
}
</script>
