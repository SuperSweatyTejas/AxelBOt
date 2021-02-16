
if (cmd === 'warn') {
  if (!args.length) {
        return message.channel.send(`You didn't provide any reson my G ${message.author}!`);
    }
        let user = message.mentions.users.first();

     const member = message.guild.member(user);

     if(message.member.hasPermission('ADMINISTRATOR'))
    if (user) {
     message.delete();
  let hacker = (`${args.join(' ')}`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`${user} warned by ${message.author.username}`)
    .setDescription(`**Reason:** ${hacker}`)
    .setTimestamp(new Date())
              .setColor('#FFFFFF')
              .setAuthor(message.author.tag, message.author.avatarURL())
              message.channel.send(embed)
    }
               else {
        message.reply(`That user isn't in this server.`);
      }

    else {
      message.reply(`You didn't mention the user to kick.`);
    }
  
  }

