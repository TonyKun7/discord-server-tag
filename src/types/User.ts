import type { User } from "discord.js"

export interface UserData extends User {
    primary_guild?: {
        identity_guild_id?: string;
        tag?: string;
        identity_enabled?: boolean;
        badge?: string;
    }
}