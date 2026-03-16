const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const ledger = require("../services/ledgerService");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Bot is ready!");
});

client.on("message", (msg) => {
  const text = msg.body.trim().toLowerCase();

  const GREETINGS = ["hai", "hi", "hellow", "hello", "hey", "hoi"];
  if (GREETINGS.includes(text)) {
    const balance = ledger.getBalance();

    msg.reply(`Hey Munnas 👋
    Welcome to Safvan's Bank 🏦
    Your current balance is: ₹${balance}`);
  }

  if (text.startsWith("+")) {
    const amount = parseInt(text.slice(1));
    const balance = ledger.addMoney(amount);

    msg.reply(`Added ₹${amount}\nBalance: ₹${balance}`);
  }

  if (text.startsWith("-")) {
    const amount = parseInt(text.slice(1));
    const balance = ledger.deductMoney(amount);

    msg.reply(`Deducted ₹${amount}\nBalance: ₹${balance}`);
  }

  if (text === "balance") {
    const balance = ledger.getBalance();
    msg.reply(`Current Balance: ₹${balance}`);
  }

  if (text === "history") {
    const history = ledger.getHistory();

    const message = history
      .map((t) => {
        const d = new Date(t.date);

        const date =
          d.toLocaleDateString() + " " +
          d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const sign = t.type === "credit" ? "+" : "-";
        return `${date} ${sign}₹${t.amount}`;
      })
      .join("\n");

    msg.reply(message || "No transactions yet.");
  }

  if (text === "reset") {
    ledger.resetLedger();
    msg.reply("Ledger reset. Balance: ₹0");
  }
});

module.exports = client;
