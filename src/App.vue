<template>
  <div>
    <template v-if="isLogged">
      <h1>Logged</h1>
    </template>

    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState("auth", ["isLogged"]),
  }
};
</script>
