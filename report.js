
if (cmd === 'report') {
  if (!args.length) {
        return message.channel.send(`You didn't provide any people to report my guy, ${message.author}!`);
    }
     message.delete();
     const reportlog = client.channels.cache.find(channel => channel.id ==='809583413731262525');
  let hacker = (`${args.join(' ')}`)
    const reportembed = new Discord.MessageEmbed()
    .setTitle("Hacker")
    .setDescription(hacker)
              .setColor('#FFFFFF')
              .setAuthor(message.author.tag, message.author.avatarURL())
                .setTimestamp(new Date())

              reportlog.send(reportembed)
               
}
