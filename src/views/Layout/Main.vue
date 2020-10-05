<template>
	<v-app>
		<Sidebar/>

		<v-main>
			<v-container fluid>
				<router-view/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Sidebar from "@/views/Layout/Sidebar.vue";
import {Component, Vue} from "vue-property-decorator";

@Component({
	components: {
		Sidebar,
	},

	async mounted() {
		try {
			await this.$store.dispatch("auth/get");
		} catch (ex) {
			// Logout
			console.log(ex);
			localStorage.removeItem("token");
			window.location.reload();
		}
	},
})
export default class Main extends Vue {
}
</script>
