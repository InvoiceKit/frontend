<template>
	<v-container fluid>
		<v-row class="mb-4">
			<v-col>
				<p class="header">Clients</p>
			</v-col>

			<v-spacer />

			<v-col cols="5">
				<v-text-field
					hide-details
					single-line
					solo-inverted
					label="Chercher un client"
					v-model="search"
				/>
			</v-col>

			<v-spacer />

			<v-col align="right">
				<v-btn icon @click="addDialog = true" large>
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-card>
			<v-data-table
				:search="search"
				:headers="headers"
				:items="customersList"
				@click:row="open"
			>
				<template v-slot:item.name="{ item }">
					{{ item.firstName }}
					<b>{{ item.lastName }}</b>
				</template>
			</v-data-table>
		</v-card>

		<AddCustomer :display.sync="addDialog" />
	</v-container>
</template>

<script lang="ts">
import AddCustomer from "./Dialogs/AddCustomer.vue";

import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Customer, Pagination } from "@/types";

@Component({
	components: {
		AddCustomer,
	},
})
export default class CustomerList extends Vue {
	addDialog = false;
	customersList: Array<Customer> = [];
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

	async mounted() {
		try {
			let data = (await this.$store.dispatch("customers/fetch")).data;

			data.items.forEach((customer: Customer) => {
				this.customersList.push({
					name: `${customer.firstName} ${customer.lastName} ${customer.company}`,
					...customer,
				});
			});
		} catch (ex) {
			console.log(ex);
		}
	}

	open(row: any) {
		this.$router.push(`/customers/${row.id}`);
	}
}
</script>
