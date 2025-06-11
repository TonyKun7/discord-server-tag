import type { UserData } from "./types/User"
import type { Client } from "discord.js"

declare module "discord.js" {
    interface ClientEvents {
        userTagUpdate: [oldUser: UserData, newUser: UserData];
    }
  
    interface Client {
        getUserTag: (userId: string) => UserData
    }
}

class DiscordServerTag {
    private client: Client
    private members: Map<string, UserData> = new Map()

    public constructor(client: Client) {
        this.client = client

        this.client.getUserTag = this.getUserData.bind(this)

        this.client.on("raw", (event) => {
            switch (event.t) {
                case "GUILD_CREATE":
                    for (const member of event.d.members) {
                        this.handleMemberUserData(member.user)
                    }
                    break
                case "GUILD_MEMBER_ADD":
                    this.handleMemberUserData(event.d.user)
                    break
                case "GUILD_MEMBER_UPDATE":
                    this.handleMemberUserData(event.d.user)
                    break
            }
        })
    }

    private handleMemberUserData(user: UserData) {
        const oldUser = this.members.get(user.id)
        if (oldUser) {
            if (oldUser.primary_guild?.identity_guild_id !== user.primary_guild?.identity_guild_id){
                this.client.emit("userTagUpdate", oldUser, user)
            }
        }

        this.members.set(user.id, user)
    }

    private getUserData(userId: string): UserData {
        const member = this.members.get(userId) as UserData
        
        return member
    }
}

export { DiscordServerTag, UserData }