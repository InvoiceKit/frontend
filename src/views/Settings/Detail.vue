<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="blue" icon="account" />

			Profil
		</v-card-title>

		<v-simple-table>
			<tbody>
				<tr>
					<td>Nom d'utilisateur</td>
					<td>{{ team.username }}</td>
				</tr>
				<tr>
					<td>Identifiant</td>
					<td>{{ team.id }}</td>
				</tr>
			</tbody>
		</v-simple-table>
	</v-card>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
	computed: {
		...mapState("auth", ["team"]),
	},
})
export default class Detail extends Vue {}
</script>
