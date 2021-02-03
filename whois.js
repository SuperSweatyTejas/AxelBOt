client.on('message', message => {
 if(message.content.startsWith(prefix+'user-info')){
 
 if(message.mentions.users.size){
            let member=message.mentions.users.first()
        if(member){
            const emb=new Discord.MessageEmbed()
            .setImage(member.displayAvatarURL({dynamic: true}))
            .setTitle(member.username)
            .setDescription(`Username: ${member.username}\nID: ${member.id}  \n Created At ${member.createdAt} \n  Joined the server at ${message.guild.members.cache.get(member.id).joinedAt}
`)
            message.channel.send(emb)
          
        }
        else{
            message.channel.send("Sorry no one found with that name")
} 
}
}
})
