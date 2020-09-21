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
				>Impossible de mettre à jour le fichier.</v-alert
			>

			<v-card-text>
				<h4 class="overline">Type de fichier</h4>

				<v-radio-group mandatory v-model="item.status">
					<v-radio value="ongoing" label="En cours" />
					<v-radio value="canceled" label="Annulé" />
				</v-radio-group>

				<v-text-field
					prepend-icon="mdi-cube"
					v-model.trim="item.type"
					label="Type de chaudière"
				/>

				<v-text-field
					prepend-icon="mdi-pound"
					v-model.trim="item.serial"
					label="Numéro de série"
				/>

				<v-text-field
					prepend-icon="mdi-clock"
					v-model.trim="item.date"
					label="Date de signature"
					hint="JJ/MM/YYYY"
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
import { Contract } from "@/types";
import { Component, PropSync, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class EditContract extends Vue {
	@PropSync("display", { type: Boolean }) show!: boolean;
	@PropSync("contract", { type: Object }) readonly item!: Contract;

	error = false;

	async save() {
		try {
			await this.$store.dispatch("contracts/update", {
				params: {
					id: this.item.id,
				},
				data: this.item,
			});

			this.show = false;
		} catch {
			this.error = true;
		}
	}
}
</script>
