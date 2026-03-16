const ledger = require("../src/services/ledgerService");

console.log("Adding 1000");
ledger.addMoney(1000);

console.log("Deducting 200");
ledger.deductMoney(200);

console.log(ledger.getHistory())

console.log("Balance:", ledger.getBalance());

ledger.resetLedger();