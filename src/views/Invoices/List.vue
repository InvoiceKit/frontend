<template>
	<v-container fluid>
		<v-row class="mb-4">
			<v-col>
				<p class="display-1">Factures</p>
			</v-col>

			<v-spacer />

			<v-col cols="4" align="right">
				<v-text-field
					hide-details
					single-line
					solo-inverted
					label="Chercher une facture"
					v-model="search"
				/>
			</v-col>
		</v-row>

		<v-card>
			<v-data-table
				:search="search"
				:headers="headers"
				:items="invoiceList"
				@click:row="open"
			>
				<template #item.name="{ item }">
					<span
						v-if="item.customer.firstName || item.customer.lastName"
					>
						{{ item.customer.firstName }}
						<b>{{ item.customer.lastName }}</b>

						<span v-if="item.customer.company"
							>&nbsp;({{ item.customer.company }})</span
						>
					</span>
					<span v-else>{{ item.customer.company }}</span>
				</template>

				<template #item.updatedAt="{ item }">{{
					new Date(item.updatedAt).toLocaleString()
				}}</template>

				<template #item.status="{ item }">
					<StatusLabel :status="item.status" />
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Invoice, Pagination } from "@/types";

@Component({
	computed: {
		...mapState("invoices", ["invoices"]),
	},
})
export default class InvoiceList extends Vue {
	addDialog = false;
	search = "";
	headers = [
		{
			text: "Nom ou entreprise",
			value: "name",
		},
		{
			text: "Numéro",
			value: "number",
		},
		{
			text: "Dernière modification",
			value: "updatedAt",
		},
		{
			text: "Statut",
			value: "status",
		},
	];

	invoices!: Pagination<Invoice>;

	invoiceList: Array<any> = [];

	async mounted() {
		try {
			await this.$store.dispatch("invoices/fetch");

			for (const invoice of this.invoices.items) {
				let fn = invoice.customer?.firstName || "";
				let ln = invoice.customer?.lastName || "";
				let company = invoice.customer?.company || "";

				this.invoiceList.push({
					name: `${fn} ${ln} ${company}`,
					...invoice,
				});
			}
		} catch (ex) {
			console.log(ex);
		}
	}

	open(row: any) {
		this.$router.push(`/invoices/${row.id}`);
	}
}
</script>
