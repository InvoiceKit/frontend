<template>
	<v-card>
		<v-sheet class="pa-4" rounded color="blue-grey">
			<v-row align="center">
				<v-col cols="2" align="center">
					<v-icon x-large>mdi-map-marker</v-icon>
				</v-col>
				<v-col cols="10">
					<h1 class="display-1">Adresses</h1>
				</v-col>
			</v-row>
		</v-sheet>

		<v-data-table
            class="mt-4"
            :items="customer.addresses"
            :headers="headers"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn icon @click="deleteAddress(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
		</v-data-table>

        <v-card-actions>
            <v-spacer />

            <v-btn text color="orange" @click="dialog = true">
                Ajouter une adresse
            </v-btn>
        </v-card-actions>

        <AddAddress :display.sync="dialog" :id="customer.id" />
	</v-card>
</template>

<script>
import AddAddress from '../Dialogs/AddAddress'
import { mapState } from "vuex";

export default {
    name: "Addresses",
    components: {
        AddAddress
    },
    data: () => ({
        headers: [
            {
                text: 'Adresse',
                value: 'line'
            },
            {
                text: 'Code postal',
                value: 'zip'
            },
            {
                text: 'Ville',
                value: 'city'
            },
            {
                text: 'Actions',
                value: 'actions'
            }
        ],
        dialog: false
    }),
	computed: {
		...mapState("customers", ["customer"]),
    },
    methods: {
        async deleteAddress(item) {
            try {
                await this.$store.dispatch('customers/deleteAddress', {
                    params: {
                        id: this.customer.id,
                        address: item.id
                    }
                })

                await this.$store.dispatch('customers/get', {
                    params: {
                        id: this.customer.id
                    }
                })
            } catch {
                alert('Une erreur est survenue pendant la suppression de l\'adresse')
            }
        }
    }
};
</script>