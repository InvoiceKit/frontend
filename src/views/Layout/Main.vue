<template>
    <v-app>
        <Sidebar />

        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Sidebar from '@/views/Layout/Sidebar.vue'

export default {
    name: "Main",
    components: {
        Sidebar
    }
}
</script>