<template>
    <v-row>
        <v-col cols="12" md="8" sm="12">
            <Profile />
        </v-col>
        <v-col cols="12" md="4" sm="12">
            <Addresses />
        </v-col>
    </v-row>
</template>

<script>
import Profile from './Profile'
import Addresses from './Addresses'

export default {
    name: "CustomerDetail",
    components: {
        Profile,
        Addresses
    },
    mounted() {
        this.$store.dispatch('customers/get', {
            params: {
                id: this.$route.params.id
            }
        })
    }
}
</script>