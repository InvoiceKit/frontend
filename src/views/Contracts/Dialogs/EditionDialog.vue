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
				<h4 class="overline">Type de fichier</h4>

				<v-radio-group v-model="item.status" mandatory>
					<v-radio label="En cours" value="ongoing"/>
					<v-radio label="Annulé" value="canceled"/>
				</v-radio-group>

				<v-text-field
					v-model.trim="item.type"
					label="Type de chaudière"
					prepend-icon="mdi-cube"
				/>

				<v-text-field
					v-model.trim="item.serial"
					label="Numéro de série"
					prepend-icon="mdi-pound"
				/>

				<v-text-field
					v-model.trim="item.date"
					hint="JJ/MM/YYYY"
					label="Date de signature"
					prepend-icon="mdi-clock"
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
import {Contract} from "@/types";
import {Component, PropSync, Vue} from "vue-property-decorator";

@Component
export default class EditContract extends Vue {
	@PropSync("display", {type: Boolean}) show!: boolean;
	@PropSync("contract", {type: Object}) readonly item!: Contract;

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
