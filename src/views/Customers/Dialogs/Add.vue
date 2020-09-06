<template>
  <v-dialog v-model="display" max-width="550px" @click:outside="close">
    <v-card>
      <v-card-title>Ajouter un client</v-card-title>

      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Nom" />

            <v-text-field label="Prénom" />

            <v-text-field label="Email" />
          </v-col>

          <v-col>
            <v-text-field label="Société" />

            <v-text-field label="Téléphone" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn text color="red">Annuler</v-btn>

        <v-btn text color="green">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddDialog",
  props: {
    display: Boolean,
  },
  data: () => ({
      payload: {
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: ''
      }
  }),
  methods: {
      close() {
          this.$emit('update:display', false)
      },

      async save() {
          try {
              await this.$store.dispatch('customers/add', {
                  data: this.payload
              })

              this.close()

              await this.$store.dispatch('customers/get')
          } catch {
              alert('Impossible de sauvegarder')
          }
      }
  }
};
</script>