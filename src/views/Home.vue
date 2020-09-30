<template>
	<v-app>
		<div class="header-section">
			<v-row align="center" justify="center" class="fill-height">
				<v-col align="center">
					<h1 class="display-2" style="font-weight: 600">
						InvoiceKit
					</h1>
					<p class="body-1">
						Une solution puissante et innovante pour la gestion de
						votre société
					</p>

					<br />
					<br />

					<v-btn text v-if="!isLogged" to="/authentication" large>
						<v-icon left>mdi-account</v-icon>Connexion
					</v-btn>

					<v-btn text v-else to="/dashboard" large>
						<v-icon left>mdi-home</v-icon>Tableau de bord
					</v-btn>
				</v-col>
			</v-row>
		</div>
		<div class="header-section-2">
			<v-container>
				<br />

				<p class="text-center headline">
					Pourquoi utiliser InvoiceKit ?
				</p>

				<br />

				<v-row align="center" justify="center">
					<v-col align="center">
						<v-icon x-large class="primary--text">
							mdi-database-sync
						</v-icon>

						<br />
						<br />

						<h2>Synchronisé</h2>

						<br />

						<p class="body-2 description">
							Tous vos documents sont synchronisés en temps réel.
							Aucun besoin de télécharger les documents. Cela
							assure également un accès sur tous vos appareils.
						</p>
					</v-col>
					<v-col align="center">
						<v-icon x-large class="primary--text">
							mdi-chart-bell-curve-cumulative
						</v-icon>

						<br />
						<br />

						<h2>Visualisation</h2>

						<br />

						<p class="body-2 description">
							Profitez d'un tableau de bord complet avec des
							diagrammes afin de visualiser en quelques secondes
							la santé de vos projets.
						</p>
					</v-col>
					<v-col align="center">
						<v-icon x-large class="primary--text">
							mdi-cellphone-link
						</v-icon>

						<br />
						<br />

						<h2>Accessibilité</h2>

						<br />

						<p class="body-2 description">
							InvoiceKit a pour but de supporter un maximum de
							plateformes, à commencer par l'ordinateur et les
							iPhones.
						</p>
					</v-col>
				</v-row>
			</v-container>
		</div>
		<div class="header-section-3">
			<v-container>
				<br />

				<p class="text-center headline">Développement et support</p>

				<br />

				<v-row align="center" justify="center">
					<v-col align="center">
						<p class="body-1 description-dev">
							La suite InvoiceKit est développée par Victor
							Lourme. La version actuelle est la v1.0-rc. Les
							technologies utilisées sont : Swift et Vapor 4 pour
							le backend. VueJS, Vuex et Vuetify pour le frontend.
							Swift avec SwiftUI pour l'application.

							<br />
							<br />

							Le projet est actuellement en closed-source,
							cependant si vous souhaitez contribuer, signaler des
							bugs, proposer une suggestion, etc. vous pouvez me
							contacter à l'adresse mail suivante:
							<a href="mailto:victor.lourme@icloud.com"
								>victor.lourme@icloud.com</a
							>. Vous pouvez aussi
							<a href="//github.com/vlourme"
								>cliquer ici pour voir mon profil GitHub</a
							>.
						</p>
					</v-col>
				</v-row>
			</v-container>
		</div>

		<v-footer> Victor Lourme © 2020 </v-footer>
	</v-app>
</template>

<style scoped>
.header-section {
	height: 65vh;
	background: rgba(245, 245, 245, 0.85);
}

.header-section-2 {
	height: 50vh;
}

.header-section-3 {
	min-height: 40vh;
	background: rgba(245, 245, 245, 0.45);
}

.description {
	text-align: justify;
	width: 250px;
}

.description-dev {
	width: 500px;
	text-align: justify;
}
</style>

<!--

-->

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
