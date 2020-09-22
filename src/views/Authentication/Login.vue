<template>
	<v-app>
		<v-container fluid fill-height>
			<v-row align="center" justify="center">
				<v-col cols="5" align="right">
					<img src="@/assets/logo.png" />
				</v-col>

				<v-col cols="7">
					<v-card outlined max-width="500px">
						<v-card-title>Bienvenue sur InvoiceKit</v-card-title>

						<v-card-text>
							<v-alert
								v-if="error"
								border="left"
								color="red"
								text
							>Les identifiants fournis sont incorrects.</v-alert>

							<v-text-field
								v-model="username"
								:rules="rules.username"
								label="Nom d'utilisateur"
								prepend-icon="mdi-account"
							></v-text-field>

							<v-text-field
								v-model="password"
								:rules="rules.password"
								label="Mot de passe"
								type="password"
								prepend-icon="mdi-lock"
							></v-text-field>
						</v-card-text>

						<v-card-actions>
							<v-btn to="/" text color="grey">
								<v-icon left>mdi-arrow-left</v-icon>Retour
							</v-btn>

							<v-spacer></v-spacer>

							<v-btn to="/authentication/register" text color="orange">S'inscrire</v-btn>

							<v-btn @click="login" text color="green">Se connecter</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
	rules = {
		username: [
			(value: string) => !!value || "Obligatoire.",
			(value: string) => (value || "").length >= 5 || "Incorrect.",
		],
		password: [
			(value: string) => !!value || "Obligatoire.",
			(value: string) => (value || "").length >= 8 || "Incorrect.",
		],
	};
	username = "";
	password = "";
	error = false;

	async login() {
		try {
			// Login
			await this.$store.dispatch("auth/login", {
				data: {
					username: this.username,
					password: this.password,
				},
			});

			// Redirect
			window.location.reload();
		} catch {
			// Set error
			this.error = true;
		}
	}
}
</script>
