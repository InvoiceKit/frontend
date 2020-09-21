<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title
				>{{ this.field ? "Mettre à jour" : "Ajouter" }} un
				objet</v-card-title
			>

			<v-alert
				dense
				type="error"
				class="ma-4"
				transition="slide-y-transition"
				v-model="error"
				>Impossible d'ajouter ou de mettre à jour l'objet.</v-alert
			>

			<v-card-text>
				<v-textarea
					label="Description"
					prepend-inner-icon="mdi-cube"
					v-model.trim="payload.name"
				/>

				<v-row>
					<v-col>
						<v-text-field
							label="Prix H.T."
							suffix="€"
							v-model.number="payload.price"
						/>
					</v-col>

					<v-col>
						<v-text-field
							label="TVA"
							suffix="%"
							v-model.number="payload.vat"
						/>
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn text color="red" @click="show = !show">Annuler</v-btn>

				<v-btn text color="green" @click="save">{{
					this.field ? "Mettre à jour " : "Ajouter"
				}}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Field, Invoice } from "@/types";
import { Component, PropSync, Prop, Vue, Watch } from "vue-property-decorator";

const defaultPayload: Field = {
	name: "",
	price: 0,
	vat: 10,
};

@Component
export default class AddField extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;
	@PropSync("invoice", { type: Object }) syncInvoice!: Invoice;
	@Prop(Object) readonly field: Field | undefined;

	payload: Field = defaultPayload;

	error = false;

	@Watch("field")
	change() {
		if (this.field) {
			this.payload = this.field;
		}
	}

	@Watch("display")
	reset() {
		if (!this.field) {
			this.payload = Object.assign({}, defaultPayload);
		}
	}

	async save() {
		if (this.field) {
			// Find index
			let index = this.syncInvoice.fields.indexOf(this.field);

			// Update
			this.syncInvoice.fields[index] = this.payload;
		} else {
			this.syncInvoice.fields.push(this.payload);
		}

		this.show = false;

		this.$nextTick(async () => {
			try {
				this.$store.dispatch("invoices/update", {
					params: {
						id: this.syncInvoice.id,
					},
					data: this.syncInvoice,
				});
			} catch (ex) {
				console.log(ex);
			}
		});
	}
}
</script>
