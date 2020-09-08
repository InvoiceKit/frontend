<template>
	<v-app-bar app>
		<v-app-bar-nav-icon @click.stop="syncedDrawer = !syncedDrawer" />

		<v-toolbar-title>InvoiceKit</v-toolbar-title>

		<v-spacer />

		<v-btn icon to="/settings">
			<v-icon>mdi-account-circle</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";

@Component
export default class AppBar extends Vue {
	@PropSync("drawer", { type: Boolean }) syncedDrawer!: boolean;
}
</script>