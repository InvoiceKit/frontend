<template>
  <v-row>
    <v-col sm="12" md="6" lg="8">
      <Profile></Profile>
    </v-col>
    <v-col sm="12" md="6" lg="4">
      <Fields></Fields>
    </v-col>
  </v-row>
</template>

<script>
import Profile from "./Profile";
import Fields from "./Fields"

export default {
  name: "Settings",
  components: {
    Profile,
    Fields
  },
};
</script>