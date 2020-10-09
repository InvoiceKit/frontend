<template>
	<v-dialog v-model="show" max-width="450px" @click:outside="show = !show">
		<v-card>
			<v-card-title> Ajouter une adresse</v-card-title>

			<v-card-text>
				<v-text-field
					v-model.trim="payload.line"
					label="Adresse"
					prepend-icon="mdi-map-marker"
				/>

				<v-row>
					<v-col>
						<v-text-field
							v-model.trim="payload.zip"
							label="Code postal"
							prepend-icon="mdi-city-variant"
						/>
					</v-col>

					<v-col>
						<v-text-field
							v-model.trim="payload.city"
							label="Ville"
						/>
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-actions>
				<v-spacer/>

				<v-btn color="red" text @click="show = !show">Annuler</v-btn>

				<v-btn color="green" text @click="save">Ajouter</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import "reflect-metadata";
import {Component, PropSync, Vue, Watch} from "vue-property-decorator";
import {Address} from "@/types";

const defaultPayload: Address = {
	line: "",
	zip: "",
	city: "",
};

@Component
export default class AddAddress extends Vue {
	@PropSync("display", {type: Boolean}) show!: boolean;

	payload: Address = defaultPayload;

	@Watch("display")
	reset() {
		// Reset payload
		this.payload = Object.assign({}, defaultPayload);
	}

	/**
	 * Add an address
	 */
	async save() {
		try {
			// Push address
			await this.$store.dispatch("customers/addAddress", {
				params: {
					id: this.$route.params.id,
				},
				data: this.payload,
			});

			await this.$store.dispatch("snackbar/push", {
				message: "L'adresse a bien été sauvergardée",
				icon: "check",
				color: "success"
			})

			// Close
			this.show = false;

			this.$nextTick(async () => {
				// Get customer details
				await this.$store.dispatch("customers/get", {
					params: {
						id: this.$route.params.id,
					},
				});
			});
		} catch {
			await this.$store.dispatch("snackbar/push", {
				message: "Impossible d'ajouter l'adresse",
				icon: "alert",
				color: "error"
			})
		}
	}
}
</script>
