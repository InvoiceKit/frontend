<template>
	<v-app>
		<Sidebar />

		<v-main>
			<v-container fluid>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Sidebar from "@/views/Layout/Sidebar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {
		Sidebar,
	},

	async mounted() {
		try {
			await this.$store.dispatch("auth/get");
		} catch (ex) {
			// Logout
			console.log(ex);
			localStorage.removeItem("token");
			window.location.reload();
		}
	},
})
export default class Main extends Vue {}
</script>

<style>
html,
body {
	background: linear-gradient(
		-45deg,
		rgba(243, 245, 248, 1),
		rgba(227, 230, 235, 1)
	);
}

.v-application {
	background: transparent !important;
	font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
		Roboto, Ubuntu !important;
}

.v-card {
	background: radial-gradient(95%, #ffffff, #d7d7dc);
	box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.075) !important;
	border: none !important;
}

.v-card-title {
	background: transparent !important;
}

.v-dialog,
.v-card {
	border-radius: 18px !important;
}

.v-data-table,
tr {
	background: transparent !important;
}

.v-app-bar,
header {
	background: linear-gradient(
		to top,
		rgba(245, 245, 240, 0.025),
		rgba(255, 255, 255, 0.025)
	) !important;
	border: none !important;
	box-shadow: none !important;
}
</style>
