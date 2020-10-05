<template>
	<v-card>
		<v-card-title>
			Liste des objets
			<v-spacer/>

			<v-btn color="blue" text @click="addItem">
				<v-icon left>mdi-plus</v-icon>
				Ajouter un objet
			</v-btn>
		</v-card-title>

		<v-data-table
			:headers="headers"
			:items="invoice.fields"
			:items-per-page="-1"
		>
			<template #item.name="{ item }">
				<span v-html="item.name"/>
			</template>
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
			:field="editedItem"
			:invoice="invoice"
		/>
	</v-card>
</template>

<script lang="ts">
import AddField from "./Dialogs/AddField.vue";
import {Component, Vue} from "vue-property-decorator";
import {mapState} from "vuex";
import {Field, InvoiceOutput} from "@/types";

@Component({
	components: {
		AddField,
	},

	computed: {
		...mapState("invoices", ["invoice"]),
	},
})
export default class Table extends Vue {
	invoice!: InvoiceOutput;

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

	editedItem?: Field = {
		name: "",
		price: 0,
		vat: 0,
	};

	async deleteItem(item: Field) {
		// Delete from fields
		let index = this.invoice.fields.indexOf(item);

		if (index > -1) {
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

	addItem() {
		this.editedItem = undefined;
		this.editionDialog = true;
	}
}
</script>
