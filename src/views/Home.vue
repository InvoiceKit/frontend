<template>
	<v-app>
		<v-row align="center" justify="center">
			<v-col align="center">
				<img src="../assets/logo.png" height="128px" />

				<br />
				<br />

				<h1 class="display-3">InvoiceKit</h1>
				<h2 class="overline">
					Un système efficace de gestion des factures
				</h2>

				<br />
				<br />

				<v-btn v-if="!isLogged" to="/authentication" large light>
					<v-icon left>mdi-account</v-icon>Connexion
				</v-btn>
				<v-btn v-else to="/dashboard" large light>
					<v-icon left>mdi-home</v-icon>Tableau de bord
				</v-btn>
			</v-col>
		</v-row>
	</v-app>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";

@Component({
	computed: {
		...mapState("auth", ["isLogged"]),
	},
})
export default class App extends Vue {}
</script>
