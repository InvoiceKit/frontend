<template>
	<v-container fluid>
		<v-row class="mb-4" align="center" justify="center">
			<v-col>
				<p class="header">Contrats</p>
			</v-col>

			<v-spacer />

			<v-col align="right">
				<v-btn @click="searchByDate(true)" text large>
					<v-icon left> mdi-calendar-month </v-icon>

					Année dernière
				</v-btn>

				<v-btn @click="searchByDate(false)" text large>
					<v-icon left> mdi-clock </v-icon>

					Ce mois
				</v-btn>
			</v-col>

			<v-col cols="4" align="right">
				<v-text-field
					hide-details
					single-line
					solo-inverted
					label="Chercher un contrat"
					v-model="search"
				>
					<v-icon slot="append" @click="search = ''">
						mdi-close
					</v-icon>
				</v-text-field>
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

				<template #item.status="{ item }">
					<StatusLabel :status="item.status" />
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import date from "@/mixins/date";

export default {
	name: "ContractsList",
	mixins: [date],
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
				text: "Date de création",
				value: "dateCreate",
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
					dateCreate: this.getString(new Date(contract.createdAt)),
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

		searchByDate(lastYear) {
			let date = new Date();

			if (lastYear) {
				date.setFullYear(date.getFullYear() - 1);
			}

			this.search = this.getMMYYYY(date);
		},
	},
};
</script>
