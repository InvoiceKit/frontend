<template>
	<v-card class="mt-5">
		<v-card-title>
			<CardIcon color="teal accent-3" icon="account" />Informations
			<v-spacer />

			<v-btn @click="display = true" text color="teal accent-3">
				<v-icon left>mdi-pencil</v-icon>Modifier les informations
			</v-btn>
		</v-card-title>

		<v-simple-table>
			<tbody>
				<tr>
					<td>Nom complet</td>
					<td>
						{{ customer.firstName || "N/A" }}
						{{ customer.lastName }}
					</td>
				</tr>

				<tr>
					<td>Entreprise</td>
					<td>{{ customer.company || "N/A" }}</td>
				</tr>

				<tr>
					<td>Email</td>
					<td>
						<template v-if="customer.email">
							<a :href="'mailto:' + customer.email">{{
								customer.email
							}}</a>
						</template>
						<template v-else>N/A</template>
					</td>
				</tr>

				<tr>
					<td>Téléphone</td>
					<td>{{ customer.phone || "N/A" }}</td>
				</tr>

				<tr>
					<td>Identifiant</td>
					<td>{{ customer.id || "Erreur" }}</td>
				</tr>
			</tbody>
		</v-simple-table>

		<add-customer :display.sync="display" :editedItem="customer" />
	</v-card>
</template>

<script lang="ts">
import AddCustomer from "../Dialogs/AddCustomer.vue";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { Customer } from "@/types";

@Component({
	components: {
		AddCustomer,
	},
	computed: {
		...mapState("customers", ["customer"]),
	},
})
export default class Detail extends Vue {
	display = false;
	customer!: Customer;
}
</script>
