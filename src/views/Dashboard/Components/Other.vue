<template>
	<v-card v-if="charts.customers">
		<v-card-title class="overline grey--text"> Autres</v-card-title>

		<v-card-text>
			<v-row>
				<v-col>
					<span class="value"> {{ charts.customers }} </span>
					<br/>
					<span class="overline desc">Clients</span>
				</v-col>
				<v-col>
					<span class="value"> {{ charts.contracts_count }} </span>
					<br/>
					<span class="overline desc">Contrats</span>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import {mapState} from "vuex";
import {Component, Vue} from "vue-property-decorator";
import {Charts} from "@/types";

@Component({
	computed: {
		...mapState("charts", [
			"charts"
		])
	}
})
export default class OtherCharts extends Vue {
	charts!: Charts
}
</script>

<style scoped>
.value {
	font-size: 18pt;
	font-weight: 600;
}

.desc {
	display: inline-block;
	border-top: 2px solid #0077b6;
	margin-top: 5px;
	font-size: 9pt !important;
}
</style>
