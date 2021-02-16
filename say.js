  if (cmd === 'say') {
    
  if (!args.length) {
        return message.channel.send(`You didn't provide any message my bruv, ${message.author}!`);
    }
message.channel.send(`${args.join(' ')}`);
}
