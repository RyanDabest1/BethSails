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
        return message.channel.send("Hello There! We are going to set sail! Prepare yourselves!")
    }

    // if someone say =hello the bot will mention/ping him then say hello, how are you?
    if(cmd === `${prefix}hello`) {
        return message.reply("hello, how are you?")
    }

    if(cmd === `$[prefix]piratemovie`) {
        let embeds = new Discord.MessageEmbed()
        .setTitle("Here's the perfect website to watch movies for free!")
        .setURL("https://github.com/popcorn-official/popcorn-desktop/releases")
        .setColor("RANDOM")
        .setDescription("Beware tho, make sure you have a vpn just in case!")
        return message.channel.send({embeds : [embeds]})
    }

}) 
        
Client.login(process.env.token);
