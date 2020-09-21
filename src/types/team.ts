export interface Team {
	id?: string;
	username: string;
	name: string;
	passwordHash: string;
	company?: string;
	website?: string;
	image?: string;
	address?: string;
	city?: string;
	fields?: string[];
}
