<template>
	<v-card class="mt-10">
		<v-card-title>
			<CardIcon color="indigo darken-2" icon="map"/>

			Adresses

			<v-spacer/>

			<v-text-field
				v-model="search"
				hide-details
				label="Chercher une adresse"
				solo-inverted
			/>
		</v-card-title>

		<template v-if="syncedPayload.customerID">
			<v-data-table
				:headers="headers"
				:items="customer.addresses"
				:search="search"
				:single-select="true"
				show-select
				v-on:item-selected="handleSelection"
			/>
		</template>
		<template v-else>
			<v-card-text class="text-center">
				Aucun client sélectionné.
			</v-card-text>
		</template>
	</v-card>
</template>

<script lang="ts">
import {Customer, Invoice} from "@/types";
import {Component, PropSync, Vue, Watch} from "vue-property-decorator";
import {mapState} from "vuex";

@Component({
	computed: {
		...mapState("customers", ["customer"]),
	},
})
export default class InformationCard extends Vue {
	@PropSync("payload", {type: Object}) syncedPayload!: Invoice;

	customer!: Customer

	search = "";

	headers = [
		{
			text: "Adresse",
			value: "line",
		},
		{
			text: "Code postal",
			value: "zip",
		},
		{
			text: "Ville",
			value: "city",
		},
	];

	@Watch("syncedPayload", {deep: true})
	async onChange(newValue: Invoice) {
		if (newValue.customerID) {
			await this.$store.dispatch("customers/get", {
				params: {
					id: newValue.customerID,
				},
			});
		}
	}

	handleSelection(newValue: any) {
		this.syncedPayload.addressID = newValue.value
			? newValue.item.id
			: undefined;
	}
}
</script>
