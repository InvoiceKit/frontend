<template>
  <v-card>
    <v-sheet
      class="mx-auto pa-6"
      rounded
      color="success"
    >
      <v-row align="center">
        <v-col cols="1" align="center">
          <v-icon x-large>mdi-cog</v-icon>
        </v-col>
        <v-col cols="11">
          <h1 class="display-1">Paramètres</h1>
          <h2 class="subtitle-1">Complètez votre profil et l'apparence des factures</h2>
        </v-col>
      </v-row>
    </v-sheet>

    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            label="Nom de la team"
            v-model="payload.name"
            placeholder="Exemple: InvoiceKit"
            :rules="notEmpty"
          ></v-text-field>

          <v-text-field
            label="Nom juridique de l'entreprise"
            placeholder="Exemple: SAS InvoiceKit"
            v-model="payload.company"
            :rules="notEmpty"
          ></v-text-field>

          <v-text-field
            label="Adresse du siège social"
            placeholder="Exemple: 12 rue des lilas"
            v-model="payload.address"
            :rules="notEmpty"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            label="Site internet de l'entreprise"
            placeholder="Exemple: https://www.invoicekit.io"
            v-model="payload.website"
            :rules="notEmpty"
          ></v-text-field>

          <v-text-field
            label="Lien vers une image bannière"
            placeholder="Utilisé pour les factures, ex: https://example.com/image.png"
            v-model="payload.image"
            :rules="notEmpty"
          ></v-text-field>

          <v-text-field
            label="Code postal et ville du siège social"
            placeholder="Exemple: 59000, Lille"
            v-model="payload.city"
            :rules="notEmpty"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn @click="save" text color="green">Sauvegarder</v-btn>
    </v-card-actions>

    <v-snackbar v-model="success" text timeout="3000" color="success">
        Les paramètres ont bien étés enregistrés.
    </v-snackbar>

    <v-snackbar v-model="error" text timeout="3000" color="danger">
        Impossible de sauvegarder, vérifiez que les champs sont bien remplis.
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapState("auth", {
      team: (state) => state.team,
    }),
  },
  data: () => ({
    payload: {},
    notEmpty: [(value) => !!value || "Obligatoire."],
    success: false,
    error: false,
  }),
  watch: {
    team(newValue) {
      this.payload = newValue;
    },
  },
  methods: {
    async save() {
      try {
        await this.$store.dispatch("auth/save", {
          data: this.payload,
        });

        this.success = true

        await this.$store.dispatch("auth/get");
      } catch {
        this.error = true
      }
    },
  },
};
</script>