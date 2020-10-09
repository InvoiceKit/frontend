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

			<v-col class="text-right">
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
import {Customer, Pagination} from "@/types";
import {mapState} from "vuex";

@Component({
	components: {
		AddCustomer,
	},

	computed: {
		...mapState('customers', [
			'customers'
		])
	}
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

	customers!: Pagination<Customer>

	async mounted() {
		try {
			await this.$store.dispatch('customers/fetch')

			for (const customer of this.customers.items) {
				this.customersList.push({
					name: `${customer.firstName} ${customer.lastName} ${customer.company}`,
					...customer,
				});
			}
		} catch {
			await this.$store.dispatch("snackbar/push", {
				message: "Impossible de récuperer les clients",
				icon: "alert",
				color: "error"
			})
		}
	}

	open(row: any) {
		this.$router.push(`/customers/${row.id}`);
	}
}
</script>
