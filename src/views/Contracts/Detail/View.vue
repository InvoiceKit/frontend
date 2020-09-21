<template>
	<div id="contract">
		<v-card class="mt-6">
			<v-card-title>
				<CardIcon color="green" icon="text-box-outline" />Contrat
				d'entretien
			</v-card-title>

			<v-simple-table>
				<tbody>
					<tr>
						<td>Statut</td>
						<td>
							<StatusLabel :status="contract.status" />
						</td>
					</tr>

					<tr>
						<td>Type de chaudière</td>
						<td>{{ contract.type }}</td>
					</tr>

					<tr>
						<td>Numéro de série</td>
						<td>{{ contract.serial }}</td>
					</tr>

					<tr>
						<td>Date de signature du contract</td>
						<td>{{ contract.date || "N/A" }}</td>
					</tr>

					<tr>
						<td>Client</td>
						<td>
							<span
								v-if="
									contract.customer.firstName ||
									contract.customer.lastName
								"
							>
								{{ contract.customer.firstName }}
								{{ contract.customer.lastName }}
								<span v-if="contract.customer.company"
									>&nbsp;({{
										contract.customer.company
									}})</span
								>
							</span>

							<span v-else>{{ contract.customer.company }}</span>

							<v-btn
								icon
								:to="`/customers/${contract.customer.id}`"
							>
								<v-icon>mdi-arrow-right</v-icon>
							</v-btn>
						</td>
					</tr>

					<tr>
						<td>Adresse</td>
						<td>
							{{ contract.address.line }},
							{{ contract.address.zip }},
							{{ contract.address.city }}
						</td>
					</tr>

					<tr>
						<td>Date de création</td>
						<td>
							{{
								new Date(
									contract.createdAt
								).toLocaleDateString()
							}}
						</td>
					</tr>

					<tr>
						<td>Dernière mise à jour</td>
						<td>
							{{
								new Date(
									contract.updatedAt
								).toLocaleDateString()
							}}
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</v-card>

		<br />

		<v-card v-if="contract.changes" class="mt-4">
			<v-card-title>
				<CardIcon color="indigo" icon="cube" />Changements
			</v-card-title>

			<v-data-table
				:items-per-page="-1"
				:headers="headers"
				:items="contract.changes"
			>
				<template #item.actions="{ item }">
					<v-btn icon @click="deleteItem(item)">
						<v-icon>mdi-delete</v-icon>
					</v-btn>

					<v-btn icon @click="editItem(item)">
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
				</template>
			</v-data-table>
		</v-card>

		<Sidebar />

		<AddChange
			:display.sync="editionDialog"
			:contract.sync="contract"
			:change="editedItem"
		/>
	</div>
</template>

<script lang="ts">
import Sidebar from "./Sidebar.vue";
import AddChange from "../Dialogs/AddChange.vue";
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import { mapState } from "vuex";
import { Change, Contract } from "@/types";
import { DataTableHeader } from "vuetify";

@Component({
	components: {
		Sidebar,
		AddChange,
	},

	computed: {
		...mapState("contracts", ["contract"]),
	},

	async beforeRouteEnter(to, from, next) {
		try {
			await store.dispatch("contracts/get", {
				params: {
					id: to.params.id,
				},
			});

			next();
		} catch {
			next({ path: "/contracts" });
		}
	},
})
export default class ContractView extends Vue {
	contract!: Contract;
	editedItem!: Change;
	editionDialog = false;

	headers: Array<DataTableHeader> = [
		{
			text: "Date",
			value: "date",
			width: 150,
		},
		{
			text: "Description",
			value: "description",
		},
		{
			text: "Actions",
			value: "actions",
			width: 150,
		},
	];

	async deleteItem(item: Change) {
		// Delete from fields
		let index = this.contract.changes.indexOf(item);

		if (index !== null || index > -1) {
			this.contract.changes.splice(index, 1);
		}

		// Update
		await this.$store.dispatch("contracts/update", {
			params: {
				id: this.contract.id,
			},
			data: this.contract,
		});
	}

	editItem(item: Contract) {
		this.editedItem = item;
		this.editionDialog = true;
	}
}
</script>
