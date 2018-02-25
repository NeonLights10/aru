/**
 * Aru
 * Guild Create Event
 */

const config = require('../config.json')

module.exports = function (bot, guild, member, logger) {
  if (config.messages.join_leave[guild.id]) {
    if (config.messages.join_leave[guild.id].channel_id && config.messages.join_leave[guild.id].join_message) {
      guild.channels.find((channel) => {
        if (channel.id === config.messages.join_leave[guild.id].channel_id) {
          bot.createMessage(config.messages.join_leave[guild.id].channel_id, config.messages.join_leave[guild.id].join_message)
        }
      })
    }
  }

  // Log event
  logger.info(new Date() + `: ${member.username}#${member.discriminator} has joined ${guild.name} ID#${guild.id}`)
}