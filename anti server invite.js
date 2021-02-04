// change the role id to use


client.on('message', async message => { 

if(message.content.includes('discord.gg')){ 

if(message.member.hasPermission("MANAGE_GUILD")) return; 

if(!message.channel.guild) return; 

message.delete() 

var command = message.content.split(" ")[0]; 

let muterole = message.guild.roles.cache.get( "796899726649851948"); 

if(!muterole){ 

try{ 

muterole = await message.guild.createRole({ 

name: "Timeout Corner", 

color: "#000000", 

permissions:[] 

}) 

message.guild.channels.forEach(async (channel, id) => { 

await channel.overwritePermissions(muterole, { 

SEND_MESSAGES: false, 

ADD_REACTIONS: false 

}); 

}); 

}catch(e){ 

console.log(e.stack); 

} 

} 

if(!message.channel.guild) return message.reply(' This command only for servers'); 

message.member.roles.add(['796899726649851948'])

const embed500 = new Discord.MessageEmbed() 

.setTitle("Muted Ads") 

.addField("** You Have Been Muted ** , **Reason  Sharing Another Discord Link**") 

.addField("Open a ticket if you wish to request an unmute")

.setColor("FFFFFF") 

.setAuthor(message.author.username) 

.setFooter(message.guild.name) 

message.channel.send(embed500) 




 

} 

})
