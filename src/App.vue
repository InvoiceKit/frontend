<template>
  <div>
    <template v-if="isLogged">
      <template v-if="$route.path == '/'">
        <router-view />
      </template>

      <template v-else>
        <h1>Dashboard</h1>
      </template>
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
  },
  mounted() {
    console.log(this.$route)
  }
};
</script>
