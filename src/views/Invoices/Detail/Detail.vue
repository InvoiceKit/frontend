<template>
	<v-container v-if="invoice.type">
		<v-row>
			<v-col>
				<p class="header">
					{{ invoice.type === "invoice" ? "Facture" : "Devis" }}
					{{ invoice.number || "non numérotée" }}
					<br />
					<span class="overline">
						Dernière modification le
						{{ new Date(invoice.updatedAt).toLocaleDateString() }}
					</span>
				</p>
			</v-col>

			<v-spacer />

			<v-col align="right">
				<v-btn to="/invoices" exact icon large>
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-btn
					target="_blank"
					:href="host + '/invoices/' + invoice.id + '/render'"
					icon
					large
					color="blue darken-1"
				>
					<v-icon>mdi-printer</v-icon>
				</v-btn>

				<v-btn
					@click="editionDialog = true"
					icon
					large
					color="orange darken-1"
				>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>

				<v-btn @click="remove" icon large color="red darken-1">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="9">
				<Table />
			</v-col>
			<v-col>
				<PriceTable />
			</v-col>
		</v-row>

		<EditionDialog :display.sync="editionDialog" :invoice.sync="invoice" />
	</v-container>
</template>

<script lang="ts">
import PriceTable from "./Components/PriceTable.vue";
import Table from "./Table.vue";
import EditionDialog from "./Dialogs/EditionDialog.vue";

import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index";
import { mapState } from "vuex";
import { InvoiceOutput } from "@/types";
import api from "@/store/api";

@Component({
	components: {
		PriceTable,
		Table,
		EditionDialog,
	},

	computed: {
		...mapState("invoices", ["invoice"]),

		host() {
			return api.host;
		},
	},

	async beforeRouteEnter(to, from, next) {
		try {
			await store.dispatch("invoices/get", {
				params: {
					id: to.params.id,
				},
			});

			next();
		} catch {
			next({ path: "/invoices" });
		}
	},
})
export default class Detail extends Vue {
	invoice!: InvoiceOutput;
	editionDialog = false;

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
