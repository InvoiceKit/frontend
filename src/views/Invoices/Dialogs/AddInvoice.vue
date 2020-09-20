<template>
	<v-dialog v-model="show" fullscreen @click:outside="show = !show">
		<v-card>
			<v-app-bar fixed>
				<v-btn icon @click="show = !show">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-toolbar-title>Créer une facture</v-toolbar-title>

				<v-spacer />

				<v-btn text color="green" @click="save" :disabled="disabled">Créer la facture</v-btn>
			</v-app-bar>

			<v-card-text class="pt-14">
				<v-row>
					<v-col cols="12" md="4">
						<information-card :payload.sync="payload" />
					</v-col>
					<v-col cols="12" md="8">
						<customer-card :payload.sync="payload" />

						<addresses-card :payload.sync="payload" />
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import InformationCard from "../Components/InformationCard.vue";
import CustomerCard from "../Components/CustomersCard.vue";
import AddressesCard from "../Components/AddressesCard.vue";

import { InvoiceType, InvoiceStatus, Invoice } from "@/types";
import { Component, PropSync, Prop, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";

const defaultPayload: Invoice = {
	customerID: "",
	addressID: "",
	type: InvoiceType.invoice,
	status: InvoiceStatus.waiting,
	dueDate: "",
	number: "",
	deposit: 0,
	promotion: 0,
	additional_text: "",
	fields: [],
};

@Component({
	components: {
		InformationCard,
		CustomerCard,
		AddressesCard,
	},
})
export default class AddInvoice extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;

	payload: Invoice = defaultPayload;
	disabled: boolean = true;

	@Watch("display")
	reset() {
		this.payload = Object.assign({}, defaultPayload);
	}

	@Watch("payload", { deep: true })
	onChange(newValue: Invoice) {
		this.disabled = !(newValue.customerID && newValue.addressID);
	}

	async save() {
		try {
			await this.$store.dispatch("invoices/add", {
				data: this.payload,
			});

			this.$router.push(
				`/invoices/${this.$store.state.invoices.invoice.id}`
			);
		} catch (ex) {
			console.log(ex);
		}
	}
}
</script>