
if (cmd === 'poll') {
  if (!args.length) {
        return message.channel.send(`You didn't provide any thing to poll G ${message.author}!`);
    }
     message.delete();
const poll = client.channels.cache.find(channel => channel.id ==='802328922879950926');
  let hacker = (`${args.join(' ')}`)
    let embedPoll = new Discord.MessageEmbed()
        .setTitle('😲 New Poll! 😲')
        .setDescription(hacker)
        .setColor('WHITE')
         .setFooter(`Requested By : ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
        let msgEmbed = await poll.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }

})
