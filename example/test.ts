const config = {
    "USER_ID": "363402633752477696", // Replace with your user ID
    "TOKEN": "", // Replace with your bot token
}

import { Client, GatewayIntentBits } from "discord.js"
import { DiscordServerTag } from "../dist/index.js"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
    ],
})
new DiscordServerTag(client)

client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}`)

    const userData = client.getUserTag(config.USER_ID)
    if (userData) console.log(`User data for ${config.USER_ID}:`, "tag:", userData.primary_guild?.tag)
    else console.log(`No user data found for ${config.USER_ID}`)
})

client.on("userTagUpdate", (oldUser, newUser) => {
    console.log(`User tag updated from ${oldUser.primary_guild?.tag} to ${newUser.primary_guild?.tag} for user ${newUser.id}`)
})

client.login(config.TOKEN).catch(console.error)