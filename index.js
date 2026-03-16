const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Bot is ready!");
});

// Load ledger
function loadLedger() {
  const data = fs.readFileSync("ledger.json");
  return JSON.parse(data);
}

// Save ledger
function saveLedger(data) {
  fs.writeFileSync("ledger.json", JSON.stringify(data, null, 2));
}

client.on("message", (msg) => {
  const text = msg.body.trim();
  let ledger = loadLedger();

  // Deposit
  if (text.startsWith("+")) {
    const amount = parseInt(text.slice(1));

    ledger.balance += amount;

    ledger.transactions.push({
      type: "credit",
      amount: amount,
      date: new Date(),
    });

    saveLedger(ledger);

    msg.reply(`Added ₹${amount}\nBalance: ₹${ledger.balance}`);
  }

  // Withdraw
  if (text.startsWith("-")) {
    const amount = parseInt(text.slice(1));

    ledger.balance -= amount;

    ledger.transactions.push({
      type: "debit",
      amount: amount,
      date: new Date(),
    });

    saveLedger(ledger);

    msg.reply(`Deducted ₹${amount}\nBalance: ₹${ledger.balance}`);
  }

  // Check balance
  if (text === "Balance") {
    msg.reply(`Current Balance: ₹${ledger.balance}`);
  }

  // Last 5 transactions
  if (text === "History") {
    const history = ledger.transactions
      .slice(-5)
      .map((t) => `${t.type} ₹${t.amount}`)
      .join("\n");

    msg.reply(history || "No transactions yet.");
  }

  // Reset ledger
  if (text === "Reset") {
    ledger.balance = 0;
    ledger.transactions = [];

    saveLedger(ledger);

    msg.reply("Ledger has been reset.\nBalance: ₹0");
  }
});

client.initialize();
