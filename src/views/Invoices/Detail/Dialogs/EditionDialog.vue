<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title>Mettre à jour</v-card-title>

			<v-alert
				dense
				type="error"
				class="ma-4"
				transition="slide-y-transition"
				v-model="error"
			>Impossible de mettre à jour le fichier.</v-alert>

			<v-card-text>
				<v-row>
					<v-col>
						<h4>Type de fichier</h4>

						<v-radio-group mandatory v-model="item.type">
							<v-radio value="invoice" label="Facture" />
							<v-radio value="quote" label="Devis" />
						</v-radio-group>
					</v-col>

					<v-col>
						<h4>Statut</h4>

						<v-radio-group mandatory v-model="item.status">
							<v-radio value="paid" label="Payé" />
							<v-radio value="waiting" label="En attente" />
							<v-radio value="canceled" label="Annulé" />
						</v-radio-group>
					</v-col>
				</v-row>

				<v-text-field
					prepend-icon="mdi-pound"
					label="Numéro du fichier"
					v-model.trim="item.number"
					append-icon="mdi-close"
					@click:append="item.number = ''"
				/>

				<v-row>
					<v-col>
						<v-text-field
							label="Acompte"
							v-model.number="item.deposit"
							prepend-icon="mdi-bank-transfer"
							suffix="€"
							append-icon="mdi-close"
							@click:append="item.deposit = 0"
						/>

						<v-text-field
							label="Date d'échéance"
							v-model.trim="item.dueDate"
							prepend-icon="mdi-calendar-clock"
							placeholder="JJ/MM/AAAA"
							append-icon="mdi-close"
							@click:append="item.dueDate = ''"
						/>
					</v-col>
					<v-col>
						<v-text-field
							label="Remise commerciale"
							prepend-icon="mdi-label-percent"
							v-model.number="item.promotion"
							suffix="%"
							append-icon="mdi-close"
							@click:append="item.promotion = 0"
						/>
					</v-col>
				</v-row>

				<v-textarea
					label="Informations complémentaires"
					prepend-icon="mdi-information"
					v-model.trim="item.additional_text"
				/>
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn text color="orange" @click="show = !show">Annuler</v-btn>

				<v-btn text color="green" @click="save">Mettre à jour</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Invoice } from "@/types";
import { Component, PropSync, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class EditInvoice extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;
	@PropSync("invoice", { type: Object }) readonly item!: Invoice;

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