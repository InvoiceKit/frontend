<template>
	<v-sheet
		:color="color"
		rounded
		elevation="4"
		height="90px"
		width="90px"
		class="mt-n10 ml-n1 mr-4"
	>
		<v-row align="center" justify="center" class="fill-height">
			<v-col align="center">
				<v-icon x-large>mdi-{{ icon }}</v-icon>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CardIcon extends Vue {
	@Prop(String) readonly color!: string;
	@Prop(String) readonly icon!: string;
}
</script>