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
							>
								Impossible de créer le compte, verifiez que les
								champs sont correctement remplis.
							</v-alert>

							<v-alert
								v-if="success"
								border="left"
								color="green"
								text
							>
								Votre compte à bien été crée! Vous allez être
								redirigé...
							</v-alert>

							<v-text-field
								v-model="name"
								:rules="rules.name"
								label="Nom de votre team"
								prepend-icon="mdi-account-group"
							></v-text-field>

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
							<v-btn to="/authentication" text color="grey">
								<v-icon left>mdi-arrow-left</v-icon>Retour
							</v-btn>

							<v-spacer></v-spacer>

							<v-btn @click="register" text color="green"
								>S'inscrire</v-btn
							>
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
export default class Register extends Vue {
	rules = {
		name: [(value: string) => !!value || "Obligatoire."],
		username: [
			(value: string) => !!value || "Obligatoire.",
			(value: string) => (value || "").length >= 5 || "Incorrect.",
		],
		password: [
			(value: string) => !!value || "Obligatoire.",
			(value: string) => (value || "").length >= 8 || "Incorrect.",
		],
	};
	name = "";
	username = "";
	password = "";
	error = false;
	success = false;

	async register() {
		try {
			// Register
			await this.$store.dispatch("auth/register", {
				data: {
					name: this.name,
					username: this.username,
					password: this.password,
				},
			});

			this.$router.push("/dashboard");

			window.location.reload();
		} catch {
			// Set error
			this.success = false;
			this.error = true;
		}
	}
}
</script>
