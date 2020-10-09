<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title
			>{{ this.field ? "Mettre à jour" : "Ajouter" }} un
				objet
			</v-card-title
			>

			<v-alert
				v-model="error"
				class="ma-4"
				dense
				transition="slide-y-transition"
				type="error"
			>Impossible d'ajouter ou de mettre à jour l'objet.
			</v-alert
			>

			<v-card-text>
				<v-textarea
					v-model.trim="payload.name"
					label="Description"
					prepend-inner-icon="mdi-cube"
				/>

				<v-row>
					<v-col>
						<v-text-field
							v-model.number="payload.price"
							label="Prix H.T."
							suffix="€"
						/>
					</v-col>

					<v-col>
						<v-text-field
							v-model.number="payload.vat"
							label="TVA"
							suffix="%"
						/>
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-actions>
				<v-spacer/>

				<v-btn color="red" text @click="show = !show">Annuler</v-btn>

				<v-btn color="green" text @click="save">{{
						this.field ? "Mettre à jour " : "Ajouter"
					}}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import {Field, Invoice} from "@/types";
import {Component, Prop, PropSync, Vue, Watch} from "vue-property-decorator";

const defaultPayload: Field = {
	name: "",
	price: 0,
	vat: 10,
};

@Component
export default class AddField extends Vue {
	@PropSync("display", {type: Boolean}) show!: boolean;
	@PropSync("invoice", {type: Object}) syncInvoice!: Invoice;
	@Prop(Object) readonly field: Field | undefined;

	payload: Field = defaultPayload;

	error = false;

	@Watch("field")
	change() {
		if (this.field) {
			this.payload = this.field;

			// Fix line-break
			this.payload.name = this.payload.name.split("<br />").join("\n");
		}
	}

	@Watch("display")
	reset() {
		if (!this.field) {
			this.payload = Object.assign({}, defaultPayload);
		}
	}

	async save() {
		// Add line-break
		this.payload.name = this.payload.name.split("\n").join("<br />");

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
				await this.$store.dispatch("invoices/update", {
					params: {
						id: this.syncInvoice.id,
					},
					data: this.syncInvoice,
				});

				await this.$store.dispatch("snackbar/push", {
					message: "La facture a été mise à jour",
					icon: "check",
					color: "success"
				})
			} catch {
				await this.$store.dispatch("snackbar/push", {
					message: "Impossible de mettre à jour la facture",
					icon: "alert",
					color: "error"
				})
			}
		});
	}
}
</script>
