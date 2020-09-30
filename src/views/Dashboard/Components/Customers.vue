<template>
	<v-card v-if="charts.customers">
		<v-card-title class="overline grey--text"> Clients </v-card-title>

		<v-card-text>
			<span class="value"> {{ charts.customers }} </span>
			<br />
			<span class="overline desc">Clients</span>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "Customers",
	computed: {
		...mapState("charts", ["charts"]),
	},
};
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
