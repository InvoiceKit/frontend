<template>
	<v-container fluid>
		<v-row class="mb-4">
			<v-col>
				<p class="header">Contrats</p>
			</v-col>

			<v-spacer />

			<v-col cols="4" align="right">
				<v-text-field
					hide-details
					single-line
					solo-inverted
					label="Chercher un contrat"
					v-model="search"
				/>
			</v-col>
		</v-row>

		<v-card>
			<v-data-table
				:search="search"
				:headers="headers"
				:items="contractsList"
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
					new Date(item.updatedAt).toLocaleDateString()
				}}</template>

				<template #item.status="{ item }">
					<StatusLabel :status="item.status" />
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "ContractsList",
	computed: {
		...mapState("contracts", ["contracts"]),
	},
	data: () => ({
		search: "",
		headers: [
			{
				text: "Nom complet ou entreprise",
				value: "name",
			},
			{
				text: "Numéro de série",
				value: "serial",
			},
			{
				text: "Dernière modification",
				value: "updatedAt",
			},
			{
				text: "Statut",
				value: "status",
			},
		],
		contractsList: [],
	}),
	async mounted() {
		try {
			// Update
			await this.$store.dispatch("contracts/fetch");

			// Empty the list
			this.contractsList = [];

			// Set list
			for (const contract of this.contracts.items) {
				const customer = contract.customer;

				this.contractsList.push({
					name: `${customer.firstName} ${customer.lastName} ${customer.company}`,
					...contract,
				});
			}
		} catch (ex) {
			console.log(ex);
		}
	},
	methods: {
		open(item) {
			this.$router.push(`/contracts/${item.id}`);
		},
	},
};
</script>
