<template>
	<v-container>
		<v-row class="mb-4">
			<v-col>
				<p class="header">Contrat d'entretien</p>
			</v-col>

			<v-spacer />

			<v-col cols="4" align="right">
				<v-btn to="/contracts" exact icon large>
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-btn
					@click="showEdit = true"
					icon
					large
					color="orange darken-1"
				>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>

				<v-btn @click="remove" icon large color="red darken-1">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-card>
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
								<span v-if="contract.customer.company">
									&nbsp;({{ contract.customer.company }})
								</span>
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
							{{ getString(new Date(contract.createdAt)) }}
						</td>
					</tr>

					<tr>
						<td>Dernière mise à jour</td>
						<td>
							{{ getString(new Date(contract.updatedAt)) }}
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</v-card>

		<br />

		<v-card v-if="contract.changes">
			<v-card-title>
				Changements

				<v-spacer />

				<v-btn @click="addItem" text large color="blue darken-1">
					<v-icon left>mdi-plus</v-icon>
					Ajouter un changement
				</v-btn>
			</v-card-title>

			<v-data-table
				:items-per-page="-1"
				:headers="headers"
				:items="contract.changes"
				no-data-text="Aucun changements enregistrés"
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

		<edition-dialog :display.sync="showEdit" :contract.sync="contract" />
		<AddChange
			:display.sync="editionDialog"
			:contract.sync="contract"
			:change="editedItem"
		/>
	</v-container>
</template>

<script lang="ts">
import AddChange from "../Dialogs/AddChange.vue";
import EditionDialog from "../Dialogs/EditionDialog.vue";
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import { mapState } from "vuex";
import { Change, Contract } from "@/types";
import { DataTableHeader } from "vuetify";
import date from "@/mixins/date";

@Component({
	components: {
		EditionDialog,
		AddChange,
	},

	mixins: [date],

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
	editedItem?: Change = {
		description: "",
		date: "",
	};
	editionDialog = false;
	showEdit = false;

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

	addItem() {
		this.editedItem = undefined;
		this.editionDialog = true;
	}

	async remove() {
		if (!confirm("Êtes-vous sur de vouloir supprimer ce contrat ?")) {
			return;
		}

		try {
			await this.$store.dispatch("contracts/delete", {
				params: {
					id: this.contract.id,
				},
			});

			this.$router.push("/contracts");
		} catch (ex) {
			console.log(ex);
		}
	}
}
</script>
