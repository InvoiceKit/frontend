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
						{{ getString(new Date(invoice.updatedAt)) }}
					</span>
				</p>
			</v-col>

			<v-spacer/>

			<v-col align="right">
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

				<v-btn color="red darken-1" icon large @click="remove">
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
	</v-container>
</template>

<script lang="ts">
import PriceTable from "./Components/PriceTable.vue";
import DetailCard from "./Components/DetailCard.vue";
import Table from "./Table.vue";
import EditionDialog from "./Dialogs/EditionDialog.vue";

import {Component, Vue} from "vue-property-decorator";
import store from "@/store/index";
import {mapState} from "vuex";
import {InvoiceOutput} from "@/types";
import api from "@/store/api";
import date from "@/mixins/date";

@Component({
	components: {
		PriceTable,
		DetailCard,
		Table,
		EditionDialog,
	},

	mixins: [date],

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
			next({path: "/invoices"});
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
