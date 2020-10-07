export interface Team {
    id?: string;
    username: string;
    name: string;
    passwordHash: string;
    company?: string;
    website?: string;
    image?: string;
    address?: string;
    zip: string;
    city?: string;
    fields?: string[];
}
