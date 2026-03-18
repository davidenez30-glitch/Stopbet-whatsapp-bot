const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 1. Inicializa o cliente com persistência de sessão
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
            '--single-process', // Recomendado para Railway/Render
            '--disable-gpu'
        ]
    }
});

// 2. Gera o QR Code no terminal
client.on('qr', (qr) => {
    console.log('Escaneie o QR Code abaixo para conectar o bot:');
    qrcode.generate(qr, { small: true });
});

// 3. Aviso de conexão bem-sucedida
client.on('ready', () => {
    console.log('O Stopbet-whatsapp-bot está online e pronto!');
});

// 4. Lógica de resposta (Comandos de Ajuda e Apoio)
client.on('message', async (msg) => {
    const userMessage = msg.body.toLowerCase();

    // Comando de Ajuda
    if (userMessage === '!ajuda' || userMessage === 'ajuda') {
        await msg.reply('Olá! Este é o Stopbet-bot. Estamos aqui para apoiar você contra o vício em apostas. Digite "apoio" para falar com alguém ou ver recursos úteis.');
    }

    // Comando de Apoio
    if (userMessage === 'apoio') {
        await msg.reply('Você não está sozinho. Procure o Jogadores Anônimos ou ligue para centros de apoio. O primeiro passo é o mais importante.');
    }
});

// 5. Liga o bot
client.initialize();
