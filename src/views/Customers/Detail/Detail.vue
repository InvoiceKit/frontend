<template>
	<div>
		<v-app-bar app>
			<v-btn icon exact to="/customers">
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>

			<v-toolbar-title>Fiche client</v-toolbar-title>

			<v-spacer />

			<v-btn text color="error" @click="deleteCustomer">
				Supprimer le client
			</v-btn>
		</v-app-bar>

		<v-row>
			<v-col cols="12" md="6" sm="12">
				<Profile />
			</v-col>
			<v-col cols="12" md="6" sm="12">
				<Addresses />
			</v-col>
		</v-row>

		<v-app-bar bottom absolute>
			<v-spacer />

			<v-btn text color="warning" @click="edit = true"> Modifier le client </v-btn>

			<v-btn text color="info" @click="address = true"> Ajouter une adresse </v-btn>
		</v-app-bar>

        <AddAddress :display.sync="address" />
        <AddCustomer :display.sync="edit" :editedItem="customer" />
	</div>
</template>

<script lang="ts">
import Profile from "./Profile.vue";
import Addresses from "./Addresses.vue";
import AddAddress from '../Dialogs/AddAddress.vue'
import AddCustomer from '../Dialogs/AddCustomer.vue'
import { Component, Vue } from "vue-property-decorator";
import { mapState } from 'vuex';

@Component({
	components: {
		Profile,
        Addresses,
        AddAddress,
        AddCustomer
    },
    
    computed: {
        ...mapState('customers', [
            'customer'
        ])
    },

	async mounted() {
		try {
			await this.$store.dispatch("customers/get", {
				params: {
					id: this.$route.params.id,
				},
			});
		} catch {
			this.$router.push("/customers");
		}
	},
})
export default class CustomerDetail extends Vue {
    // Address dialog
    address = false
    
    // Edition dialog
    edit = false

    /**
     * Delete a customer
     */
	async deleteCustomer() {
		try {
			await this.$store.dispatch("customers/delete", {
				params: {
					id: this.$route.params.id,
				},
            });
            
            this.$router.push('/customers')
		} catch {
            alert('Impossible de supprimer le client.')
        }
    }
}
</script>