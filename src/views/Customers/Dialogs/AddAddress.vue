<template>
	<v-dialog v-model="show" @click:outside="show = !show" max-width="450px">
		<v-card>
			<v-card-title> Ajouter une adresse </v-card-title>

			<v-alert
				dense
				type="error"
				class="ma-4"
				transition="slide-y-transition"
				v-model="error"
			>
				Impossible d'ajouter l'adresse.
			</v-alert>

			<v-card-text>
				<v-text-field
					label="Adresse"
					prepend-icon="mdi-map-marker"
					v-model.trim="payload.line"
				/>

				<v-row>
					<v-col>
						<v-text-field
							label="Code postal"
							prepend-icon="mdi-city-variant"
							v-model.trim="payload.zip"
						/>
					</v-col>

					<v-col>
						<v-text-field
							label="Ville"
							v-model.trim="payload.city"
						/>
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn text color="red" @click="show = !show">Annuler</v-btn>

				<v-btn text color="green" @click="save">Ajouter</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import { Address } from "@/types";

const defaultPayload: Address = {
	line: "",
	zip: "",
	city: "",
};

@Component
export default class AddAddress extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;

	payload: Address = defaultPayload;

	error = false;

	@Watch("display")
	reset() {
		// Reset payload
		this.payload = Object.assign({}, defaultPayload);
		this.error = false;
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
			this.error = true;
		}
	}
}
</script>