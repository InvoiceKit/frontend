<template>
	<div>
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
		</v-card>

		<AddDialog :display.sync="addDialog" />
	</div>
</template>

<script>
import { mapState } from "vuex";
import AddDialog from "./Dialogs/Add";

export default {
	name: "CustomerList",
	components: {
		AddDialog,
	},
	data: () => ({
		addDialog: false,
		search: "",
		headers: [
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
		],
	}),
	computed: {
		...mapState("customers", ["customers"]),
	},
	async mounted() {
		this.$store.dispatch("customers/fetch");
	},
	methods: {
		open(row) {
			this.$router.push(`/customers/${row.id}`)
		}
	}
};
</script>