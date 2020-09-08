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

<script lang="ts">
import Main from "@/views/Layout/Main.vue";

import { mapState } from "vuex";
import { Component, Vue } from "vue-property-decorator";

@Component({
	computed: {
		...mapState("auth", ["isLogged"]),
	},
	components: {
		Main,
	},
})
export default class App extends Vue {}
</script>
