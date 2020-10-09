<template>
	<v-snackbar app bottom light :timeout="3000" v-model="show">
		<v-icon left :color="color" dense>mdi-{{ icon }}</v-icon>
		{{ message }}
	</v-snackbar>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mapState} from "vuex";

@Component({
	computed: {
		...mapState('snackbar', [
			'display',
			'icon',
			'color',
			'message'
		])
	}
})
export default class Snackbar extends Vue {
	display!: boolean
	icon!: string
	color!: string
	message!: string

	get show() {
		return this.display
	}

	set show(value: boolean) {
		this.$store.dispatch('snackbar/switch')
	}
}
</script>