const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 1. Initialize the client with session persistence
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // Recommended for Railway/Render
            '--disable-gpu'
        ]
    }
});

// 2. Generate the QR Code in the terminal
client.on('qr', (qr) => {
    console.log('Scan the QR Code below to connect the bot:');
    qrcode.generate(qr, { small: true });
});

// 3. Success connection message
client.on('ready', () => {
    console.log('Stopbet-whatsapp-bot is online and ready!');
});

// 4. Response logic (Help and Support commands)
client.on('message', async (msg) => {
    const messageBody = msg.body.toLowerCase();

    // Help Command
    if (messageBody === '!ajuda' || messageBody === 'ajuda') {
        await msg.reply('Olá! Este é o bot Stopbet. Estamos aqui para apoiá-lo contra o vício em apostas.');
    }

    // Support Command
    if (messageBody === 'apoio') {
        await msg.reply('Você não está sozinho. Procure jogadores anônimos ou ligue para centros de apoio.');
    }
});

// 5. Start the bot
client.initialize();
