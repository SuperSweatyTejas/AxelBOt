// change the channel name if want to use


//Welcome & goodbye messages\\
client.on('guildMemberAdd', member => {

    const welcomeEmbed = new Discord.MessageEmbed()

    welcomeEmbed.setColor('#WHITE')
    welcomeEmbed.setTitle('**' + member.user.username + '** Welcome, you are now our **' + member.guild.memberCount + '** member')
    welcomeEmbed.setImage(`https://media1.tenor.com/images/f34bea50ca38501af7608231fb2c7558/tenor.gif?itemid=16022297
`)

    member.guild.channels.cache.find(i => i.name === '🌌system-messages').send(welcomeEmbed)
})

client.on('guildMemberRemove', member => {
    const goodbyeEmbed = new Discord.MessageEmbed()

    goodbyeEmbed.setColor('WHITE')
    goodbyeEmbed.setTitle('**' + member.user.username + '**, Goodbye, we now have **' + member.guild.memberCount + '** members')
    goodbyeEmbed.setImage(`https://media1.tenor.com/images/55b7372087f5b67a5ed61da7f2a2d999/tenor.gif?itemid=13418631`)

    member.guild.channels.cache.find(i => i.name === '🌌system-messages').send(goodbyeEmbed)
})
