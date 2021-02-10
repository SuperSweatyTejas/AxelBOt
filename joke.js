
client.on("message", message => {
    if (message.content === "?joke") {
       const giveMeAJoke = require('discord-jokes');

        giveMeAJoke.getRandomDadJoke (function(joke) {
      message.channel.send(joke);
    });
    }
});
