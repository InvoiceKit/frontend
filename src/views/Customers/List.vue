<template>
	<v-container fluid>
		<v-row class="mb-4">
			<v-col>
				<p class="header">Clients</p>
			</v-col>

			<v-spacer/>

			<v-col cols="5">
				<v-text-field
					v-model="search"
					hide-details
					label="Chercher un client"
					single-line
					solo-inverted
				/>
			</v-col>

			<v-spacer/>

			<v-col align="right">
				<v-btn icon large @click="addDialog = true">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-card>
			<v-data-table
				:headers="headers"
				:items="customersList"
				:search="search"
				@click:row="open"
			>
				<template v-slot:item.name="{ item }">
					{{ item.firstName }}
					<b>{{ item.lastName }}</b>
				</template>
			</v-data-table>
		</v-card>

		<AddCustomer :display.sync="addDialog"/>
	</v-container>
</template>

<script lang="ts">
import AddCustomer from "./Dialogs/AddCustomer.vue";
import {Component, Vue} from "vue-property-decorator";
import {Customer} from "@/types";

@Component({
	components: {
		AddCustomer,
	},
})
export default class CustomerList extends Vue {
	addDialog = false;
	customersList: Array<any> = [];
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
