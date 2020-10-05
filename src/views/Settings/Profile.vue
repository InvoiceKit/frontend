<template>
	<v-card>
		<v-card-title> Paramètres</v-card-title>

		<v-card-text>
			<v-row>
				<v-col>
					<v-text-field
						v-model="payload.name"
						label="Nom de la team"
						placeholder="Exemple: InvoiceKit"
					></v-text-field>

					<v-text-field
						v-model="payload.company"
						label="Nom juridique de l'entreprise"
						placeholder="Exemple: SAS InvoiceKit"
					></v-text-field>

					<v-text-field
						v-model="payload.zip"
						label="Code postal du siège social"
						placeholder="Exemple: 59000"
					></v-text-field>
				</v-col>

				<v-col>
					<v-text-field
						v-model="payload.website"
						label="Site internet de l'entreprise"
						placeholder="Exemple: https://www.invoicekit.io"
					></v-text-field>

					<v-text-field
						v-model="payload.address"
						label="Adresse du siège social"
						placeholder="Exemple: 12 rue des lilas"
					></v-text-field>

					<v-text-field
						v-model="payload.city"
						label="Ville du siège social"
						placeholder="Exemple: Lille"
					></v-text-field>
				</v-col>
			</v-row>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>

			<v-btn color="green" text @click="save">Sauvegarder</v-btn>
		</v-card-actions>

		<v-snackbar v-model="success" color="success" text timeout="3000"
		>Les paramètres ont bien étés enregistrés.
		</v-snackbar
		>

		<v-snackbar v-model="error" color="danger" text timeout="3000">
			Impossible de sauvegarder, vérifiez que les champs sont bien
			remplis.
		</v-snackbar>
	</v-card>
</template>

<script lang="ts">
import {mapState} from "vuex";
import {Component, Vue, Watch} from "vue-property-decorator";
import {Team} from "@/types";

@Component({
	computed: {
		...mapState("auth", ["team"]),
	},
})
export default class Profile extends Vue {
	payload?: Team;
	success = false;
	error = false;

	/**
	 * Load team details
	 *
	 * @param { Team } team
	 */
	@Watch("team", {deep: true, immediate: true})
	load(team: Team) {
		if (team) {
			this.payload = team;
		}
	}

	/**
	 * Save and reload team profile
	 */
	async save() {
		try {
			await this.$store.dispatch("auth/save", {
				params: {
					id: this.payload?.id,
				},
				data: this.payload,
			});

			this.success = true;
		} catch {
			this.error = true;
		}
	}
}
</script>
