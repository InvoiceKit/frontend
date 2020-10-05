<template>
	<v-sheet
		:color="color"
		class="mt-n10 ml-n1 mr-4"
		elevation="4"
		height="90px"
		rounded
		width="90px"
	>
		<v-row align="center" class="fill-height" justify="center">
			<v-col align="center">
				<v-icon x-large>mdi-{{ icon }}</v-icon>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class CardIcon extends Vue {
	@Prop(String) readonly color!: string;
	@Prop(String) readonly icon!: string;
}
</script>
