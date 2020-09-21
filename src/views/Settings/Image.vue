<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="green" icon="image-filter-hdr" />Bannière
			d'entreprise
		</v-card-title>

		<v-card-text>
			<v-file-input
				show-size
				label="Image bannière (idéalement 1218x144 pixels)"
				@change="save"
			></v-file-input>
		</v-card-text>

		<v-snackbar v-model="success" text timeout="3000" color="success"
			>Les paramètres ont bien étés enregistrés.</v-snackbar
		>

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
import Axios, { AxiosRequestConfig } from "axios";
import FormData from "form-data";

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
	@Watch("team", { deep: true, immediate: true })
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

			this.$store.dispatch("auth/setImage", {
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
