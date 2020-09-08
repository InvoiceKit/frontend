<template>
	<v-dialog v-model="show" @click:outside="show = !show" max-width="450px">
		<v-card>
			<v-card-title>Ajouter une adresse</v-card-title>

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
					prepend-inner-icon="mdi-map-marker"
					v-model.trim="payload.line"
				/>

				<v-row>
					<v-col>
						<v-text-field
							label="Ville"
							prepend-inner-icon="mdi-city-variant"
							v-model.trim="payload.city"
						/>
					</v-col>
					<v-col>
						<v-text-field
							label="Code postal"
							v-model.trim="payload.zip"
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
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { Address } from "@/types";

@Component
export default class AddAddress extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;
	@Prop(String) readonly id!: string;

	payload: Address = {
		line: "",
		zip: "",
		city: "",
	};

	error = false;

	async save() {
		try {
			await this.$store.dispatch("customers/addAddress", {
				params: {
					id: this.id,
				},
				data: this.payload,
			});

			this.show = false;

			this.$nextTick(async () => {
				await this.$store.dispatch("customers/get", {
					params: {
						id: this.id,
					},
				});
			});
		} catch {
			this.error = true;
		}
	}
}
</script>