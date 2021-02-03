// add in mongo DB URL IN DB_URL


client.on('message', async (message) => { // make the function asynchronous and add await
    const level = await xp.getLevel(message)
    const userxp = await xp.getXP(message)
    await xp.giveXP(message);
    if (message.content === "?level") message.channel.send(`You are on level ${level} and have ${userxp} XP`)
    if (message.content === "?leaderboard") {
        let lb = await xp.leaderboard(message.guild.id, {limit: 10, raw: false});
        const embed = new Discord.MessageEmbed()
        .setTitle("Leaderboard")
        .setColor("BLURPLE")
        lb.forEach(m => {
            embed.addField(`${m.position}. ${client.users.cache.get(m.id).tag}`, `Level: ${level}\n XP: ${m.xp}`)
        })
        message.channel.send(embed);
    }
})
