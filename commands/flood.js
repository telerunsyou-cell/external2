const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flood')
    .setDescription('Send a message multiple times')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Message to send')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('count')
        .setDescription('How many times')
        .setRequired(false)),

  async execute(interaction) {
    const message = interaction.options.getString('message');
    const count = interaction.options.getInteger('count') || 1;
    const channel = interaction.channel;

    if (!channel || !channel.isTextBased()) {
      return interaction.reply({
        content: "Cannot send messages in this type of channel.",
        ephemeral: true,
      });
    }

    try {
      for (let j = 0; j < count; j++) {
        await channel.send(message + " [Master mind]");
      }

      await interaction.reply({
        content: `Successfully sent message ${count} times!`,
        ephemeral: true,
      });

    } catch (error) {
      console.error('Flood command failed:', error);

      if (!interaction.replied) {
        await interaction.reply({
          content: 'An error occurred during the flood operation.',
          ephemeral: true
        });
      }
    }
  }
};
