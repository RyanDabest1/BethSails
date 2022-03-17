const Discord = require('discord.js');

const config = require('./config.json');

const Client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const xpfile = require('./xp.json')

Client.on("ready", async => {
    console.log(`${Client.user.username} is online!`)
    Client.user.setActivity("The sea", {type : 'WATCHING'})
})

Client.on("messageCreate", async message => {
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

    if(cmd === `${prefix}movie`) {
        let embeds = new Discord.MessageEmbed()
        .setTitle("Here's the perfect website to watch movies for free!")
        .setURL("https://github.com/popcorn-official/popcorn-desktop/releases")
        .setColor("RANDOM")
        .setDescription("Beware tho, make sure you have a vpn just in case!")
        return message.channel.send({embeds : [embeds]})
    }

}) 


Client.on("message" ,function(message) {
    if(message.author.Client) return;
    var addXP = Math.floor(Math.random() * 10); //when i type addXP it will randomly choose a number between 1-10   [  Math.floor(Math.random() * 10)  ]
// lvl 1 statics
    if(!xpfile[message.author.id]) {
        xpfile[message.author.id] = {
           xp: 0,
           level: 1,
           reqxp: 50
        }
// catch errors
       fs.writeFile("./xp.json",JSON.stringify(xpfile),function(err){ 
        if(err) console.log(err)
       })
    }

    xpfile[message.author.id].xp += addXP

    if(xpfile[message.author.id].xp > xpfile[message.author.id].reqxp){
        xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp // it will subtrsct xp whenever u pass a lvl
        xpfile[message.author.id].reqxp *= 2 // XP you need to increase if level 1 is 100 xp so lvl 2 will 200 xp (multiplied by 2 [   .reqxp *= 2  ])
        xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp) // XP Round
        xpfile[message.author.id].level += 1 // it add 1 level when u level up

        message.reply("Congrats fello pirate! You ranked up! Level :**"+xpfile[message.author.id].level+"**!").then( 
            msg=>msg.delete({timeout: "10000"})
        )

    }
// catch errors
    fs.writeFile("./xp.json",JSON.stringify(xpfile),function(err){
        if(err) console/log(err)
    })

    if(message.content.startsWith(`${prefix}level`)){
        let user = message.mentions.users.first() || message.author

        let embed = new Discord.MessageEmbed()
        .setTitle("Level Card")
        .setColor("GREEN")
        .addField("Level: ",xpfile[user.id].level)
        .addField("XP: ", xpfile[user.id].xp+"/"+xpfile[user.id].reqxp)
        .addField("XP Required: ",xpfile[user.id].reqxp)
        message.channel.send(embed)
    }
})   
        
Client.login(process.env.token);
