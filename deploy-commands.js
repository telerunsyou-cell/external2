
    // Only process chat input commands.
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options, channel, member } = interaction;

    // --- PANEL COMMAND ---
    if (commandName === 'panel') {
        await interaction.reply({ content: 'Panel command logic needs to be implemented here or imported.', ephemeral: true });
    }

    // --- FLOOD COMMAND ---
    if (commandName === 'flood') {
        const message = options.getString('message');
        const count = options.getInteger('count') || 1;

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
                await interaction.reply({ content: 'An error occurred during the flood operation.', ephemeral: true });
            }
        }
    }
});
