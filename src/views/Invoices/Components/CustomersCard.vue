<template>
	<v-card class="mt-10">
		<v-card-title>
			<CardIcon color="indigo" icon="account-group" />

			Clients

			<v-spacer />

			<v-text-field
				v-model="search"
				label="Chercher un client"
				solo-inverted
				hide-details
			/>
		</v-card-title>

		<v-data-table
			v-on:item-selected="handleSelection"
			:search="search"
			:headers="headers"
			:items="customers.items"
			:single-select="true"
			show-select
		>
			<template #item.name="{ item }">
				{{ item.firstName }} <b>{{ item.lastName }}</b>
			</template>
		</v-data-table>
	</v-card>
</template>

<script lang="ts">
import { Customer, Invoice } from "@/types";
import { Component, PropSync, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
	computed: {
		...mapState("customers", ["customers"]),
	},

	async mounted() {
		await this.$store.dispatch("customers/fetch");
	},
})
export default class InformationCard extends Vue {
	@PropSync("payload", { type: Object }) syncedPayload!: Invoice;

	search = "";

	headers = [
		{
			text: "Nom complet",
			value: "name",
		},
		{
			text: "Entreprise",
			value: "company",
		},
		{
			text: "Email",
			value: "email",
		},
	];

	handleSelection(newValue: any) {
		this.syncedPayload.addressID = undefined;
		this.syncedPayload.customerID = newValue.value
			? newValue.item.id
			: undefined;
	}
}
</script>