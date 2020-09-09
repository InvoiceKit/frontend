<template>
	<div v-if="invoice.invoice && invoice.prices">
		<Table />

		<Sidebar />
	</div>
</template>

<script lang="ts">
import Sidebar from "./Sidebar.vue";
import Table from "./Table.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import { InvoiceOutput, InvoiceStatus, InvoiceType } from "@/types";

@Component({
	components: {
		Sidebar,
		Table
	},

	computed: {
		...mapState('invoices', [
			'invoice'
		])
	},

	async created() {
		try {
			await this.$store.dispatch("invoices/get", {
				params: {
					id: this.$route.params.id,
				},
			});
		} catch {
			this.$router.push("/invoices");
		}
	},
})
export default class Detail extends Vue {}
</script>