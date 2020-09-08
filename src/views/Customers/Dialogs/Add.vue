<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title>Ajouter un client</v-card-title>

			<v-alert
				dense
				type="error"
				class="ma-4"
				transition="slide-y-transition"
				v-model="error"
			>
				Impossible d'ajouter le client.
			</v-alert>

			<v-card-text>
				<v-row>
					<v-col>
						<v-text-field
							label="Prénom"
							v-model.trim="payload.firstName"
						/>

						<v-text-field
							label="Société"
							v-model.trim="payload.company"
						/>

						<v-text-field
							label="Email"
							v-model.trim="payload.email"
						/>
					</v-col>

					<v-col>
						<v-text-field
							label="Nom"
							v-model.trim="payload.lastName"
						/>

						<v-text-field
							label="Téléphone"
							v-model.trim="payload.phone"
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
import { Customer } from "@/types";
import { Component, PropSync, Vue } from "vue-property-decorator";

@Component
export default class AddDialog extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;

	payload: Customer = {
		firstName: "",
		lastName: "",
		company: "",
		email: "",
		phone: "",
	};
	error = false;

	async save() {
		try {
			await this.$store.dispatch("customers/add", {
				data: this.payload,
			});

			this.show = false;

			this.$nextTick(async () => {
				await this.$store.dispatch("customers/fetch");
			});
		} catch {
			this.error = true;
		}
	}
}
</script>