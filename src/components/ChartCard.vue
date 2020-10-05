<template>
	<v-card>
		<v-row align="center" class="pa-2" justify="center">
			<v-col class="ml-2 mr-2" cols="2" md="3" sm="6">
				<v-sheet
					:color="color"
					elevation="4"
					height="74px"
					rounded
					width="74px"
				>
					<v-row align="center" class="fill-height" justify="center">
						<v-col align="center">
							<v-icon x-large>mdi-{{ icon }}</v-icon>
						</v-col>
					</v-row>
				</v-sheet>
			</v-col>
			<v-col>
				<h1 class="display-1">
					{{ value }}
					<span class="caption">{{ caption }}</span>
				</h1>
				<span class="overline">{{ overline }}</span>
			</v-col>
		</v-row>
	</v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ChartCard extends Vue {
	@Prop(String) readonly color!: string;
	@Prop(String) readonly icon!: string;
	@Prop(String) readonly value!: string;
	@Prop(String) readonly caption!: string;
	@Prop(String) readonly overline!: string;
}
</script>
