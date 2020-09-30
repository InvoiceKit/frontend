<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title
				>{{ this.editedItem ? "Mettre à jour" : "Ajouter" }} un
				client</v-card-title
			>

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
							prepend-icon="mdi-account"
							v-model.trim="payload.firstName"
						/>
					</v-col>
					<v-col>
						<v-text-field
							label="Nom"
							v-model.trim="payload.lastName"
						/>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							label="Société"
							prepend-icon="mdi-domain"
							v-model.trim="payload.company"
						/>
					</v-col>

					<v-col>
						<v-text-field
							label="Email"
							prepend-icon="mdi-email"
							v-model.trim="payload.email"
						/>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							label="Téléphone"
							prepend-icon="mdi-phone"
							v-model.trim="payload.phone"
						/>
					</v-col>

					<v-col></v-col>
				</v-row>
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn text color="red" @click="show = !show">Annuler</v-btn>

				<v-btn text color="green" @click="save">{{
					this.editedItem ? "Mettre à jour " : "Ajouter"
				}}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Customer } from "@/types";
import { Component, PropSync, Prop, Vue, Watch } from "vue-property-decorator";

const defaultPayload: Customer = {
	firstName: "",
	lastName: "",
	company: "",
	email: "",
	phone: "",
};

@Component
export default class AddCustomer extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;
	@Prop(Object) readonly editedItem: Customer | undefined;

	payload: Customer = defaultPayload;

	error = false;

	@Watch("editedItem")
	change() {
		if (this.editedItem) {
			this.payload = this.editedItem;
		}
	}

	@Watch("display")
	reset() {
		if (!this.editedItem) {
			this.payload = Object.assign({}, defaultPayload);
		}
	}

	async save() {
		try {
			if (this.editedItem) {
				await this.$store.dispatch("customers/update", {
					params: {
						id: this.editedItem.id,
					},
					data: this.payload,
				});
			} else {
				await this.$store.dispatch("customers/add", {
					data: this.payload,
				});
			}

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
