<template>
    <v-chip :color="getColor()">{{ getText() }}</v-chip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class StatusLabel extends Vue {
    @Prop(String) readonly status!: string

    getText() {
        switch(this.status) {
            case "paid": return "Payé"
            case "waiting": return "En attente"
            case "canceled": return "Annulé"
        }
    }

    getColor() {
        switch(this.status) {
            case "paid": return "green"
            case "waiting": return "orange"
            case "canceled": return "red"
        }
    }
}
</script>