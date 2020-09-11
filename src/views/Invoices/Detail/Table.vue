<template>
	<v-card class="mt-6" v-if="payload.invoice">
		<v-card-title>
			<CardIcon color="teal" icon="cube-outline" />

			Liste des objets
		</v-card-title>

		<v-data-table
			:headers="headers"
			:items="payload.invoice.fields"
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
			:id="payload.invoice.id"
			:editedItem="editedItem"
		/>
	</v-card>
</template>

<script lang="ts">
import AddField from "./Dialogs/AddField.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import { InvoiceOutput, Field } from "@/types";

@Component({
	components: {
		AddField,
	},

	computed: {
		...mapState("invoices", ["invoice"]),
	},
})
export default class Table extends Vue {
	payload: InvoiceOutput = {};

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

	@Watch("invoice", { deep: true, immediate: true })
	onLoad(invoice: InvoiceOutput) {
		this.payload = invoice;
	}

	async deleteItem(item: Field) {
		await this.$store.dispatch("invoices/deleteField", {
			params: {
				id: this.payload.invoice?.id,
				field: item.id,
			},
		});

		await this.$store.dispatch("invoices/get", {
			params: {
				id: this.payload.invoice?.id,
			},
		});
	}

	editItem(item: Field) {
		this.editedItem = item;
		this.editionDialog = true;
	}
}
</script>