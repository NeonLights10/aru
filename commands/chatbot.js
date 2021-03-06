/**
 * Aru
 * Chatbot Command
 */

// Setup files and modules
const axios = require('axios')

module.exports = function (bot, logger) {
  bot.registerCommand('c', (msg, args) => {
    // Make GET request
    axios
      .get(`http://api.program-o.com/v2/chatbot/?bot_id=6&say=${args}&convo_id=discordaru_${msg.author.id}&format=json`)
      .then(response => {
        // Create message
        bot.createMessage(msg.channel.id, `**${msg.author.username}#${msg.author.discriminator}:** ${response.data.botsay.replace('Program-O', bot.user.username)}`)

        // Log command usage
        logger.info(new Date() + `: Chat command used by ${msg.author.username}#${msg.author.discriminator} in ${msg.channel.guild.name} with args ${args}`)
      })
      .catch(error => {
        // Test to see if user put in args
        if (!args[0]) {
          bot.createMessage(msg.channel.id, 'Please put in a message following `c` to chat with the bot. ')
        } else {
          bot.createMessage(msg.channel.id, 'Not feeling like talking :slight_frown: ')
        }

        // Log command usage
        logger.info(new Date() + `: FAILURE: Chat command used by ${msg.author.username}#${msg.author.discriminator} in ${msg.channel.guild.name} with args ${args} + ${error}`)
      })
  }, {
    guildOnly: true
  })
}
