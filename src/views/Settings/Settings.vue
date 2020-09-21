<template>
	<v-row>
		<v-col cols="12" sm="12" md="6" lg="7">
			<Profile />
			<br />
			<ImageSettings />
		</v-col>
		<v-col cols="12" sm="12" md="6" lg="5">
			<Fields />
			<br />
			<Detail />
		</v-col>

		<v-footer absolute
			>En cas de problème technique, contactez un administrateur avec
			votre identifiant unique.</v-footer
		>
	</v-row>
</template>

<script lang="ts">
import Profile from "./Profile.vue";
import ImageSettings from "./Image.vue";
import Fields from "./Fields.vue";
import Detail from "./Detail.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {
		Profile,
		ImageSettings,
		Fields,
		Detail,
	},
})
export default class Settings extends Vue {}
</script>
