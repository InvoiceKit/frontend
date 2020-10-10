<template>
	<v-dialog v-model="display" max-width="450px">
		<v-card>
			<v-card-title>
				{{ title }}
			</v-card-title>

			<v-card-text>
				{{ text }}
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn text @click="display = false">
					Fermer
				</v-btn>

				<v-btn text @click="method()" :color="destructive ? 'red' : 'green'">
					{{ button }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue} from "vue-property-decorator";

@Component
export default class Dialog extends Vue {
	@PropSync('show', { type: Boolean }) display!: boolean;
	@Prop(String) readonly title!: string
	@Prop(String) readonly text!: string
	@Prop(String) readonly button!: string
	@Prop(Boolean) readonly destructive!: boolean
	@Prop(Function) readonly method!: Function
}
</script>