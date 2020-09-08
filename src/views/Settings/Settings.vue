<template>
	<v-row>
		<v-col cols="12" sm="12" md="6" lg="7">
			<Profile></Profile>
		</v-col>
		<v-col cols="12" sm="12" md="6" lg="5">
			<Fields></Fields>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Profile from "./Profile.vue";
import Fields from "./Fields.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {
		Profile,
		Fields,
	},
})
export default class Settings extends Vue {}
</script>