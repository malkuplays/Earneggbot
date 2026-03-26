# Earnegg Telegram Bot Menu

A professional, simple, and feature-rich Telegram bot menu for Earnegg, designed for easy deployment on Render.com.

## Features
- 📖 **How To**: Step-by-step guide for new players.
- 📜 **Detailed Guide**: Information on Boosters, Tasks, and Referrals.
- ❓ **FAQs**: Answers to common player questions.
- 📞 **Contact Us**: Official links for community and support.
- 🎮 **Play Button**: Dedicated link to the Earnegg Mini App.
- 🏠 **Main Menu Navigation**: Smooth transitions with a "Back to Menu" feature.

## Local Setup
1. Clone this repository to your local machine.
2. Run `npm install` to install dependencies.
3. Create a `.env` file based on `.env.example` and add your `BOT_TOKEN`.
4. Run `npm start` to launch the bot and the web server.

## Deployment to Render.com
1. Create a new **Web Service** on [Render.com](https://render.com).
2. Connect your GitHub/GitLab repository.
3. Set the following configurations:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add **Environment Variables**:
   - `BOT_TOKEN`: Your Telegram Bot Token (from @BotFather).
   - `PORT`: 3000 (default) or any port Render assigns.
5. Click **Create Web Service**.

## Why Express is included?
Render.com requires a web server to keep the service active. The included Express server listens on a port, allowing the bot to stay online and respond to users 24/7.
