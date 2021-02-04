
client.on('message', message =>{
  if(message.content.toLowerCase().startsWith(prefix + "simprate")) {
    let user = message.mentions.users.first();
    let userID = message.author.id
    const newEmbed = new Discord.MessageEmbed()
    .setColor('#WHITE')
    let number = Math.floor(Math.random() * 100);
    if (!user){
    newEmbed.setDescription(`**${message.author.tag}** after taking a measurment i can confirm that you are a  `+number+`% a simp`)
    .setTimestamp()
    } else {
      newEmbed.setDescription(`**${message.author.tag}** after taking a measurment i can confirm that ` +user.username+ ` is `+number+`% a simp`)
      .setTimestamp()
      .setFooter(`Requested By : ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
    }
    message.channel.send(newEmbed)
  
  }
  })
