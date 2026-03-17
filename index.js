
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("StopBet bot está rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 1. Inicializa o cliente com persistência de sessão
// Isso evita que você precise ler o QR Code toda vez que o bot reiniciar
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necessário para rodar em servidores como Railway/Render
    }
});

// 2. Gera o QR Code no terminal para você escanear
client.on('qr', (qr) => {
    console.log('Escaneie o QR Code abaixo para conectar o bot:');
    qrcode.generate(qr, { small: true });
});

// 3. Aviso de que a conexão foi bem-sucedida
client.on('ready', () => {
    console.log('O Stopbet-whatsapp-bot está online e pronto!');
});

// 4. Lógica de resposta (Exemplo básico de ajuda)
client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const userMessage = msg.body.toLowerCase();

    // Exemplo de comando de ajuda
    if (userMessage === '!ajuda' || userMessage === 'ajuda') {
        msg.reply('Olá! Este é o Stopbet-bot. Estamos aqui para apoiar você contra o vício em apostas. Digite "apoio" para falar com alguém ou ver recursos úteis.');
    }

    if (userMessage === 'apoio') {
        msg.reply('Você não está sozinho. Procure o Jogadores Anônimos ou ligue para centros de apoio. O primeiro passo é o mais importante.');
    }
});

// 5. Liga o bot
client.initiate();
