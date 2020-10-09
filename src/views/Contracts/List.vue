<template>
	<v-container fluid>
		<v-row align="center" class="mb-4" justify="center">
			<v-col>
				<p class="header">Contrats</p>
			</v-col>

			<v-spacer/>

			<v-col class="text-right" cols="5">
				<v-btn large text @click="searchByDate(true)">
					<v-icon left> mdi-calendar-month</v-icon>

					Année dernière
				</v-btn>

				<v-btn large text @click="searchByDate(false)">
					<v-icon left> mdi-clock</v-icon>

					Ce mois
				</v-btn>
			</v-col>

			<v-col class="text-right" cols="4">
				<v-text-field
					v-model="search"
					hide-details
					label="Chercher un contrat"
					single-line
					solo-inverted
				>
					<v-icon slot="append" @click="search = ''">
						mdi-close
					</v-icon>
				</v-text-field>
			</v-col>
		</v-row>

		<v-card>
			<v-data-table
				:headers="headers"
				:items="contractsList"
				:search="search"
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
					<StatusLabel :status="item.status"/>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import {mapState} from "vuex";
import DateMixin from "@/mixins/date";
import {Component, Mixins} from "vue-property-decorator";
import {Contract, Pagination} from "@/types";

@Component({
	computed: {
		...mapState('contracts', [
			'contracts'
		])
	}
})
export default class ContractsList extends Mixins(DateMixin) {
	contracts!: Pagination<Contract>
	search = ""
	headers = [
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
	]
	contractsList: Array<any> = []

	async mounted() {
		try {
			// Update
			await this.$store.dispatch("contracts/fetch");

			// Empty the list
			this.contractsList = [];

			// Set list
			for (const contract of this.contracts.items) {
				const customer = contract.customer!;

				this.contractsList.push({
					name: `${customer.firstName} ${customer.lastName} ${customer.company}`,
					dateCreate: this.getString(new Date(contract.createdAt!)),
					...contract,
				});
			}
		} catch {
			await this.$store.dispatch("snackbar/push", {
				message: "Impossible de charger les contrats",
				icon: "alert",
				color: "error"
			})
		}
	}

	open(item: Contract) {
		this.$router.push(`/contracts/${item.id}`);
	}

	searchByDate(lastYear: boolean) {
		let date = new Date();

		if (lastYear) {
			date.setFullYear(date.getFullYear() - 1);
		}

		this.search = this.getMMYYYY(date);
	}
}
</script>
