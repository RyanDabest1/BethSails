const Discord = require('discord.js');

const config = require('./config.json');

const Client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

Client.on("ready", async => {
    console.log(`${Client.user.username} is online!`)
    Client.user.setActivity("The sea", {type : 'WATCHING'})
})

Client.on("message", async message => {
    if(message.author.Client || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)


    // If Someone Send =hi the bot will respond by Hello There!
    if(cmd === `${prefix}hi`) {
        return message.channel.send("Hello There!")
    }

    // if someone say =hello the bot will mention/ping him then say hello, how are you?
    if(cmd === `${prefix}hello`) {
        return message.reply("hello, how are you?")
    }

}) 
        
Client.login(process.env.token);
