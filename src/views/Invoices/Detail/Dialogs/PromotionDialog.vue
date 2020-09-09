<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title>
				{{
					payload != null
						? "Mettre à jour la remise"
						: "Ajouter une remise"
				}}
			</v-card-title>

			<v-alert
				dense
				type="error"
				class="ma-4"
				transition="slide-y-transition"
				v-model="error"
			>
				Impossible de mettre à jour.
			</v-alert>

			<v-card-text>
				<v-text-field
					label="Remise commerciale"
					v-model.number="payload"
					suffix="%"
				/>
			</v-card-text>

			<v-card-actions>
				<v-btn
					v-if="promotion != 0 && promotion != null"
					text
					color="orange"
					@click="save(true)"
					>Supprimer la remise</v-btn
				>

				<v-spacer />

				<v-btn text color="red" @click="show = !show">Annuler</v-btn>

				<v-btn text color="green" @click="save(false)">Confirmer</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class AddCustomer extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;
	@Prop(Number) readonly promotion!: number;
	@Prop(String) readonly id!: string;

	payload: number = 0
	error = false;

	@Watch('promotion')
	onChange() {
		this.payload = this.promotion
	}

	async save(remove: boolean = false) {
		try {
			await this.$store.dispatch("invoices/update", {
				params: {
					id: this.id,
				},
				data: {
					promotion: remove ? 0 : this.payload,
				},
			});

			this.show = false;

			this.$nextTick(async () => {
				await this.$store.dispatch("invoices/get", {
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