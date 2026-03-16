const fs = require("fs");
const path = require("path");

const ledgerPath = path.join(__dirname, "../../data/ledger.json");

function loadLedger() {
  const data = fs.readFileSync(ledgerPath);
  return JSON.parse(data);
}

function saveLedger(data) {
  fs.writeFileSync(ledgerPath, JSON.stringify(data, null, 2));
}

function addMoney(amount) {
  const ledger = loadLedger();

  ledger.balance += amount;

  ledger.transactions.push({
    type: "credit",
    amount,
    date: new Date()
  });

  saveLedger(ledger);

  return ledger.balance;
}

function deductMoney(amount) {
  const ledger = loadLedger();

  ledger.balance -= amount;

  ledger.transactions.push({
    type: "debit",
    amount,
    date: new Date()
  });

  saveLedger(ledger);

  return ledger.balance;
}

function resetLedger() {
  const ledger = {
    balance: 0,
    transactions: []
  };

  saveLedger(ledger);
}

function getHistory() {
  const ledger = loadLedger();

  return ledger.transactions.slice(-5);
}

function getBalance() {
  const ledger = loadLedger();

  return ledger.balance;
}

module.exports = {
  addMoney,
  deductMoney,
  resetLedger,
  getHistory,
  getBalance
};