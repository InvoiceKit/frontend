<template>
	<v-card class="mt-10">
		<v-card-title>
			<CardIcon color="blue" icon="information"/>

			Informations
		</v-card-title>
		<v-card-text>
			Type de fichier:
			<v-radio-group v-model="syncedPayload.type">
				<v-radio label="Facture" value="invoice"/>
				<v-radio label="Devis" value="quote"/>
			</v-radio-group>

			Status de la facture
			<v-radio-group v-model="syncedPayload.status">
				<v-radio color="green" label="Payé" value="paid"/>
				<v-radio color="orange" label="En attente" value="waiting"/>
				<v-radio color="red" label="Annulée" value="canceled"/>
			</v-radio-group>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import {Invoice} from "@/types";
import {Component, PropSync, Vue} from "vue-property-decorator";

@Component
export default class InformationCard extends Vue {
	@PropSync("payload", {type: Object}) syncedPayload!: Invoice;
}
</script>
