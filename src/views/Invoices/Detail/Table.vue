<template>
    <v-card class="mt-6">
        <v-card-title>
            <CardIcon color="green" icon="plus" />

            Liste des objets
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="invoice.invoice.fields"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn icon @click="deleteItem(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>

                <v-btn icon @click="editItem(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <edit-field :display.sync="editionDialog" :id="invoice.invoice.id" :editedItem="editedItem" />
    </v-card>
</template>

<script lang="ts">
import EditField from './Dialogs/FieldDialog.vue'
import { Field } from '@/types/field';
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex';
import { Invoice } from '@/types';

@Component({
    components: {
        EditField
    },
    computed: {
        ...mapState('invoices', [
            'invoice'
        ])
    }
})
export default class Table extends Vue {
    headers = [
        {
            text: 'Description',
            value: 'name'
        },
        {
            text: 'TVA',
            value: 'vat',
            width: 200
        },
        {
            text: 'Prix H.T.',
            value: 'price',
            width: 200
        },
        {
            text: 'Actions',
            value: 'actions',
            width: 200
        }
    ]

    editionDialog = false
    editedItem: Field = {
        name: "",
        price: 0,
        vat: 0
    }

    async deleteItem(item: Field) {
        let invoice: Invoice = this.$store.state.invoices.invoice.invoice

        await this.$store.dispatch('invoices/deleteField', {
            params: {
                id: invoice.id,
                field: item.id
            }
        })

        await this.$store.dispatch('invoices/get', {
            params: {
                id: invoice.id
            }
        })
    }

    editItem(item: Field) {
        this.editedItem = item
        this.editionDialog = true
    }
}
</script>