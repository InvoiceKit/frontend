<template>
	<v-container v-if="invoice.type">
		<v-row>
			<v-col>
				<p class="header">
					{{ invoice.type === "invoice" ? "Facture" : "Devis" }}
					{{ invoice.number || "non numérotée" }}
					<br/>
					<span class="overline">
						Dernière modification le
						{{ lastEdit }}
					</span>
				</p>
			</v-col>

			<v-spacer/>

			<v-col class="text-right">
				<v-btn exact icon large to="/invoices">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-btn
					:href="host + '/invoices/' + invoice.id + '/render'"
					color="blue darken-1"
					icon
					large
					target="_blank"
				>
					<v-icon>mdi-printer</v-icon>
				</v-btn>

				<v-btn
					color="orange darken-1"
					icon
					large
					@click="editionDialog = true"
				>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>

				<v-btn color="red darken-1" icon large @click="deleteDialog = true">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="9">
				<Table/>
			</v-col>
			<v-col>
				<PriceTable/>

				<br/>

				<DetailCard/>
			</v-col>
		</v-row>

		<EditionDialog :display.sync="editionDialog" :invoice.sync="invoice"/>
		<Dialog
			:show.sync="deleteDialog"
			title="Confirmation"
			text="Voulez-vous supprimer cette facture ? Cette action est irreversible."
			button="Supprimer"
			:destructive="true"
			:method="remove"
			/>
	</v-container>
</template>

<script lang="ts">
import PriceTable from "./Components/PriceTable.vue";
import DetailCard from "./Components/DetailCard.vue";
import Table from "./Table.vue";
import EditionDialog from "./Dialogs/EditionDialog.vue";

import {Component, Mixins} from "vue-property-decorator";
import store from "@/store/index";
import {mapState} from "vuex";
import {InvoiceOutput} from "@/types";
import api from "@/store/api";
import DateMixin from "@/mixins/date";
import Dialog from "@/components/Dialog.vue";

@Component({
	components: {
		Dialog,
		PriceTable,
		DetailCard,
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
			await this.$store.dispatch("snackbar/push", {
				message: "Cette facture n'existe pas",
				icon: "alert",
				color: "error"
			})

			next({path: "/invoices"});
		}
	},
})
export default class Detail extends Mixins(DateMixin) {
	invoice!: InvoiceOutput;
	editionDialog = false;
	deleteDialog = false;

	get lastEdit() {
		return this.getString(new Date(this.invoice.updatedAt))
	}

	async remove() {
		try {
			await this.$store.dispatch("invoices/delete", {
				params: {
					id: this.invoice?.id,
				},
			});

			await this.$store.dispatch("snackbar/push", {
				message: "La facture a bien été supprimée",
				icon: "check",
				color: "success"
			})

			await this.$router.push("/invoices");
		} catch {
			await this.$store.dispatch("snackbar/push", {
				message: "Impossible de supprimer la facture",
				icon: "alert",
				color: "error"
			})
		}
	}
}
</script>
