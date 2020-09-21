<template>
	<v-navigation-drawer app permanent>
		<template v-slot:prepend>
			<div class="pre-image" v-if="team.id && showImage">
				<img :src="`${host}/teams/${team.id}/image`" class="image" @error="showImage = false" />
			</div>
			<v-list-item two-line>
				<v-list-item-content>
					<v-list-item-title>{{ team.name }}</v-list-item-title>
					<v-list-item-subtitle>Connecté</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</template>

		<v-divider />

		<v-list nav>
			<v-list-item v-for="item in items" link :to="item.link" :key="item.title">
				<v-list-item-icon>
					<v-icon>mdi-{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.name }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<template #append>
			<v-btn @click="logout" tile text block large color="red">Déconnexion</v-btn>
		</template>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue, PropSync } from "vue-property-decorator";
import API from "@/store/api";

@Component({
	computed: {
		...mapState("auth", ["team"]),
		host: () => API.host,
	},
})
export default class Sidebar extends Vue {
	showImage = true;

	items = [
		{
			link: "/dashboard",
			icon: "home",
			name: "Tableau de bord",
		},
		{
			link: "/invoices",
			icon: "receipt",
			name: "Factures",
		},
		{
			link: "/contracts",
			icon: "text-box-outline",
			name: "Contrats d'entretien",
		},
		{
			link: "/customers",
			icon: "account-details",
			name: "Clients",
		},
		{
			link: "/settings",
			icon: "cog",
			name: "Paramètres",
		},
	];

	logout() {
		localStorage.removeItem("token");

		window.location.reload();
	}
}
</script>

<style scoped>
.image {
	width: calc(100% - 5% * 2.25);
}

.pre-image {
	width: 300px;
	padding: 5%;
	background: #fff;
}
</style>
