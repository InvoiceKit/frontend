<template>
  <v-app>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col align="center">
          <img src="@/assets/logo.png" height="164px" />

          <br />
          <br />

          <h1 class="pb-4 display-3">
            Invoice
            <b>Kit</b>
          </h1>

          <p class="subtitle">Une manière simple de gérer vos factures, devis et vos clients.</p>

          <br />
          <br />

          <v-btn to="/authentication" text color="blue">Se connecter</v-btn>&nbsp;
          <v-btn to="/authentication/register" outlined color="green">Créer un compte</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-footer app>
      InvoiceKit &copy; 2020, Victor Lourme

      <v-spacer></v-spacer>

      <v-btn color="orange" small text href="https://github.com/vlourme/InvoiceKit">Voir le projet GitHub</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
