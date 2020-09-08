<template>
    <v-app>
        <Sidebar :drawer="drawer" />

        <AppBar :drawer="drawer" />

        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Sidebar from '@/views/Layout/Sidebar.vue'
import AppBar from '@/views/Layout/AppBar.vue'

import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Sidebar,
        AppBar
    }
}) export default class Main extends Vue {
    drawer = true
}
</script>