<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title>{{ this.editedItem ? "Mettre à jour" : "Ajouter" }} un objet</v-card-title>

			<v-alert
				dense
				type="error"
				class="ma-4"
				transition="slide-y-transition"
				v-model="error"
			>
				Impossible d'ajouter l'objet
			</v-alert>

			<v-card-text>
				<v-textarea label="Description" v-model.trim="payload.name" prepend-icon="mdi-rename-box" />

				<v-row>
					<v-col>
						<v-text-field
							label="Prix H.T."
							prepend-icon="mdi-currency-eur"
							v-model.number="payload.price"
							suffix="€"
						/>
					</v-col>

					<v-col>
						<v-text-field
							label="T.V.A."
							prepend-icon="mdi-label-percent"
							v-model.number="payload.vat"
							suffix="%"
						/>
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn text color="red" @click="show = !show">Annuler</v-btn>

				<v-btn text color="green" @click="save">{{ this.editedItem ? "Mettre à jour " : "Ajouter" }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Field } from '@/types/field';
import { Component, PropSync, Prop, Vue, Watch } from "vue-property-decorator";

const defaultPayload: Field = {
	name: "",
	price: 0,
	vat: 10
};

@Component
export default class AddCustomer extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;
	@Prop(Object) readonly editedItem: Field | undefined
	@Prop(String) readonly id: String | undefined

	payload: Field = defaultPayload

	error = false;

	@Watch('editedItem')
	change() {
		if (this.editedItem) {
			this.payload = this.editedItem
		}
	}

	@Watch('display')
	reset() {
		if (!this.editedItem) {
			this.payload = Object.assign({}, defaultPayload)
		}
	}

	async save() {
		try {
			if (this.editedItem) {
				await this.$store.dispatch('invoices/updateField', {
					params: {
						id: this.id,
						field: this.editedItem.id
					},
					data: this.payload
				})
			} else {
				await this.$store.dispatch("invoices/addField", {
					params: {
						id: this.id
					},
					data: this.payload
				});
			}

			this.show = false;

			this.$nextTick(async () => {
				await this.$store.dispatch("invoices/get", {
					params: {
						id: this.id
					}
				});
			});
		} catch {
			this.error = true;
		}
	}
}
</script>