const Discord = require('discord.js');

const Client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

Client.on("ready", async => {
    console.log(`${Client.user.username} is online!`)
    Client.user.setActivity("The sea", {type : 'WATCHING'})
})

        
Client.login(process.env.token);
