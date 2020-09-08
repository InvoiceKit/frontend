<template>
	<div>
		<v-app-bar app>
			<v-btn icon exact to="/customers">
				<v-icon>mdi-close</v-icon>
			</v-btn>

			<v-toolbar-title>Fiche client</v-toolbar-title>
		</v-app-bar>
		<v-row>
			<v-col cols="12" md="6" sm="12">
				<Profile />
			</v-col>
			<v-col cols="12" md="6" sm="12">
				<Addresses />
			</v-col>
		</v-row>
	</div>
</template>

<script>
import Profile from "./Profile";
import Addresses from "./Addresses";

export default {
	name: "CustomerDetail",
	components: {
		Profile,
		Addresses,
	},
	mounted() {
		this.$store.dispatch("customers/get", {
			params: {
				id: this.$route.params.id,
			},
		});
	},
};
</script>