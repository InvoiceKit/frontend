<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="orange" icon="cog" />

			Paramètres
		</v-card-title>

		<v-card-text>
			<v-row>
				<v-col>
					<v-text-field
						label="Nom de la team"
						v-model="payload.name"
						placeholder="Exemple: InvoiceKit"
						:rules="notEmpty"
					></v-text-field>

					<v-text-field
						label="Nom juridique de l'entreprise"
						placeholder="Exemple: SAS InvoiceKit"
						v-model="payload.company"
						:rules="notEmpty"
					></v-text-field>

					<v-text-field
						label="Adresse du siège social"
						placeholder="Exemple: 12 rue des lilas"
						v-model="payload.address"
						:rules="notEmpty"
					></v-text-field>
				</v-col>

				<v-col>
					<v-text-field
						label="Site internet de l'entreprise"
						placeholder="Exemple: https://www.invoicekit.io"
						v-model="payload.website"
						:rules="notEmpty"
					></v-text-field>

					<v-text-field
						label="Lien vers une image bannière"
						placeholder="Utilisé pour les factures, ex: https://example.com/image.png"
						v-model="payload.image"
						:rules="notEmpty"
					></v-text-field>

					<v-text-field
						label="Code postal et ville du siège social"
						placeholder="Exemple: 59000, Lille"
						v-model="payload.city"
						:rules="notEmpty"
					></v-text-field>
				</v-col>
			</v-row>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>

			<v-btn @click="save" text color="green">Sauvegarder</v-btn>
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
import { Team } from '@/types';

@Component({
	computed: {
		...mapState("auth", ["team"]),
	}
}) 
export default class Profile extends Vue {
	payload = {}
	notEmpty = [(value: String) => !!value || "Obligatoire."]
	success = false
	error = false

	/**
	 * Load team details
	 * 
	 * @param { Team } team
	 */
	@Watch('team', { deep: true, immediate: true })
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
				data: this.payload,
			});

			this.success = true;

			await this.$store.dispatch("auth/get");
		} catch {
			this.error = true;
		}
	}
}
</script>