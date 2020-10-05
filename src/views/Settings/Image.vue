<template>
	<v-card>
		<v-card-title>Bannière d'entreprise</v-card-title>

		<v-card-text>
			<v-file-input
				label="Image bannière (idéalement 1218x144 pixels)"
				show-size
				@change="save"
			></v-file-input>
		</v-card-text>

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
export default class ImageSettings extends Vue {
	success = false;
	error = false;
	payload?: Team;

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
	async save(event: any) {
		const reader = new FileReader();
		reader.readAsDataURL(event);
		reader.onload = async (e: any) => {
			const image = e.target.result.replace("data:image/png;base64,", "");

			await this.$store.dispatch("auth/setImage", {
				params: {
					id: this.payload?.id,
				},
				data: {
					image: image,
				},
			});
		};
	}
}
</script>
