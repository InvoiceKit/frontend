<template>
	<v-card class="mt-6" v-if="invoice">
		<v-card-title>
			<CardIcon color="teal" icon="cube-outline" />Liste des objets
		</v-card-title>

		<v-data-table
			:headers="headers"
			:items="payload.fields"
			:items-per-page="-1"
		>
			<template #item.actions="{ item }">
				<v-btn icon @click="deleteItem(item)">
					<v-icon>mdi-delete</v-icon>
				</v-btn>

				<v-btn icon @click="editItem(item)">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</template>
		</v-data-table>

		<AddField
			:display.sync="editionDialog"
			:invoice="invoice"
			:field="editedItem"
		/>
	</v-card>
</template>

<script lang="ts">
import AddField from "./Dialogs/AddField.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import { InvoiceOutput, Field, Invoice } from "@/types";

@Component({
	components: {
		AddField,
	},

	computed: {
		...mapState("invoices", {
			payload: (state: any) => state.invoice as InvoiceOutput,
		}),
	},
})
export default class Table extends Vue {
	invoice?: InvoiceOutput;

	headers = [
		{
			text: "Description",
			value: "name",
		},
		{
			text: "TVA",
			value: "vat",
			width: 200,
		},
		{
			text: "Prix H.T.",
			value: "price",
			width: 200,
		},
		{
			text: "Actions",
			value: "actions",
			width: 200,
		},
	];

	editionDialog = false;

	editedItem: Field = {
		name: "",
		price: 0,
		vat: 0,
	};

	@Watch("payload", { deep: true, immediate: true })
	onLoad(invoice: InvoiceOutput) {
		this.invoice = invoice;
	}

	async deleteItem(item: Field) {
		// Delete from fields
		let index = this.invoice?.fields.indexOf(item);

		if (index !== null || index > -1) {
			this.invoice?.fields.splice(index, 1);
		}

		// Update
		await this.$store.dispatch("invoices/update", {
			params: {
				id: this.invoice?.id,
			},
			data: this.invoice,
		});
	}

	editItem(item: Field) {
		this.editedItem = item;
		this.editionDialog = true;
	}
}
</script>
