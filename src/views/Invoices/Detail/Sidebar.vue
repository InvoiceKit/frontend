<template>
	<v-navigation-drawer width="350px" app permanent right>
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title>
					{{
						invoice.invoice.type == "invoice" ? "Facture" : "Devis"
					}}
					{{ invoice.invoice.number || "non numérotée" }}
				</v-list-item-title>
				<v-list-item-subtitle>
					Dernière modification le
					{{ new Date(invoice.invoice.updatedAt).toLocaleDateString() }}
				</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider />

		<v-list nav>
			<v-list-item @click="addField = true">
				<v-list-item-icon>
					<v-icon>mdi-plus</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					Ajouter un objet
				</v-list-item-title>
			</v-list-item>

			<v-list-item @click="false">
				<v-list-item-icon>
					<v-icon>mdi-sale</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					Ajouter une remise commerciale
				</v-list-item-title>
			</v-list-item>

			<v-list-item @click="false">
				<v-list-item-icon>
					<v-icon>mdi-bank-transfer</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					Ajouter un acompte
				</v-list-item-title>
			</v-list-item>
		</v-list>

		<v-divider />

		<v-list nav>
			<v-list-item to="/">
				<v-list-item-icon>
					<v-icon>mdi-file-cog</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					Modifier le fichier
				</v-list-item-title>
			</v-list-item>

			<v-list-item to="/">
				<v-list-item-icon>
					<v-icon>mdi-content-duplicate</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					Dupliquer le fichier
				</v-list-item-title>
			</v-list-item>

			<v-list-item to="/">
				<v-list-item-icon>
					<v-icon>mdi-delete</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					Supprimer le fichier
				</v-list-item-title>
			</v-list-item>

			<v-list-item to="/invoices" exact>
				<v-list-item-icon>
					<v-icon>mdi-arrow-left</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					Quitter
				</v-list-item-title>
			</v-list-item>
		</v-list>

		<v-divider />

		<v-list nav>
			<v-list-item :href="'//localhost:8080/invoices/' + invoice.invoice.id + '/render'">
				<v-list-item-icon>
					<v-icon>mdi-printer</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					Imprimer
				</v-list-item-title>
			</v-list-item>
		</v-list>

		<template v-slot:append>
			<v-simple-table>
				<tbody>
					<tr>
						<td>Total H.T.</td>
						<td>{{ invoice.prices.totalWV }} €</td>
					</tr>
					<tr>
						<td>T.V.A.</td>
						<td>{{ invoice.prices.VAT }} €</td>
					</tr>
					<tr v-if="invoice.prices.promotion && invoice.prices.promotion != 0">
						<td>Remise commerciale</td>
						<td>- {{ invoice.prices.promotion }} €</td>
					</tr>
					<tr v-if="invoice.invoice.deposit && invoice.invoice.deposit != 0">
						<td>Acompte</td>
						<td>- {{ invoice.invoice.deposit }} €</td>
					</tr>
					<tr>
						<td>Total T.T.C.</td>
						<td>{{ invoice.prices.final }} €</td>
					</tr>
				</tbody>
			</v-simple-table>
		</template>

		<AddField :display.sync="addField" :id="invoice.invoice.id" />
	</v-navigation-drawer>
</template>

<script lang="ts">
import AddField from './Dialogs/FieldDialog.vue'
import { InvoiceOutput } from "@/types";
import { mapState } from "vuex";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	components: {
		AddField
	},
	computed: {
		...mapState("invoices", ["invoice"]),
	},
})
export default class Sidebar extends Vue {
	addField = false
}
</script>