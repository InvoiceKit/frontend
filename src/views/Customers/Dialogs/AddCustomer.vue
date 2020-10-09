<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title
			>{{ this.editedItem ? "Mettre à jour" : "Ajouter" }} un
				client
			</v-card-title
			>

			<v-card-text>
				<v-row>
					<v-col>
						<v-text-field
							v-model.trim="payload.firstName"
							label="Prénom"
							prepend-icon="mdi-account"
						/>
					</v-col>
					<v-col>
						<v-text-field
							v-model.trim="payload.lastName"
							label="Nom"
						/>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model.trim="payload.company"
							label="Société"
							prepend-icon="mdi-domain"
						/>
					</v-col>

					<v-col>
						<v-text-field
							v-model.trim="payload.email"
							label="Email"
							prepend-icon="mdi-email"
						/>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model.trim="payload.phone"
							label="Téléphone"
							prepend-icon="mdi-phone"
						/>
					</v-col>

					<v-col></v-col>
				</v-row>
			</v-card-text>

			<v-card-actions>
				<v-spacer/>

				<v-btn color="red" text @click="show = !show">Annuler</v-btn>

				<v-btn color="green" text @click="save">{{
						this.editedItem ? "Mettre à jour " : "Ajouter"
					}}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import {Customer} from "@/types";
import {Component, Prop, PropSync, Vue, Watch} from "vue-property-decorator";

const defaultPayload: Customer = {
	firstName: "",
	lastName: "",
	company: "",
	email: "",
	phone: "",
};

@Component
export default class AddCustomer extends Vue {
	@PropSync("display", {type: Boolean}) show!: boolean;
	@Prop(Object) readonly editedItem: Customer | undefined;

	payload: Customer = defaultPayload;

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

				await this.$store.dispatch("snackbar/push", {
					message: "Le client a bien été mis à jour",
					icon: "check",
					color: "success"
				})
			} else {
				await this.$store.dispatch("customers/add", {
					data: this.payload,
				});

				await this.$store.dispatch("snackbar/push", {
					message: "Le client a bien été ajouté",
					icon: "check",
					color: "success"
				})
			}
			this.show = false;

			this.$nextTick(async () => {
				await this.$store.dispatch("customers/fetch");
			});
		} catch {
			await this.$store.dispatch("snackbar/push", {
				message: "Impossible d'ajouter le client",
				icon: "alert",
				color: "error"
			})
		}
	}
}
</script>
