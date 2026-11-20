import { Telegram } from 'puregram';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

config();

if (!process.env.BOT_TOKEN) {
  console.error('❌ BOT_TOKEN не найден');
  process.exit(1);
}

const telegram = Telegram.fromToken(process.env.BOT_TOKEN);

// === Игроки ===
const playersFile = path.join(process.cwd(), 'players.json');
let players = new Set();
if (fs.existsSync(playersFile)) {
  try { players = new Set(JSON.parse(fs.readFileSync(playersFile, 'utf8'))); } catch (e) {}
}
function addPlayer(userId) {
  if (!players.has(userId)) {
    players.add(userId);
    fs.writeFileSync(playersFile, JSON.stringify([...players]));
  }
}

// === HTTP API ===
const app = express();
app.use(cors());
app.get('/players', (req, res) => {
  res.json({ count: players.size });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ API на порту ${PORT}`));

const WEBAPP_URL = process.env.WEBAPP_URL || 'https://tetris-miniapp-umber.vercel.app';

telegram.updates.on('message', async (context) => {
  const text = context.text;

  if (text === '/start' || text === '/tetrisapp') {
    if (context.from?.id) addPlayer(context.from.id);
    await context.send('🕹️ Нажми кнопку, чтобы открыть Тетрис (Mini App)', {
      reply_markup: {
        inline_keyboard: [[
          { text: 'Играть в Тетрис', web_app: { url: WEBAPP_URL } }
        ]]
      }
    });
  }
});

telegram.updates.startPolling()
  .then(() => console.log('✅ Бот запущен (Mini App)'))
  .catch(console.error);
