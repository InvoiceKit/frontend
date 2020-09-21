<template>
	<v-navigation-drawer right permanent app>
		<v-list nav>
			<v-list-item @click="showEdit = true">
				<v-list-item-icon>
					<v-icon>mdi-file-cog</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>Modifier le contrat</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item @click="showChange = true">
				<v-list-item-icon>
					<v-icon>mdi-plus</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>Ajouter un changement</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-divider />

		<v-list nav>
			<v-list-item @click="remove">
				<v-list-item-icon>
					<v-icon>mdi-delete</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>Supprimer le contrat</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item link exact to="/contracts">
				<v-list-item-icon>
					<v-icon>mdi-close</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>Fermer</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<edition-dialog :display.sync="showEdit" :contract.sync="contract" />
		<add-change :display.sync="showChange" :contract.sync="contract" />
	</v-navigation-drawer>
</template>

<script lang="ts">
import { Contract } from "@/types";
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";

import EditionDialog from "../Dialogs/EditionDialog.vue";
import AddChange from "../Dialogs/AddChange.vue";

@Component({
	components: {
		EditionDialog,
		AddChange,
	},

	computed: {
		...mapState("contracts", ["contract"]),
	},
})
export default class ContractSidebar extends Vue {
	contract!: Contract;

	showEdit = false;
	showChange = false;

	async remove() {
		if (!confirm("Êtes-vous sur de vouloir supprimer ce contrat ?")) {
			return;
		}

		try {
			await this.$store.dispatch("contracts/delete", {
				params: {
					id: this.contract.id,
				},
			});

			this.$router.push("/contracts");
		} catch (ex) {
			console.log(ex);
		}
	}
}
</script>
