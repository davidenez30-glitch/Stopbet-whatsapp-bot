const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
app.use(express.json());

// Servidor para Railway não derrubar
app.get("/", (req, res) => {
  res.send("StopBet Bot está rodando!");
});

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on("qr", (qr) => {
  console.log("Escaneie o QR Code abaixo:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ Bot conectado com sucesso!");
});

client.on("message", async (message) => {
  const msg = message.body.toLowerCase();

  if (msg === "oi" || msg === "menu") {
    client.sendMessage(
      message.from,
      `🙏 *Bem-vindo ao StopBet!*\n\n` +
      `Escolha uma opção:\n` +
      `1️⃣ Preciso parar de apostar\n` +
      `2️⃣ Estou com recaída\n` +
      `3️⃣ Quero motivação`
    );
  }

  if (msg === "1") {
    client.sendMessage(
      message.from,
      "💪 Você já deu o primeiro passo! Reconhecer é o começo da mudança. Afaste-se dos aplicativos e procure apoio."
    );
  }

  if (msg === "2") {
    client.sendMessage(
      message.from,
      "⚠️ Recaídas acontecem, mas não desista. Respire fundo, saia do ambiente de aposta e converse com alguém de confiança."
    );
  }

  if (msg === "3") {
    client.sendMessage(
      message.from,
      "🔥 Você é maior que qualquer vício! Sua vida vale mais que qualquer aposta."
    );
  }
});

client.initialize();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
