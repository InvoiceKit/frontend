<template>
	<v-card>
		<v-card-title>
			Clients

			<v-spacer />

			<v-text-field
				hide-details
				single-line
				solo-inverted
				label="Chercher un client"
				v-model="search"
			/>

			<v-spacer />

			<v-btn icon @click="addDialog = true" large>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-card-title>

		<v-data-table
			:search="search"
			:headers="headers"
			:items="customers.items"
			@click:row="open"
		>
			<template v-slot:item.name="{ item }">
				{{ item.firstName }} <b>{{ item.lastName }}</b>
			</template>
		</v-data-table>

		<AddDialog :display.sync="addDialog" />
	</v-card>
</template>

<script lang="ts">
import AddDialog from "./Dialogs/Add.vue";

import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {
		AddDialog,
	},
	computed: {
		...mapState("customers", ["customers"]),
	},
	async mounted() {
		this.$store.dispatch("customers/fetch");
	},
})
export default class CustomerList extends Vue {
	addDialog = false;
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
		{
			text: "Téléphone",
			value: "phone",
		},
	];

	open(row: any) {
		this.$router.push(`/customers/${row.id}`);
	}
}
</script>