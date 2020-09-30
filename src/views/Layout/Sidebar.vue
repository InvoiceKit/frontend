<template>
	<v-navigation-drawer app permanent>
		<template v-slot:prepend>
			<v-container class="mt-2 d-flex flex-row">
				<v-sheet
					class="ml-3 team_sheet secondary--bg"
					height="60"
					width="60"
				>
					<v-row align="center" justify="center">
						<v-col align="center">
							<v-icon large> mdi-cube-outline </v-icon>
						</v-col>
					</v-row>
				</v-sheet>
				<v-row align="center" justify="center">
					<v-col class="ml-4">
						<span class="team_name">{{ team.name }}</span>
					</v-col>
				</v-row>
			</v-container>
		</template>

		<v-list>
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
})
export default class Sidebar extends Vue {
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
			link: "/messages",
			icon: "message",
			name: "Messages",
		},
	];
}
</script>
