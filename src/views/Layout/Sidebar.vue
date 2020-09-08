<template>
	<v-navigation-drawer app permanent>
		<template v-slot:prepend>
			<v-list-item two-line>
				<v-list-item-content>
					<v-list-item-title>{{ team.name }}</v-list-item-title>
					<v-list-item-subtitle>Connecté</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</template>

		<v-divider />

		<v-list nav>
			<v-list-item
				v-for="item in items"
				link
				:to="item.link"
				:key="item.title"
			>
				<v-list-item-icon>
					<v-icon>mdi-{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.name }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue, PropSync } from "vue-property-decorator";

@Component({
	computed: {
		...mapState("auth", ["team"]),
	},

	async mounted() {
		try {
			await this.$store.dispatch("auth/get");
		} catch {
			alert("Can't load profile data.");
		}
	},
})
export default class Sidebar extends Vue {
	items = [
		{
			link: "/dashboard",
			icon: "home",
			name: "Tableau de bord",
		},
		{
			link: "/customers",
			icon: "account-details",
			name: "Clients",
		},
		{
			link: "/settings",
			icon: "cog",
			name: "Paramètres"
		}
	];
}
</script>