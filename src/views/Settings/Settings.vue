<template>
  <v-row>
    <v-col cols="7">
      <Profile></Profile>
    </v-col>
    <v-col cols="5">
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

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>