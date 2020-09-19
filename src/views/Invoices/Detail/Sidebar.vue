<template>
	<v-navigation-drawer width="350px" app permanent right>
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title>
					{{
					invoice.type == "invoice" ? "Facture" : "Devis"
					}}
					{{ invoice.number || "non numérotée" }}
				</v-list-item-title>
				<v-list-item-subtitle>
					Dernière modification le
					{{
					new Date(invoice.updatedAt).toLocaleDateString()
					}}
				</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider />

		<v-list nav>
			<v-list-item @click="addField = true">
				<v-list-item-icon>
					<v-icon>mdi-plus</v-icon>
				</v-list-item-icon>
				<v-list-item-title>Ajouter un objet</v-list-item-title>
			</v-list-item>
		</v-list>

		<v-divider />

		<v-list nav>
			<v-list-item @click="editionDialog = true">
				<v-list-item-icon>
					<v-icon>mdi-file-cog</v-icon>
				</v-list-item-icon>
				<v-list-item-title>Modifier le fichier</v-list-item-title>
			</v-list-item>

			<v-list-item @click="remove">
				<v-list-item-icon>
					<v-icon>mdi-delete</v-icon>
				</v-list-item-icon>
				<v-list-item-title>Supprimer le fichier</v-list-item-title>
			</v-list-item>

			<v-list-item to="/invoices" exact>
				<v-list-item-icon>
					<v-icon>mdi-arrow-left</v-icon>
				</v-list-item-icon>
				<v-list-item-title>Quitter</v-list-item-title>
			</v-list-item>
		</v-list>

		<v-divider />

		<v-list nav>
			<v-list-item :href="
					'//localhost:8080/invoices/' +
					invoice.id +
					'/render'
				">
				<v-list-item-icon>
					<v-icon>mdi-printer</v-icon>
				</v-list-item-icon>
				<v-list-item-title>Imprimer</v-list-item-title>
			</v-list-item>
		</v-list>

		<template #append>
			<PriceTable :invoice.sync="payload" />
		</template>

		<AddField :display.sync="addField" :id="invoice.id" />
		<EditionDialog :display.sync="editionDialog" :invoice.sync="invoice" />
	</v-navigation-drawer>
</template>

<script lang="ts">
import AddField from "./Dialogs/AddField.vue";
import EditionDialog from "./Dialogs/EditionDialog.vue";
import PriceTable from "./Components/PriceTable.vue";

import { InvoiceOutput } from "@/types";
import { mapState } from "vuex";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
	components: {
		AddField,
		EditionDialog,
		PriceTable,
	},
	computed: {
		...mapState("invoices", {
			payload: (state: any) => state.invoice as InvoiceOutput,
		}),
	},
})
export default class Sidebar extends Vue {
	addField = false;
	editionDialog = false;

	invoice?: InvoiceOutput;

	@Watch("payload", { deep: true, immediate: true })
	onLoad(invoice: InvoiceOutput) {
		this.invoice = invoice;
	}

	async remove() {
		if (
			!confirm(
				"Êtes-vous sur de vouloir supprimer ce fichier ? Cette action est irréversible."
			)
		) {
			return;
		}

		try {
			await this.$store.dispatch("invoices/delete", {
				params: {
					id: this.invoice?.id,
				},
			});

			this.$router.push("/invoices");
		} catch {
			alert("Une erreur est survenue!");
		}
	}
}
</script>