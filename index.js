require('dotenv').config();
const { Bot, InlineKeyboard, GrammyError, HttpError } = require('grammy');
const express = require('express');

// Initialize the bot
const bot = new Bot(process.env.BOT_TOKEN || '');

// Global Error Handler to prevent crashes
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// Initialize Express for Render.com (Auto-restarts, keeps service alive)
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Earnegg Bot is running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Menu Content Constants
const MAIN_MENU_TEXT = `
🐣 *Welcome to Earnegg!*

Start your journey to become the ultimate Egg Master. Use the menu below to find everything you need to know.

🚀 *Tap, Earn, and Dominate!*
`;

const getMainMenuKeyboard = () => {
  return new InlineKeyboard()
    .text('📖 How To', 'how_to').text('📜 Guide', 'guide').row()
    .text('❓ FAQs', 'faqs').text('📞 Contact Us', 'contact').row()
    .url('🎮 Play Earnegg', 'https://t.me/earneggbot/earneager?startapp=ref_673756514'); // Replace with actual Mini App link
};

const BACK_BUTTON = new InlineKeyboard().text('⬅️ Back to Menu', 'main_menu');

// Handlers
bot.command('start', (ctx) => {
  ctx.reply(MAIN_MENU_TEXT, {
    parse_mode: 'Markdown',
    reply_markup: getMainMenuKeyboard(),
  });
});

bot.command('openapp', (ctx) => {
  ctx.reply('🚀 *Launching Earnegg...*', {
    parse_mode: 'Markdown',
    reply_markup: new InlineKeyboard().url('🎮 Open App', 'https://t.me/earneggbot/earneager?startapp=ref_673756514'),
  });
});

bot.command('contact', (ctx) => {
  const text = `
📞 *Contact & Support*

Need help or want to stay updated? Join our community!

📢 [Official News Channel](https://t.me/earnegg_official)
💬 [Community Group](https://t.me/earnegg_community)
📧 Support: @earnegg\\_support

*We typically respond within 24 hours.*
  `;
  ctx.reply(text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
    reply_markup: BACK_BUTTON
  });
});

bot.callbackQuery('main_menu', async (ctx) => {
  await ctx.editMessageText(MAIN_MENU_TEXT, {
    parse_mode: 'Markdown',
    reply_markup: getMainMenuKeyboard(),
  });
  await ctx.answerCallbackQuery();
});

bot.callbackQuery('how_to', async (ctx) => {
  const text = `
📖 *How to Play Earnegg*

1️⃣ *Open the App*: Click the "Play Earnegg" button in the menu.
2️⃣ *Tap to Earn*: Tap the Egg on the main screen to collect coins.
3️⃣ *Watch Your Energy*: Tapping costs energy. It recharges automatically over time!
4️⃣ *Level Up*: Earn more coins to unlock higher ranks and better rewards.
  `;
  await ctx.editMessageText(text, {
    parse_mode: 'Markdown',
    reply_markup: BACK_BUTTON,
  });
  await ctx.answerCallbackQuery();
});

bot.callbackQuery('guide', async (ctx) => {
  const text = `
📜 *The Ultimate Earnegg Guide*

🔥 *Boosters*: Use "Energy Limit" to store more energy or "Tap Value" to earn more per tap.
👥 *Referrals*: Invite friends! You get a bonus for every friend who joins.
✅ *Tasks*: Complete social tasks (following Twitter, watching YouTube) for massive rewards.
📈 *Leaderboard*: Compete with players worldwide and show off your rank!
💰 *Wallet*: Connect your TON wallet to prepare for future withdrawals.
  `;
  await ctx.editMessageText(text, {
    parse_mode: 'Markdown',
    reply_markup: BACK_BUTTON,
  });
  await ctx.answerCallbackQuery();
});

bot.callbackQuery('faqs', async (ctx) => {
  const text = `
❓ *Frequently Asked Questions*

*Q: Is Earnegg free to play?*
A: Yes! Absolutely free.

*Q: When is the Airdrop?*
A: We will announce it on our official channel. Stay active to qualify!

*Q: How do I withdraw my coins?*
A: Wallet integration is coming soon. Stay tuned to the "Wallet" section in-app.

*Q: My energy is empty, what now?*
A: Either wait for it to recharge or use a "Full Energy" boost in the Boosts section.
  `;
  await ctx.editMessageText(text, {
    parse_mode: 'Markdown',
    reply_markup: BACK_BUTTON,
  });
  await ctx.answerCallbackQuery();
});

bot.callbackQuery('contact', async (ctx) => {
  const text = `
📞 *Contact & Support*

Need help or want to stay updated? Join our community!

📢 [Official News Channel](https://t.me/earnegg_official)
💬 [Community Group](https://t.me/earnegg_community)
📧 Support: @earnegg\\_support

*We typically respond within 24 hours.*
  `;
  await ctx.editMessageText(text, {
    parse_mode: 'Markdown',
    reply_markup: BACK_BUTTON,
    disable_web_page_preview: true
  });
  await ctx.answerCallbackQuery();
});

// Start the bot
bot.start({
  onStart: async (botInfo) => {
    console.log(`Bot @${botInfo.username} is up and running!`);

    // Set Bot Description (The "What can this bot do?" screen)
    try {
      await bot.api.setMyDescription(
        "Welcome to Earnegg! 🐣\n\n" +
        "Earnegg is the next-gen Tap-to-Earn experience on Telegram.\n" +
        "🔥 Tap the Egg to earn coins.\n" +
        "🚀 Complete tasks for bonuses.\n" +
        "👥 Invite friends and earn together.\n" +
        "📈 Compete on the leaderboard for the ultimate Airdrop!\n\n" +
        "Start your journey to become the Egg Master today! 🌟"
      );
      console.log("Bot description updated!");

      // Set the Menu Button to open the Mini App
      await bot.api.setChatMenuButton({
        menu_button: {
          type: "web_app",
          text: "Play Earnegg",
          web_app: { url: "https://t.me/earneggbot/earneager?startapp=ref_673756514" }
        }
      });
      console.log("Menu button updated!");
    } catch (err) {
      console.error("Failed to update bot profile:", err);
    }
  },
});
