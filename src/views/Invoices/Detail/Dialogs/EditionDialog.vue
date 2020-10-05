<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title>Mettre à jour</v-card-title>

			<v-alert
				v-model="error"
				class="ma-4"
				dense
				transition="slide-y-transition"
				type="error"
			>Impossible de mettre à jour le fichier.
			</v-alert
			>

			<v-card-text>
				<v-row>
					<v-col>
						<h4>Type de fichier</h4>

						<v-radio-group v-model="item.type" mandatory>
							<v-radio label="Facture" value="invoice"/>
							<v-radio label="Devis" value="quote"/>
						</v-radio-group>
					</v-col>

					<v-col>
						<h4>Statut</h4>

						<v-radio-group v-model="item.status" mandatory>
							<v-radio label="Payé" value="paid"/>
							<v-radio label="En attente" value="waiting"/>
							<v-radio label="Annulé" value="canceled"/>
						</v-radio-group>
					</v-col>
				</v-row>

				<v-text-field
					v-model.trim="item.number"
					append-icon="mdi-close"
					label="Numéro du fichier"
					prepend-icon="mdi-pound"
					@click:append="item.number = ''"
				/>

				<v-row>
					<v-col>
						<v-text-field
							v-model.number="item.deposit"
							append-icon="mdi-close"
							label="Acompte"
							prepend-icon="mdi-bank-transfer"
							suffix="€"
							@click:append="item.deposit = 0"
						/>

						<v-text-field
							v-model.trim="item.dueDate"
							append-icon="mdi-close"
							label="Date d'échéance"
							placeholder="JJ/MM/AAAA"
							prepend-icon="mdi-calendar-clock"
							@click:append="item.dueDate = ''"
						/>
					</v-col>
					<v-col>
						<v-text-field
							v-model.number="item.promotion"
							append-icon="mdi-close"
							label="Remise commerciale"
							prepend-icon="mdi-label-percent"
							suffix="%"
							@click:append="item.promotion = 0"
						/>
					</v-col>
				</v-row>

				<v-textarea
					v-model.trim="item.additional_text"
					label="Informations complémentaires"
					prepend-icon="mdi-information"
				/>
			</v-card-text>

			<v-card-actions>
				<v-spacer/>

				<v-btn color="orange" text @click="show = !show">Annuler</v-btn>

				<v-btn color="green" text @click="save">Mettre à jour</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import {Invoice} from "@/types";
import {Component, PropSync, Vue} from "vue-property-decorator";

@Component
export default class EditInvoice extends Vue {
	@PropSync("display", {type: Boolean}) show!: boolean;
	@PropSync("invoice", {type: Object}) readonly item!: Invoice;

	error = false;

	async save() {
		try {
			await this.$store.dispatch("invoices/update", {
				params: {
					id: this.item.id,
				},
				data: this.item,
			});

			this.show = false;

			this.$nextTick(async () => {
				await this.$store.dispatch("invoices/get", {
					params: {
						id: this.item.id,
					},
				});
			});
		} catch {
			this.error = true;
		}
	}
}
</script>
