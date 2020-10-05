<template>
	<v-container>
		<v-row class="mb-4">
			<v-col>
				<p class="header">
					Messages
					<br/>
					<span class="overline"
					>Provenant du formulaire de contact</span
					>
				</p>
			</v-col>

			<v-spacer/>

			<v-col align="right" cols="4">
				<v-text-field
					v-model="search"
					hide-details
					label="Chercher un message"
					single-line
					solo-inverted
				/>
			</v-col>
		</v-row>

		<v-card>
			<v-data-table
				:headers="headers"
				:items="data"
				:search="search"
				show-expand
				single-expand
			>
				<template #item.createdAt="{ item }">{{
						new Date(item.createdAt).toLocaleDateString()
					}}
				</template>
				<template #expanded-item="{ headers, item }">
					<td :colspan="headers.length">{{ item.text }}</td>
				</template>
				<template #item.actions="{ item }">
					<v-btn icon @click="deleteItem(item)">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import {Message, Pagination} from "@/types";
import {Component, Vue} from "vue-property-decorator";
import {DataTableHeader} from "vuetify";
import {mapState} from "vuex";

@Component({
	computed: {
		...mapState("messages", ["messages"]),
	},
})
export default class Messages extends Vue {
	messages!: Pagination<Message>;

	search: string = "";

	data: Array<Message> = [];
	headers: Array<DataTableHeader> = [
		{
			text: "Nom",
			value: "name",
		},
		{
			text: "Email",
			value: "email",
		},
		{
			text: "Téléphone",
			value: "phone",
		},
		{
			text: "Adresse",
			value: "address",
		},
		{
			text: "Date",
			value: "createdAt",
		},
		{
			text: "Actions",
			value: "actions",
			width: 100,
		},
	];

	async mounted() {
		await this.load();
	}

	async load() {
		try {
			await this.$store.dispatch("messages/fetch");

			for (const message of this.messages.items) {
				this.data.push({
					name: `${message.firstName} ${message.lastName}`,
					...message,
				});
			}
		} catch (ex) {
			console.log(ex);
		}
	}

	async deleteItem(item: Message) {
		try {
			await this.$store.dispatch("messages/delete", {
				params: {
					id: item.id,
				},
			});

			const index = this.data.indexOf(item);

			this.data.splice(index, 1);
		} catch (ex) {
			console.log(ex);
		}
	}
}
</script>
