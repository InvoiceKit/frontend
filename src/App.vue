<template>
  <div>
    <template v-if="isLogged">
      <template v-if="$route.path == '/'">
        <router-view />
      </template>

      <template v-else>
        <Main />
      </template>
    </template>

    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Main from '@/views/Layout/Main.vue'

export default {
  name: "App",
  components: {
    Main
  },
  computed: {
    ...mapState("auth", ["isLogged"]),
  }
};
</script>
