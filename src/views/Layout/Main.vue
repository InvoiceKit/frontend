<template>
    <v-app>
        <Sidebar :drawer.sync="drawer" />

        <AppBar :drawer.sync="drawer" />

        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Sidebar from '@/views/Layout/Sidebar.vue'
import AppBar from '@/views/Layout/AppBar.vue'

export default {
    name: "Main",
    data: () => ({
        drawer: true
    }),
    components: {
        Sidebar,
        AppBar
    }
}
</script>