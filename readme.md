# discord-server-tag

A lightweight utility that extends the [discord.js](https://discord.js.org/) `Client` to:

- Emit a custom `userTagUpdate` event when a Discord user’s **Server Tag** changes.
- Provide a `getUserTag` method to retrieve a user’s current Server Tag information.

---

## ✨ Features

- ✅ Custom `userTagUpdate` event
- ✅ Utility method `client.getUserTag(userId)`
- ✅ Fully typed with TypeScript
- ✅ Works seamlessly with `discord.js`

---

## 📦 Installation

```bash
npm install discord-server-tag
```

## 🧠 Usage

```ts
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
```

## 🧩 TypeScript Support
The package extends the `discord.js` types:
```ts
declare module "discord.js" {
  interface ClientEvents {
    userTagUpdate: [oldUser: UserData, newUser: UserData];
  }

  interface Client {
    getUserTag: (userId: string) => UserData;
  }
}
```
## 🔍 What is Server Tag?
The Server Tag (`primary_guild.tag`) is an internal Discord field representing a user's identity within a specific server — typically shown when a server has identity enabled.

This library watches for `GUILD_CREATE`, `GUILD_MEMBER_ADD`, and `GUILD_MEMBER_UPDATE` events and compares the `identity_guild_id` to detect changes.


## License
This project is released into the public domain under the [Creative Commons Zero v1.0 Universal license (CC0-1.0).](https://creativecommons.org/publicdomain/zero/1.0/)

You can copy, modify, distribute, and use it for any purpose, without asking for permission.
