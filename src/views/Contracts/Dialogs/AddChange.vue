<template>
	<v-dialog v-model="show" max-width="550px" @click:outside="show = !show">
		<v-card>
			<v-card-title
			>{{ change ? "Mettre à jour" : "Ajouter" }} un
				changement
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
					v-model.trim="payload.description"
					label="Description"
					prepend-icon="mdi-cube"
				/>

				<v-text-field
					v-model="payload.date"
					hint="JJ/MM/YYYY"
					label="Date du changement"
					prepend-icon="mdi-clock"
				/>
			</v-card-text>

			<v-card-actions>
				<v-spacer/>

				<v-btn color="red" text @click="show = !show">Annuler</v-btn>

				<v-btn color="green" text @click="save">{{
						change ? "Mettre à jour " : "Ajouter"
					}}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import {Change, Contract} from "@/types";
import {Component, Prop, PropSync, Vue, Watch} from "vue-property-decorator";

const defaultPayload: Change = {
	date: "",
	description: "",
};

@Component
export default class AddChange extends Vue {
	@PropSync("display", {type: Boolean}) show!: boolean;
	@PropSync("contract", {type: Object}) syncContract!: Contract;
	@Prop(Object) readonly change: Change | undefined;

	payload: Change = defaultPayload;

	error = false;

	@Watch("change")
	onLoad() {
		if (this.change) {
			this.payload = this.change;
		}
	}

	@Watch("display")
	reset() {
		if (!this.change) {
			this.payload = Object.assign({}, defaultPayload);
		}
	}

	async save() {
		if (this.change) {
			// Find index
			let index = this.syncContract.changes.indexOf(this.change);

			// Update
			this.syncContract.changes[index] = this.payload;
		} else {
			this.syncContract.changes.push(this.payload);
		}

		this.show = false;

		this.$nextTick(async () => {
			try {
				this.$store.dispatch("contracts/update", {
					params: {
						id: this.syncContract.id,
					},
					data: this.syncContract,
				});
			} catch (ex) {
				console.log(ex);
			}
		});
	}
}
</script>
