export interface Team {
    username: string
    name: string
    passwordHash: string
    company?: string
    website?: string
    image?: string
    address?: string
    city?: string
    fields?: string[]
}