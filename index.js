const { Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const rules = require("./rules.json");
const fs = require("fs");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log(`Bot is Ready! ${client.user.tag}`);

});

client.on("messageCreate", async (message) => {
  if (message.content === "!rules") {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("قائمة القوانين")
            .addOptions(
              rules.map((rule) => ({
                label: rule.title,
                description: rule.id,
                value: rule.id,
              }))
            )
        );

      const embed = new MessageEmbed()
        .setColor("#3533CD")
        .setThumbnail(
          "https://media.discordapp.net/attachments/1126913955214930040/1304639657719631933/image-removebg-preview_4.png?ex=67321a1d&is=6730c89d&hm=f30b3fc81cf93b5c905a2491c00cf57f13161683bb91c617474f632583b39ea0&=&format=webp&quality=lossless&width=473&height=473"
        )
       .setTitle("قوانين السيرفر")  // Title in Arabic: "Server Rules"
       .setDescription('**جميع القوانين تابعة لسيرفر Wizard Town RP\nنرجوا منك إتباع جميع القوانين لكي لا يتم محاسبتك**')  // Arabic Description
       .setImage(
          "https://media.discordapp.net/attachments/1126913955214930040/1304670140717338695/Untitled_image_9.jpeg?ex=67323681&is=6730e501&hm=dbb38696e99213ca1a1c4de56f333e8329eb5cb716a7377a19c7a620a55f883a&=&format=webp"
        )
        .setFooter({
          text: "Wizard Town Management",
          iconURL: "https://cdn.discordapp.com/attachments/1126913955214930040/1307565138957570111/image-removebg-preview.png?ex=673cbeae&is=673b6d2e&hm=0e619a031efaa43c51b1f5a4b425bcba08c709ac0ac2dbf63c0cec0cbf575be9&",
        });

      // إرسال رسالة مع Mention للجميع (@everyone)
      await message.channel.send({
        content: "_ _||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|||||||||||| @everyone",  // سيتم ذكر جميع الأعضاء في الرسالة
        embeds: [embed],
        components: [row],
      });
      await message.delete();
    } else {
      await message.reply({
        content: "You need to be an administrator to use this command.",
        ephemeral: true,
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isSelectMenu()) {
    const rule = rules.find((r) => r.id === interaction.values[0]);
    const text = fs.readFileSync(rule.description, "utf-8");
    const ruleEmbed = new MessageEmbed()
      .setColor("#3533CD")
      .setThumbnail(
        "https://media.discordapp.net/attachments/1126913955214930040/1304639657719631933/image-removebg-preview_4.png?ex=67321a1d&is=6730c89d&hm=f30b3fc81cf93b5c905a2491c00cf57f13161683bb91c617474f632583b39ea0&=&format=webp&quality=lossless&width=473&height=473"
      )
      .setTitle(rule.title)
      .setDescription(text)
      .setFooter({
        text: "Wizard Town Management",
        iconURL: "https://cdn.discordapp.com/attachments/1126913955214930040/1307565138957570111/image-removebg-preview.png?ex=673cbeae&is=673b6d2e&hm=0e619a031efaa43c51b1f5a4b425bcba08c709ac0ac2dbf63c0cec0cbf575be9&",
      });

    await interaction.reply({ embeds: [ruleEmbed], ephemeral: true });
  }
});


const http = require('http');
http.createServer((req, res) => {
  res.write("I'm alive");
  res.end();
}).listen(8080);


client.login(process.env.TOKEN);
