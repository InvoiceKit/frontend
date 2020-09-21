<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="red" icon="domain" />

			Champs pour les factures
		</v-card-title>

		<v-simple-table>
			<thead>
				<tr>
					<th>Champ</th>
					<th width="50px">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(field, idx) in fields" :key="idx">
					<td>{{ field }}</td>
					<td>
						<v-btn icon @click="deleteField(idx)">
							<v-icon>mdi-delete</v-icon>
						</v-btn>
					</td>
				</tr>
			</tbody>
		</v-simple-table>

		<v-card-actions>
			<v-btn color="orange" text @click="add">Ajouter un champ</v-btn>

			<v-spacer></v-spacer>

			<v-btn color="green" text @click="save">Sauvegarder</v-btn>
		</v-card-actions>

		<v-snackbar v-model="success" text timeout="3000" color="success">
			Les paramètres ont bien étés enregistrés.
		</v-snackbar>

		<v-snackbar v-model="error" text timeout="3000" color="danger">
			Impossible de sauvegarder, vérifiez que les champs sont bien
			remplis.
		</v-snackbar>
	</v-card>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Team } from "@/types";

@Component({
	computed: {
		...mapState("auth", ["team"]),
	},
})
export default class Fields extends Vue {
	fields?: string[] = [];
	success = false;
	error = false;

	/**
	 * Load team fields
	 *
	 * @param { Team } team
	 */
	@Watch("team", { deep: true, immediate: true })
	load(team: Team) {
		this.fields = team.fields;
	}

	/**
	 * Add a field
	 */
	add() {
		// Get field
		const field = prompt("Champ à ajouter");

		// Push
		if (field) this.fields?.push(field);
	}

	/**
	 * Delete a field
	 * @param { number } idx
	 */
	deleteField(idx: number) {
		// Delete field
		this.fields?.splice(idx, 1);
	}

	/**
	 * Save and reload team profile
	 */
	async save() {
		try {
			await this.$store.dispatch("auth/save", {
				data: {
					fields: this.fields,
				},
			});

			this.success = true;

			await this.$store.dispatch("auth/get");
		} catch {
			this.error = true;
		}
	}
}
</script>
