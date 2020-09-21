<template>
	<div>
		<Table />

		<Sidebar />
	</div>
</template>

<script lang="ts">
import Sidebar from "./Sidebar.vue";
import Table from "./Table.vue";

import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index";

@Component({
	components: {
		Sidebar,
		Table,
	},

	async beforeRouteEnter(to, from, next) {
		try {
			await store.dispatch("invoices/get", {
				params: {
					id: to.params.id,
				},
			});

			next();
		} catch {
			next({ path: "/invoices" });
		}
	},
})
export default class Detail extends Vue {}
</script>
