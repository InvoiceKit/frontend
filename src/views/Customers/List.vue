<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>Clients</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field hide-details solo-inverted label="Chercher un client" v-model="search" />

      <v-spacer></v-spacer>

      <v-btn icon @click="addDialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="customers.item">
        <template v-slot:item.name="{ item }">
          {{ item.firstName }} {{ item.lastName }}
        </template>
      </v-data-table>
    </v-card>

    <AddDialog :display.sync="addDialog" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddDialog from './Dialogs/Add'

export default {
  name: "CustomerList",
  components: {
    AddDialog
  },
  data: () => ({
    addDialog: false,
    search: '',
    headers: [
      {
        text: "Nom complet",
        value: "name",
      },
      {
        text: "Entreprise",
        value: "company",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Téléphone",
        value: "phone",
      },
    ]
  }),
  computed: {
    ...mapState("customers", ["customers"]),
  },
  async mounted() {
    this.$store.dispatch("customers/get");
  }
};
</script>