<template>
	<v-card>
		<v-sheet class="pa-4" rounded color="blue-grey">
			<v-row align="center">
				<v-col cols="1" align="center">
					<v-icon x-large>mdi-card-account-details</v-icon>
				</v-col>
				<v-col cols="11">
					<h1 class="display-1">Fiche client</h1>
				</v-col>
			</v-row>
		</v-sheet>

		<v-simple-table class="mt-4">
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
                            <a :href="'mailto:' + customer.email">{{ customer.email }}</a>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </td>
				</tr>

				<tr>
					<td>Téléphone</td>
					<td>
                        {{ customer.phone || "N/A" }}
                    </td>
				</tr>
			</tbody>
		</v-simple-table>

        <v-card-actions>
            <v-spacer />

            <v-btn text color="orange">
                Editer la fiche
            </v-btn>
        </v-card-actions>
	</v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Detail",
	computed: {
		...mapState("customers", ["customer"]),
	},
};
</script>