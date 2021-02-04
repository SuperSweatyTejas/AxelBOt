
client.on('message', (message) => {
    if (message.content == '?bot') {

let botPing = client.ws.ping
            let newEmbed = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`${client.user.username} Info`, client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
                .addFields(

                    {
                        name: "Ping", value: botPing + " ms", inline: true,
                    },
                    {
                        name: "Bot Username", value: client.user.username, inline: true,
                    },
                    {
                        name: "Bot ID ", value: client.user.id, inline: true,
                    },
                    {
                        name: "Bot Created At", value: client.user.createdAt.toDateString(), inline: true,
                    },
                    {
                        name: "Users Size", value: client.users.cache.size, inline: true,
                    },
                    {
                        name: "Guilds Size", value: client.guilds.cache.size, inline: true,
                    },
                    {
                        name: "Channels Size", value: client.channels.cache.size, inline: true,
                    },
                )
                .setFooter(`Requested By : ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
            message.channel.send(newEmbed)
        }

    })
