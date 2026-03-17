require("dotenv").config();

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const ledger = require("../services/ledgerService");
const MESSAGES = require("../constants/messages");
const COMMANDS = require("../constants/commands");
const GREETINGS = require("../constants/greetings");
const formatDate = require("../utils/formatDate");

const client = new Client({
  authStrategy: new LocalAuth(),
});

const ALLOWED_USER = process.env.ALLOWED_USER;


client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Bot is ready!");
});

client.on("message", (msg) => {
  if (msg.from !== ALLOWED_USER) return;
  const text = msg.body.trim().toLowerCase();
  
  // Greeting
  if (GREETINGS.includes(text)) {
    const balance = ledger.getBalance();
    msg.reply(MESSAGES.WELCOME(balance));
    return;
  }
  
  // Menu
  if (text === COMMANDS.MENU) {
    msg.reply(MESSAGES.MENU);
    return;
  }
  
  // Deposit
  if (text.startsWith("+")) {
    const amount = parseInt(text.slice(1));

    if (isNaN(amount)) {
      msg.reply(MESSAGES.INVALID_AMOUNT);
      return;
    }

    const balance = ledger.addMoney(amount);

    msg.reply(MESSAGES.ADD_SUCCESS(amount, balance));
    return;
  }

  // Withdraw
  if (text.startsWith("-")) {
    const amount = parseInt(text.slice(1));

    if (isNaN(amount)) {
      msg.reply(MESSAGES.INVALID_AMOUNT);
      return;
    }

    if (ledger.getBalance() < amount) {
      msg.reply(MESSAGES.INSUFFICIENT_BALANCE);
      return;
    }

    const balance = ledger.deductMoney(amount);

    msg.reply(MESSAGES.DEDUCT_SUCCESS(amount, balance));
    return;
  }

  // Balance
  if (text === COMMANDS.BALANCE) {
    const balance = ledger.getBalance();
    msg.reply(MESSAGES.BALANCE(balance));
    return;
  }


  // Statement (last 10 transactions)
  if (text === COMMANDS.STATEMENT) {
    const history = ledger.getTransactions()
      .slice(-10)
      .map((t) => {
        const date = formatDate(t.date)
        const sign = t.type === "credit" ? "+" : "-";

        return `${date} ${sign}₹${t.amount}`;
      })
      .join("\n");

    msg.reply(history || "No transactions yet.");
    return;
  }

  // Today's summary
  if (text === COMMANDS.TODAY) {
    const today = new Date().toLocaleDateString();

    const transactions = ledger.getTransactions().filter(
      (t) => new Date(t.date).toLocaleDateString() === today,
    );

    let credit = 0;
    let debit = 0;

    transactions.forEach((t) => {
      if (t.type === "credit") credit += t.amount;
      if (t.type === "debit") debit += t.amount;
    });

    msg.reply(MESSAGES.TODAY_SUMMARY(credit, debit));
    return;
  }

  // Reset
  if (text === COMMANDS.RESET) {
    ledger.resetLedger();
    msg.reply(MESSAGES.RESET_SUCCESS);
    return;
  }

  // Unknown command
  msg.reply(MESSAGES.UNKNOWN_COMMAND);
});

module.exports = client;
 
