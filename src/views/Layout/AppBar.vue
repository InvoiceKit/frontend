<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="$emit('update:drawer', !drawer)" />

        <v-toolbar-title>InvoiceKit</v-toolbar-title>

        <v-spacer />

        <v-btn icon to="/settings">
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: "AppBar",
    props: {
        drawer: Boolean
    }
}
</script>