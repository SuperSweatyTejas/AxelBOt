const express = require("express")
const app = express()

const Discord = require('discord.js');
const client = new Discord.Client();

const antiad = require('./anti-ad.js')

 const prefix = "?"

client.on('ready', () => {
  console.log('I am ready!');
});


client.on("message", async message => {
    const prefix = "?";

    // If the author's a bot, return
    // If the message was not sent in a server, return
    // If the message doesn't start with the prefix, return
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // Arguments and command variable
    // cmd is the first word in the message, aka the command
    // args is an array of words after the command
    // !say hello I am a bot
    // cmd == say (because the prefix is sliced off)
    // args == ["hello", "I", "am", "a", "bot"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        // Send a message
        const msg = await message.channel.send(`🏓 Pinging....`);

        // Edit the message
         const timeTaken = Date.now() - message.createdTimestamp;
    
        msg.edit(`🏓 Pong!\nLatency is ${timeTaken}ms\nAPI Latency is ${timeTaken}ms`);
    }
})

client.login(process.env.TOKEN);

client.on('message', message => {
  if (message.content.toLowerCase() === '?pong') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.channel.send('Ping! `tip:` type ?ping to find out your current ping');
  }
});


//kick code
client.on('message', message => {
  // Ignore messages that aren't from a guild
   const modlog= client.channels.cache.find(channel => channel.id ==='796899727072821276');
  if (!message.guild) return;
  if(message.member.hasPermission('ADMINISTRATOR')) {
    if (message.content.startsWith('?kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick('`Optional reason that will display in the audit logs`')
          .then(() => {
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .then(() => {
            const kickembed = new Discord.MessageEmbed()
              .setTitle(`${message.author.username} kicked ${user.tag}`)
              .setAuthor(user.tag, user.avatarURL())
              .setFooter(message.author.id)
              .setTimestamp(new Date())
              .setColor('#FFFFFF')
            modlog.send(kickembed)
          })
      } 
      else {
        message.reply(`That user isn't in this server.`);
      }
    } 
    else {
      message.reply(`You didn't mention the user to kick.`);
    }
  
  }
  }
});

//ban command
client.on('message', message => {
  // Ignore messages that aren't from a guild
   const modlog= client.channels.cache.find(channel => channel.id ==='796899727072821276');

  if (!message.guild) return;
  if(message.member.hasPermission('ADMINISTRATOR')) {
    if (message.content.startsWith('?ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`);
          })
          .then(() => {
            const banembed = new Discord.MessageEmbed()
              .setTitle(`${message.author.username} banned ${user.tag}`)
              .setAuthor(user.tag, user.avatarURL())
              .setFooter(message.author.id)
              .setTimestamp(new Date())
              .setColor('#FFFFFF')
            modlog.send(banembed)
          })
      } 
      else {
        message.reply(`That user isn't in this server.`);
      }
    } 
    else {
      message.reply(`You didn't mention the user to ban.`);
    }
  
  }
  }
});


client.on('message', message => {
  if (message.content.toLowerCase() === '?invite') {
    message.channel.send('https://discord.gg/jMswK6BfSX');
  }
});



client.on('message', message => {
  if (message.content.toLowerCase() === '?ip') {
    message.channel.send('```The Ip to Connect to Axel Kraft is _____```');
  }

});

//blacklisted words
client.on('message', message => {
//Space Remover
  message.content = message.content.replace(/\s/g,'')
  const automodlog= client.channels.cache.find(channel => channel.id ==='796899727072821276');
  //
  //blacklisted words
  let blacklisted = ['nigga', 'nibba', 'nigger', 'nibber', 'dick', 'niqqua', 'niqqa', 'nicca', 'nica', 'niba', 'retard', 'porn']
  let foundInText = false
    for (var i in blacklisted) {

    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) 
      foundInText = true; 
    }
  if (foundInText == true){

   message.delete()
   message.channel.send("```Please Don't Use Blacklisted Words.```")
        .then(message => {
    message.delete({ timeout: 5000 })
   })

   const blacklistembed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username} used a blacklisted word in ${message.channel.name}`)
    .setAuthor(message.author.username, message.author.avatarURL())
    .setFooter(message.author.id)
    .setTimestamp(new Date())
    .setColor('#FFFFFF')
    .addFields(
      {name: 'Full Message:', value: `${message.content}`}
  );
  automodlog.send(blacklistembed);
  }
})

//mute command
client.on('message', message => {
  if (message.content.startsWith('?mute')) {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const role = message.guild.roles.cache.find(role => role.name === 'Timeout Corner');
      const member = message.mentions.members.first();
      member.roles.add(role);
      message.channel.send('```This User Has Sucessfully Been Muted```');

    } else {
      message.channel.send("```uhhh...Mention Who To Mute Bruh```")
    }
  }
})

//unmute command
client.on('message', message => {
  if (message.content.startsWith('?unmute')) {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const role = message.guild.roles.cache.find(role => role.name === 'Timeout Corner');
      const member = message.mentions.members.first();
      member.roles.remove(role);
      message.channel.send('```This User Has Sucessfully Been Unmuted```');

    } else {
      message.channel.send("```Please Mention Who To Mute```")
    }
  }
})


module.exports = (client) => {
  const channelId = '796899726673838086' // welcome channel
  const targetChannelId = '797091326004690964' //about

  client.on('guildMemberAdd', (member) => {
    const message = `Please welcome < @$ {member.id} > to the server!Please check out $ {member.guild.channels.cache}`
      .get(targetChannelId)
      .toString()
  })

  const channel = member.guild.channels.cache.get(channelId)
  channel.send(message)
}


//Purge Command
client.on('message', message => {
  let command = '?purge';
  if (message.content.startsWith(command) && message.member.hasPermission('ADMINISTRATOR')) { //look for command in message

    //check the end of the message for the amount
    let amount = parseInt(message.content.slice(command.length));

    if (isNaN(amount)) {
      message.reply('Please Specify an amount of messages to purge.');
    } if (amount < 1 || amount > 1000) {
      message.reply(`I can't purge more then 1000 messages, or messages older then 2 weeks, sorry.`);
    }
    if (amount > 1 || amount < 1000) {
      message.channel.bulkDelete(amount + 1);
      message.channel.send(amount + ` messages have been deleted.`)
        .then(message => {
          message.delete({ timeout: 3000 })
        })
    }
  }
})


client.on('message', message => {
  if (message.content.startsWith('?help')) {
    const commandEmbed = new Discord.MessageEmbed()
      .setColor('#f8f8ff')
      .setTitle('Help')
      .setAuthor('AxelKraft', 'https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
      .setDescription('Here is a list of all the AxelBot Commands.')
      .setThumbnail('https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
      .addFields(
        { name: 'Bot Malfunctioning', value: 'Ping, Ansh, Tejas, ErrorDisk, or Kroan.', incline: true },
        { name: '?Commands', value: 'Gives a full list of all commands our bot has to offer', incline: true },

      )
      .setTimestamp()
      .setFooter('Thanks For Using AxelBot!', 'https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg');

    message.channel.send(commandEmbed);
  }
})

client.on('message', message => {
  if (message.content.startsWith('?commands'))
    if (message.member.hasPermission('MANAGE_SERVER')) {
      const commandEmbed = new Discord.MessageEmbed()
        .setColor('#f8f8ff')
        .setTitle('Help')
        .setAuthor('AxelBot', 'https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
        .setDescription('Here is a list of all the Axelbot Bot Commands.')
        .setThumbnail('https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
        .addFields(
          { name: '?ping / ?pong', value: 'A simple command, returns the word "Pong" and gives your current ping in relation to the bot.', incline: true },
          { name: '?commands', value: 'Gives a full list of all commands our bot has to offer', incline: true },
          { name: '?about', value: 'Gives some general information about our server', inline: true },
          { name: '?tickets', value: 'Sends a reactable embed in which you can react to open a ticket', incline: true },
          { name: '?ticketclose', value: 'Deletes the ticket you send the command in (only works in tickets).', incline: true },
          { name: '?purge', value: 'Deletes the number of messages you put after the command, up to 1000 messages.', incline: true },
          { name: '?kick', value: 'Allows staff to kick a member via a command mentioning the user __requires Kick Members Permission__', incline: true },
          { name: '?ban', value: 'Allows staff to ban any user mentioned __requires Ban Members Permission__', incline: true },
          { name: '?mute', value: 'Mutes any user mentioned, making sure they cannot send messages __requires Manage Roles Permission__', incline: true },
          { name: '?unmute', value: 'Unmutes any currently muted members, giving them the ability to send messages again. __requires Manage Roles Permission__', incline: true },
          { name: '?rules', value: 'A short commands that allows you to be sent a copy of the Server rules', incline: true },
          { name: '?verify', value: 'Sends a embed explaining how a user can verify themselves', incline: true },
          { name: '?ip', value: 'Sends the IP of AxelKrafts Java Server', incline: true },
          { name: '?memberverify', value: 'Sends a embed with a reactable message that will grant the user the verified role', incline: true },
          { name: '?rules', value: "sends a short embed of the server rules", incline: true },
          { name: "?lockdown", value: "Locks the channel, prevents users from chatting", incline: true}, { name: "?lockserver", value: "Locks the whole server, prevents users from chatting in all channels", incline: true}, { name: "?unlockserver", value: "unlocks the server and allows users to chat", incline: true}, { name: "?unlock", value: "unlocks the channel and allows users to chat", incline: true}, { name: "?memberverify", value: "Sends an embed where users can react to get member role", incline: true}, { name: "?shortcuts", value: "Sends an Embed describing discord shortcuts", incline: true}, { name: "?roles", value: "Sends Embed that describes all roles in the server", incline: true},{ name: "?join", value: "joins AxelBot to VC", incline: true},{ name: "?leave", value: "Disconnects AxelBot from VC", incline: true},{ name: "?avatar", value: "Sends an Embed with the mentioned users avatar", incline: true},{ name: "?apply", value: "Sends an application link and a messaged describing how to apply", incline: true},
        )
        .setTimestamp()
        .setFooter('Thanks for using AxelBot');

      message.channel.send(commandEmbed);
    }
})

const ticketText = new Discord.MessageEmbed()
  .setColor('e6e2ed')
  .setTitle('Tickets')
  .setDescription("React with the :ticket: in order to open up a ticket.")
  .setFooter('Enjoy The Server!')

client.on('message', message => {
  if (message.content.toLowerCase() === '?tickets') {
    if (message.member.hasPermission("MANAGE_ROLES")) {
      message.channel.send(ticketText).then(sent => sent.react('🎫'))
        .then(console.log)
        .catch(console.error);
    }
    else {
      message.channel.send("How did you even know that was a command?  Anyway, you can't use it.")
    }
  }
});


client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id == ('800036724305690624')){
    if(reaction.emoji.name === ("🎫")){
      await reaction.message.guild.channels.create(`ticket-${reaction.message.guild.members.cache.get(user.id)}`, { //Create a channel
        type: 'text', parent: '799756925394747402',  //Make sure the channel is a text channel
        permissionOverwrites: [
          { //Set permission overwrites
            id: reaction.message.guild.members.cache.get(user.id),
            allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS'],
          },
          {
            id: "796899726649851951",
            deny:['SEND_MESSAGES'],
            allow:['VIEW_CHANNEL'],
          },
          {
            id: reaction.message.guild.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: "796899726649851951",
            allow: ['VIEW_CHANNEL'],
          }]
        })
      }
    }
});

//close Ticket
client.on('message', message => {
  if (message.content.startsWith('?ticketclose')) {
    if (message.member.hasPermission('MANAGE_CHANNELS')) {
      message.channel.delete();
    }
    else (message.channel.send("This isn't your ticket, thus you cannot close this channel"))
  }
})


//lockdown command
client.on('message', message => {
  if (message.content.startsWith('?lockdown')) {
    if (message.member.hasPermission('MANAGE_SERVER')) {
      message.channel.overwritePermissions([
        { //Set permission overwrites
          id: message.guild.id,
          deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: "796899726636351562",
          allow: ['VIEW_CHANNEL'],
        },
        {
          id: '796899726649851951',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
      ])
      message.channel.send('This channel has been locked down.')
    }
    else return (message.channel.send("You cannot lockdown the server."))
  }
})

//unlockdown command
client.on('message', message => {
  if (message.content.startsWith('?unlock')) {
    if (message.member.hasPermission('MANAGE_SERVER')) {
      message.channel.overwritePermissions([
        { //Set permission overwrites
          id: message.guild.id,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: "796899726636351562",
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
        {
          id: '796899726649851951',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
      ])
      message.channel.send('This channel has been unlocked.')
    }
    else (message.channel.send("You cannot unlock the channel."))
  }
})



client.on('message', message => {
  if (message.content.startsWith('?verify'))
    if (message.member.hasPermission('MANAGE_SERVER')) {
      const commandEmbed = new Discord.MessageEmbed()
        .setColor('#f8f8ff')
        .setTitle('Gain Access')
        .setAuthor('AxelBot', 'https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
        .setDescription('Instructions on how to verify')
        .setThumbnail('https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
        .addFields(
          { name: 'Instructions', value: 'React with the message that Axelbot has sent in this channel, if you react, that means that you agree to the rules, if you break them you are responsible for the consequences that  follow', inline: true },
        )
        .setTimestamp()
        .setFooter('Thanks for using AxelBot');

      message.channel.send(commandEmbed);

    }
})

//Full server lockdown
client.on('message', message => {
  if (message.content.startsWith('?lockserver')) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.guild.roles.everyone.setPermissions(['VIEW_CHANNEL']);
      message.channel.send('The Server has been locked down.')
    }
    else return (message.channel.send("You cannot lockdown the server."))
  }
})

//Full server unlock
client.on('message', message => {
  if (message.content.startsWith('?unlockserver')) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.guild.roles.everyone.setPermissions(['VIEW_CHANNEL', 'SEND_MESSAGES']);
      message.channel.send('The Server has been unlocked.')
    }
    else return (message.channel.send("You cannot unlock the server."))
  }
})

client.on('message', message => {
  if (message.content.startsWith('?rules')) {
    const commandEmbed = new Discord.MessageEmbed()
      .setColor('#f8f8ff')
      .setTitle('Rules')
      .setAuthor('AxelBot', 'https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
      .setDescription('The Rules of the AxelKraft Discord Server')
      .setThumbnail('https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
      .addFields(
        { name: 'Server Rules', value: '`1.` Please do not initiate fights between our members \n`2.` No DDosing or sending suspicious links  **this is against the law** \n`3.`Follow Discord TOS this includes being above 13 years of age \n`4.` No trying to retaliate towards a staff member, if you genuinly belive a staff member has treated you unfiarly, contact an owner or another staff \n`5.` Do not spam bot commands in general chats \n`6.` Be nice, do not harass any individuals in this server \n`7.` Do not spam or send repeated text \n`8.`No excessive cursing or use of any slurs of any kind \n `Discord Tos`:  https://discord.com/terms \n `note:` First offense will be a warning, second will be a kick and third will be a ban', inline: true },
      )
      .setTimestamp()
      .setFooter('Thanks for using AxelBot');

    message.channel.send(commandEmbed);
  }
})

//reaction roles (member/good person)
const reactions = []

const emojiText = new Discord.MessageEmbed()
  .setColor('e6e2ed')
  .setTitle('Welcome')
  .setDescription("React with the :white_check_mark: if you are new and want to get full access to the server, please keep in mind that this is an agreement to the rules Also, don't to do ?ip to learn how to connect to the Minecraft Server!")
  .setFooter('Enjoy The Server!')

client.on('message', message => {
  if (message.content.toLowerCase() === '?memberverify') {
    if (message.member.hasPermission("MANAGE_ROLES")) {
      message.channel.send(emojiText).then(sent => sent.react('✅'))
        .then(console.log)
        .catch(console.error);
    }
    else {
      message.channel.send("How did you even know that was a command?  Anyway, you can't use it.")
    }
  }
});
client.on('message', message => {
  // Role define
  client.channels.cache.get('796899727231811606')
  // React Role 
  const reactrole = message.guild.roles.cache.find(roles => roles.name === "796899726636351562");
})

client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == ('796899727231811606')) {
        if(reaction.emoji.name === ("✅")){
          await reaction.message.guild.members.cache.get(user.id).roles.add("796899726636351562");
          await reaction.message.guild.members.cache.get(user.id).roles.add("796899726636351562");
        }
      }
  }

)
const Database = require("@replit/database")


client.on('message', message => {
  if (message.content.startsWith('?shortcuts')) {
    const shortcutEmbed = new Discord.MessageEmbed()
      .setColor('#f8f8ff')
      .setTitle('Discord Shortcuts')
      .setDescription('Here is a list of some commonly used discord shortcuts.')
      .addFields(
        { name: 'Bolded Text', value: '`* * Message * *`', incline: true },
        { name: 'Italicized Text', value: '`* Message *`', incline: true },
        { name: 'Bold Italicized Text', value: '`* * * Message * * *`', incline: true },
        { name: 'Underlined Text', value: '`_ _ message _ _`', incline: true },
        { name: 'Crossed Out Text', value: '`~ ~ Message ~ ~`', incline: true },
      )
      .setFooter('Thanks For Using AxelBot! Check out this website for more shortcuts: https://www.writebots.com/discord-text-formatting/');
    message.channel.send(shortcutEmbed);
  }
})



client.on('message', message => {
  antiSpam.on('warnAdd', (member) => {
    member.roles.add('796899726649851948')
    setTimeout(() => {
      member.roles.remove('796899726649851948');
    }, 120000); // time in ms
  })
});

client.on('message', (msg) => {
  antiSpam.message(msg);
});



client.on('ready', () => {
  // Set bot status to: "Playing with JavaScript"
  client.user.setActivity("?help", { type: "LISTENING" })
  // Alternatively, you can set the activity to any of the following:
  console.log("Hello I am AxelBot.")
  // PLAYING, STREAMING, LISTENING, WATCHING
  // For example:
  // client.user.setActivity("TV", {type: "WATCHING"})
})

//roles
client.on('message', message => {
    if(message.content.startsWith('?roles')){
    const rolesEmbed = new Discord.MessageEmbed()
	    .setColor('#e6e2ed')
	    .setTitle('Server Roles')
	    .setAuthor('AxelBot', 'https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
	    .setDescription('A breakdown on the roles of the AxelKraft Server.')
	    .setThumbnail('https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
	    .addFields(
	    	{ name: 'Owner', value: 'The Owners of the discord and minecraft server', inline: false },
        {name: 'Co-Owner', value: `The Co-Owners of AxelKraft and Basically have the same duties as the Owners`, inline: false},
        {name: 'Admins and Mods(staff)', value: `People in charge of moderation`, inline: false},
        {name: 'Web Devs & Bot Devs', value: `The people who work on building our server bots and the AxelKraft Website`, inline: false},
        {name: 'Server Booster', value: `Very cool people who decide to spend money to boost our server, this gives us access special perks for the server such as animated icons, and more emojis!`, inline: false},
        {name: 'Partnered', value: 'official partnered sevrers that are able to advertise themselves in #partnered', inline: false},
        {name: 'Champion', value: 'Given to people who purchased the in-game rank _champion_', inline: false},
        {name: 'VIP', value: 'Given to people who purchased the in-game rank _VIP_', inline: false},
        {name: 'Level ranks', value: 'These are just extra roles that show your active levels in the server, you are given a new level role when you level up', inline: false},
        {name: 'verified Members', value: 'basic role for users that have completed the member verification(required)', inline: false},
      
      )
    	.setTimestamp()
    	.setFooter('Enjoy the server!');

    message.channel.send(rolesEmbed);
  }
})


//roles
client.on('message', message => {
    if(message.content.startsWith('?ElitePartner')){
    const rolesEmbed = new Discord.MessageEmbed()
	    .setColor('#e6e2ed')
	    .setTitle('Server Partner')
	    .setAuthor('AxelBot', 'https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
	    .setDescription('Elite Server')
	    .setThumbnail('https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
	    .addFields(
	    	{ name: "Elite", value:'Our First Partner is elite, Elite is a server that We have been in for over 4 months and its great,, you can meet other people from around the world...if you are having problems, go ahead and talk about it to any of the amazing members and let go of all your stresses. Theres many fun channels and bots you can use! Go ahead and join em, theyd love to have you!' , inline: false},
      
        {name: "server invite", value: 'https://discord.gg/7VBJ7YavBJ', incline: true},

      )
    	.setTimestamp()
    	.setFooter('Enjoy the server!');

    message.channel.send(rolesEmbed);
  }
})


client.on('message', message => {
  if (message.content.toLowerCase() === '?eliteinvite') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.channel.send('discord.gg/R7xuEVYMgD');
  }
});




client.on('message', message => {
    if(message.content.startsWith('?about')){
    const rolesEmbed = new Discord.MessageEmbed()
	    .setColor('#e6e2ed')
	    .setTitle('About Us')
	    .setAuthor('AxelBot', 'https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
	    .setDescription('About AxelKraft')
	    .setThumbnail('https://cdn.discordapp.com/attachments/798580798222762014/799825902552481812/Monogram-AB-Logo-Design-by-Greenlines-Studios-580x386.jpg')
	    .addFields(
	    	{ name: "About", value:'Hello, we are a small minecraft server run by a few people who wanna have fun, do ?ip to learn how to connect' , inline: false},
      )
    	.setTimestamp()
    	.setFooter('Enjoy the server!');

    message.channel.send(rolesEmbed);
  }
})

//join Script
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content === '?join') {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});
//leave script
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content === '?leave') {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.leave();
    } else {
      message.reply('Im not in VC currently');
    }
  }
});
  
    DisTube = require('distube'),
config = {
        prefix: "?"
};

const antiLink = require("anti-link-discord")

// Module Setup
client.on('message', async message => {
      antiLink(client, message, {
            staffRole: "796899726649851951", // staff/admin/mod role id (will ignore this role)
            warnMSG: `<@${message.author.id}> don't send links!`, // warn message
        });                  
});

client.on('guildMemberRemove', member => {

  const channel = member.guild.channels.cache.find(ch => ch.name === '🌌system-messages');

  if (!channel) return;
  channel.send(`${member} has left, 😭`);
});


const addReactions = (message, reactions) => {
  message.react(reactions[0])
  reactions.shift()
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750)
  }
}

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id)

  channel.messages.fetch().then((messages) => {
    if (messages.size === 0) {
      // Send a new message
      channel.send(text).then((message) => {
        addReactions(message, reactions)
      })
    } else {
      // Edit the existing message
      for (const message of messages) {
        message[1].edit(text)
        addReactions(message[1], reactions)
      }
    }
  })
}

// message delete log
client.on('messageDelete', message => {
const messagelog = client.channels.cache.find(channel => channel.id ==='796899727072821276');
const deleteembed = new Discord.MessageEmbed()
  .setTitle(`Message Deleted in ${message.channel.name}`)
  .setAuthor(message.author.username, message.author.avatarURL())
  .setFooter(message.author.id)
  .setTimestamp(new Date())
  .setColor('#FFFFFF')
  .addFields(
    {name: 'Message Deleted', value: `${message.content}`, inline: false},
  );
  messagelog.send(deleteembed);
});

// message edit log
client.on('messageUpdate', (oldMessage, newMessage) => {
const messagelog = client.channels.cache.find(channel => channel.id ==='796899727072821276');
if (oldMessage.content === newMessage.content){
  return;
}
const editembed = new Discord.MessageEmbed()
  .setTitle(`Message Edited in ${newMessage.channel.name}`)
  .setAuthor(newMessage.author.username, newMessage.author.avatarURL())
  .setFooter(newMessage.author.id)
  .setTimestamp(new Date())
  .setColor('#FFFFFF')
  .addFields(
    {name: 'Before:', value: `${oldMessage.content}`, inline: false},
    {name: 'After:', value: `${newMessage.content}`, inline: false},
  );
  messagelog.send(editembed);
});

client.on('message', message => {
if(message.content.startsWith(prefix+'avatar')){
    
        
        if(message.mentions.users.size){
            let member=message.mentions.users.first()
        if(member){
            const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL({dynamic: true}))
            .setTitle(member.username)
            message.channel.send(emb)
            
        }
        else{
            message.channel.send("Sorry no one found with that name")

        }
        }else{
            const emb=new Discord.MessageEmbed().setImage(message.author.displayAvatarURL()).setTitle(message.author.username)
            message.channel.send(emb)
        }
}
})

client.on('message', message => {
if(message.content.startsWith(prefix+'rickroll')) {
                message.delete();
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle("Free V-bucks!!!")
                    .setColor("WHITE")
                    .setDescription(`Click [here](https://www.youtube.com/watch?v=dQw4w9WgXcQ) for **__FREE__** 10000 V-bucks!!!`)
                    .setFooter("Not fake!!")
                )
            }
})

client.on('message', message => {
if(message.content.startsWith(prefix+'apply')) {
                message.delete();
                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle("Apply For staff")
                    .setColor("WHITE")
                    .setDescription(`If you are interested in become a bot dev, web dev, server staff, or a discord staff please visit the google forum linked below.if you dont receive a dm back whiten 14 days, consider that you are rejected Click [here](https://docs.google.com/forms/d/e/1FAIpQLSf65bZTS0StHHHLrh-JXHLE6OTpIKY0nOb_QxPeMD_5moGrMw/viewform?usp=sf_link) for application`)
                    .setFooter("Good Luck")
                )
            }
})

client.on('message', message => {
if(message.content.startsWith(prefix+'stfu')) {
                message.delete();
                message.channel.send("https://tenor.com/view/shut-up-man-will-you-gif-18636332")
}
})

client.on('message', message => {
 if(message.content.startsWith(prefix + "server")){ 
    if (message.author.bot || !message.guild) return message.reply("this command for server only")
    var EMBED = new Discord.MessageEmbed()
    .setTitle("server info")
    .addField("server name 🎗️", `${message.guild.name}`)
    .addField("server id 🆔", `${message.guild.id}`)
    .addField("members 👥", `${message.guild.memberCount}`)
    .addField("Server roles 🔐", `${message.guild.roles.cache.size}`)
.addField(" channels 💬", `  ${message.guild.channels.cache.filter(r => r.type === "text").size} Text
      ${message.guild.channels.cache.filter(r => r.type === "voice").size} Voice`)
    .addField("server region 🌍", `${message.guild.region}`)  
    .addField("Verification Level 📑", `${message.guild.verificationLevel}`)
.addField("created in 📆 ", `${message.guild.createdAt.toLocaleString()}`)
.addField("Boosts ✨", `${message.guild.premiumSubscriptionCount}`)
.setColor("WHITE")
.setFooter(`Requsted by ${message.author.username}`)
.setThumbnail(message.guild.iconURL({ dynamic: true }))
    message.channel.send(EMBED)
  }
})

client.on('message', message => {
 if(message.content.startsWith(prefix+'user-info')){
 
 if(message.mentions.users.size){
            let member=message.mentions.users.first()
        if(member){
            const emb=new Discord.MessageEmbed()
            .setImage(member.displayAvatarURL({dynamic: true}))
            .setTitle(member.username)
            .setDescription(`Username: ${member.username}\nID: ${member.id}  \n Created At ${member.createdAt} \n  Joined the server at ${member.joinedAt}`)
            message.channel.send(emb)
          
        }
        else{
            message.channel.send("Sorry no one found with that name")
} 
}
}
})


client.on('message', message => {
if(message.content.startsWith(prefix+'docs')) {
                message.channel.send("https://discord.js.org/#/docs/main/stable/general/welcome")
}
})

client.on('message', message => {
if(message.content.startsWith(prefix+'beats')) {
                message.delete();
                message.channel.send("https://cdn.discordapp.com/attachments/507352572248588302/803723837509992500/Bells_Fiesta_Mariachi.mp4")
}
})

client.on('message', message => {
if(message.content.startsWith(prefix+'deeppoetry')) {
                message.delete();
                message.channel.send("https://cdn.discordapp.com/attachments/799706075271004170/805167086590361650/unknown.png")
}
})

client.on('message', message =>{
  if(message.content.toLowerCase().startsWith(prefix + "pp")) {
    let user = message.mentions.users.first();
    let userID = message.author.id
    const newEmbed = new Discord.MessageEmbed()
    .setColor('#WHITE')
    let number = Math.floor(Math.random() * 15);
    if (!user){
    newEmbed.setDescription(`**${message.author.tag}** after taking a measurment i can confirm that you have `+number+` inches.`)
    .setTimestamp()
    } else {
      newEmbed.setDescription(`**${message.author.tag}** after taking a measurment i can confirm that `+user.username+` have `+number+` inches.`)
      .setTimestamp()
    }
    message.channel.send(newEmbed)
} else {
  if(message.content.toLowerCase() === prefix + "help pp") {
    const newEmbed = new Discord.MessageEmbed()
    .setColor('#00B2B2')
    .setTitle('**PP Help**')
    newEmbed.setDescription('This command rates people by their inches for example `${prefix}dick @user` or if u want to rate yourself say `${prefix}dick`')
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp();
    message.channel.send(newEmbed)
  }
}})


client.on('message', message =>{
  if(message.content.toLowerCase().startsWith(prefix + "iq")) {
    let user = message.mentions.users.first();
    let userID = message.author.id
    const newEmbed = new Discord.MessageEmbed()
    .setColor('#WHITE')
    let number = Math.floor(Math.random() * 200);
    if (!user){
    newEmbed.setDescription(`**${message.author.tag}** after taking a measurment i can confirm that you have a iq of `+number+` stupid.`)
    .setTimestamp()
    } else {
      newEmbed.setDescription(`**${message.author.tag}** after taking a measurment i can confirm that `+user.username+` has an iq of `+number+` stupid.`)
      .setTimestamp()
    }
    message.channel.send(newEmbed)
} else {
  if(message.content.toLowerCase() === prefix + "help iq") {
    const newEmbed = new Discord.MessageEmbed()
    .setColor('#00B2B2')
    .setTitle('**PP Help**')
    newEmbed.setDescription('This command rates people by their IQ for example `${prefix}iq @user` or if u want to rate yourself say `${prefix}iq`')
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp();
    message.channel.send(newEmbed)
  }
}})

client.on('message', message => {
if(message.content.startsWith(prefix+'beta')) {
                message.delete();
                message.channel.send("https://tenor.com/view/beta-jesse-lee-peterson-gif-15785063")
}
})

const yuricanvas = require("yuri-canvas");
 
 client.on("?trigger", async (message) => {
    if (message.author.bot) return;
    if (message.content === "?trigger") {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await yuricanvas.trigger(avatar);
        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);
    }
    if (message.content === "?delete") {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await yuricanvas.delete(avatar);
        let attachment = new Discord.MessageAttachment(image, "deleted.png");
        return message.channel.send(attachment);
        }
          });


client.on('guildMemberAdd', member => {

  const channel = member.guild.channels.cache.find(ch => ch.name === '🌌system-messages');

  if (!channel) return;
  channel.send(`Welcome to the server, ${member}! 😎`);
});


const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
  warnThreshold: 4, // Amount of messages sent in a row that will cause a warning.
  kickThreshold: 5,
  banThreshold: 8, // Amount of messages sent in a row that will cause a ban.
  maxInterval: 2000, // Amount of time (in ms) in which messages are cosidered spam.
  warnMessage: "{@user} has been muted for 2 minutes, don't spam", // Message will be sent in chat upon warning.
  banMessage: "**{user_tag}** has been banned for spamming 50 messages in 5 seconds holy dude.", // Message will be sent in chat upon banning.
  maxDuplicatesWarning: 3, // Amount of same messages sent that will be considered as duplicates that will cause a warning.
  maxDuplicatesBan: 6, // Amount of same messages sent that will be considered as duplicates that will cause a ban.
  deleteMessagesAfterBanForPastDays: 1, // Amount of days in which old messages will be deleted. (1-7)
  exemptPermissions: [], // Bypass users with at least one of these permissions
  ignoreBots: true, // Ignore bot messages.
  verbose: false, // Extended Logs from module.
  ignoredUsers: [], // Array of string user IDs that are ignored.
  ignoredRoles: ['788820930397732890', '788820930397732885'], // Array of string role IDs or role name that are ignored.
  ignoredGuilds: [], // Array of string Guild IDs that are ignored.
  ignoredChannels: [] // Array of string channels IDs that are ignored.
});

const prompter = require('discordjs-prompter');
 
client.on('message', msg => {
  // Listen for a message starting with !foo
 
  if (msg.content.startsWith('?foo')) {
    // Prompts the user if wether they like bacon or not
 
    prompter
      .message(msg.channel, {
        question: 'Do you like bacon?',
        userId: msg.author.id,
        max: 1,
        timeout: 10000,
      })
      .then(responses => {
        // If no responses, the time ran out
        if (!responses.size) {
          return msg.channel.send(`No time for questions? I see.`);
        }
        // Gets the first message in the collection
        const response = responses.first();
 
        // Respond
        msg.channel.send(`**${response}** Is that so?`);
      });
  }
});

client.on('message', message =>{
  if(message.content.toLowerCase().startsWith(prefix + "partner")) {
    const newEmbed = new Discord.MessageEmbed()
    .setColor('#WHITE')
    .setTitle("Partnerships")
    newEmbed.setDescription(`How to Partner, to partner create a ticket in the ticket channel`)
    message.channel.send(newEmbed)
    }
})

 client.on('message', message => {
  if(message.content.toLowerCase().startsWith(prefix + "quote")) {
const { randomQuote } = require('randomquote-api')
const embed = new Discord.MessageEmbed()
.setDescription(`Quote : ${randomQuote.quote} \n Said by : ${randomQuote.by} `)
.setColor('WHITE')

return message.channel.send(embed)
}
  }
 )

 const memes = require('discord-memes');
client.on('message', (message) => {
    if (message.content == '?putin') {
        message.channel.send(memes.putin())
    }
});




client.on("message", async message => {
    if (message.content === '?meme') { //You can set name of your command
        const subReddits = ["me_irl, dankmeme, funny, meme"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        message.channel.send (`http://reddit.com/r/${random}`)
    }
})